const fs = require('fs');
const path = require('path');
const db = require('../db/database');
const { STORAGE_ROOT } = require('./storageService');

const RETENTION_DAYS = Number(process.env.RETENTION_DAYS || 14);
const RUN_INTERVAL_MS = 60 * 60 * 1000;

function removeFileIfExists(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (err) {
    console.error('cleanup file removal error', err.message);
  }
}

function runCleanup() {
  const cutoff = new Date(Date.now() - RETENTION_DAYS * 24 * 60 * 60 * 1000).toISOString();
  const oldEvents = db.prepare('SELECT id, file_path FROM events WHERE timestamp < ?').all(cutoff);

  for (const event of oldEvents) {
    if (event.file_path) {
      removeFileIfExists(path.join(STORAGE_ROOT, event.file_path));
    }
  }

  const result = db.prepare('DELETE FROM events WHERE timestamp < ?').run(cutoff);
  if (result.changes > 0) {
    console.log(`[cleanup] removed ${result.changes} event(s) older than ${RETENTION_DAYS} days`);
  }
}

function startCleanupJob() {
  runCleanup();
  setInterval(runCleanup, RUN_INTERVAL_MS).unref();
}

module.exports = {
  startCleanupJob,
  runCleanup
};
