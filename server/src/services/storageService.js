const path = require('path');
const fs = require('fs');

const STORAGE_ROOT = path.resolve(__dirname, '../../storage');

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function dateString(isoTimestamp) {
  return new Date(isoTimestamp).toISOString().slice(0, 10);
}

function buildRelativeVideoPath(deviceId, eventId, timestamp) {
  const day = dateString(timestamp);
  return path.join(deviceId, day, `${eventId}.mp4`);
}

function buildAbsoluteVideoPath(relativePath) {
  return path.join(STORAGE_ROOT, relativePath);
}

module.exports = {
  STORAGE_ROOT,
  ensureDir,
  buildRelativeVideoPath,
  buildAbsoluteVideoPath
};
