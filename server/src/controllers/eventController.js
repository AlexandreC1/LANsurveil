const path = require('path');
const { v4: uuidv4 } = require('uuid');
const db = require('../db/database');
const {
  buildRelativeVideoPath,
  buildAbsoluteVideoPath,
  ensureDir
} = require('../services/storageService');

function createEvent(req, res) {
  const { type, timestamp } = req.body;
  if (!type || !timestamp) {
    return res.status(400).json({ error: 'type and timestamp are required' });
  }

  const parsed = new Date(timestamp);
  if (Number.isNaN(parsed.getTime())) {
    return res.status(400).json({ error: 'Invalid timestamp format' });
  }

  const eventId = uuidv4();
  const createdAt = new Date().toISOString();

  db.prepare(
    `INSERT INTO events (id, device_id, type, timestamp, file_path, uploaded, created_at)
     VALUES (?, ?, ?, ?, NULL, 0, ?)`
  ).run(eventId, req.device.id, type, parsed.toISOString(), createdAt);

  return res.status(201).json({
    event_id: eventId,
    upload_url: `/api/v1/events/${eventId}/upload`
  });
}

function uploadEvent(req, res) {
  if (!req.file) {
    return res.status(400).json({ error: 'No video file uploaded (field name: video)' });
  }

  const event = db.prepare('SELECT * FROM events WHERE id = ? AND device_id = ?').get(req.params.id, req.device.id);
  if (!event) {
    return res.status(404).json({ error: 'Event not found' });
  }

  const relativePath = buildRelativeVideoPath(req.device.id, event.id, event.timestamp);
  const absolutePath = buildAbsoluteVideoPath(relativePath);
  ensureDir(path.dirname(absolutePath));

  const fs = require('fs');
  fs.renameSync(req.file.path, absolutePath);

  db.prepare(
    `UPDATE events
     SET file_path = ?, uploaded = 1
     WHERE id = ?`
  ).run(relativePath, event.id);

  return res.json({
    ok: true,
    file_path: `/files/${relativePath.replace(/\\/g, '/')}`
  });
}

function listEvents(req, res) {
  const { device_id: deviceId, date } = req.query;

  let query = `SELECT id, device_id, type, timestamp, file_path, uploaded FROM events`;
  const conditions = [];
  const params = [];

  if (deviceId) {
    conditions.push('device_id = ?');
    params.push(deviceId);
  }

  if (date) {
    conditions.push('timestamp >= ? AND timestamp < ?');
    params.push(`${date}T00:00:00.000Z`);
    params.push(`${date}T23:59:59.999Z`);
  }

  if (conditions.length > 0) {
    query += ` WHERE ${conditions.join(' AND ')}`;
  }

  query += ' ORDER BY timestamp DESC';

  const rows = db.prepare(query).all(...params).map((row) => ({
    ...row,
    uploaded: Boolean(row.uploaded),
    file_url: row.file_path ? `/files/${row.file_path.replace(/\\/g, '/')}` : null
  }));

  return res.json(rows);
}

module.exports = {
  createEvent,
  uploadEvent,
  listEvents
};
