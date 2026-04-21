const { v4: uuidv4 } = require('uuid');
const db = require('../db/database');

function registerDevice(req, res) {
  const deviceName = req.body.device_name;
  if (!deviceName || typeof deviceName !== 'string') {
    return res.status(400).json({ error: 'device_name is required' });
  }

  const id = uuidv4();
  const token = uuidv4();
  const now = new Date().toISOString();

  db.prepare(
    `INSERT INTO devices (id, name, token, last_seen, status, battery_level, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  ).run(id, deviceName.trim(), token, now, 'registered', null, now);

  return res.status(201).json({ device_id: id, api_token: token });
}

function heartbeat(req, res) {
  const { status, battery_level } = req.body;
  const now = new Date().toISOString();

  db.prepare(
    `UPDATE devices
     SET last_seen = ?, status = COALESCE(?, status), battery_level = COALESCE(?, battery_level)
     WHERE id = ?`
  ).run(now, status || null, Number.isInteger(battery_level) ? battery_level : null, req.device.id);

  return res.json({ ok: true, last_seen: now });
}

function listDevices(req, res) {
  const rows = db.prepare(
    `SELECT id, name, last_seen, status, battery_level, created_at
     FROM devices
     ORDER BY created_at DESC`
  ).all();

  return res.json(rows);
}

module.exports = {
  registerDevice,
  heartbeat,
  listDevices
};
