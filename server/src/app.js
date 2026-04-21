const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

require('./db/database');
const deviceRoutes = require('./routes/devices');
const eventRoutes = require('./routes/events');
const { startCleanupJob } = require('./services/cleanupService');

const app = express();
const PORT = Number(process.env.PORT || 8080);
const HOST = process.env.HOST || '0.0.0.0';

const storagePath = path.resolve(__dirname, '../storage');
const tempPath = path.resolve(__dirname, '../temp');
fs.mkdirSync(storagePath, { recursive: true });
fs.mkdirSync(tempPath, { recursive: true });

app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

app.get('/health', (req, res) => {
  res.json({ ok: true, ts: new Date().toISOString() });
});

app.use('/api/v1/devices', deviceRoutes);
app.use('/api/v1/events', eventRoutes);

app.use('/files', express.static(storagePath));
app.use('/', express.static(path.resolve(__dirname, '../public')));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, HOST, () => {
  console.log(`Edge cam server listening on http://${HOST}:${PORT}`);
  startCleanupJob();
});
