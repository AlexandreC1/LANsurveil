# Edge Cam System

Local-first LAN surveillance implementation with:
- Node.js backend API + SQLite metadata
- USB/local disk-backed video storage
- Static web dashboard
- Android client scaffold for camera nodes

## Project Structure

```
edge-cam-system/
├── server/
├── android-client/
├── storage/
└── docs/
```

## Quick Start (Server)

```bash
cd server
npm install
npm start
```

Server defaults:
- URL: `http://0.0.0.0:8080`
- Dashboard: `/`
- Files: `/files/...`
- Health: `/health`

## API Summary

- `POST /api/v1/devices/register`
- `POST /api/v1/devices/heartbeat` (requires `x-device-token`)
- `GET /api/v1/devices`
- `POST /api/v1/events` (requires `x-device-token`)
- `POST /api/v1/events/:id/upload` multipart field `video` (requires `x-device-token`)
- `GET /api/v1/events?device_id=&date=YYYY-MM-DD`

## Retention Cleanup

Hourly cleanup deletes events older than `RETENTION_DAYS` (default `14`).

