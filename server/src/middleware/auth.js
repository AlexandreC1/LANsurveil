const db = require('../db/database');

function authDevice(req, res, next) {
  const token = req.header('x-device-token');
  if (!token) {
    return res.status(401).json({ error: 'Missing x-device-token header' });
  }

  const device = db.prepare('SELECT * FROM devices WHERE token = ?').get(token);
  if (!device) {
    return res.status(401).json({ error: 'Invalid device token' });
  }

  req.device = device;
  return next();
}

module.exports = authDevice;
