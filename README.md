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

## Why you saw `cd server` fail on Windows

If your terminal shows `C:\Users\charl>` and `cd server` fails, it means you're **not inside the cloned project folder** yet.
You must first `cd` into the folder where this repository exists.

## Quick Start (Windows PowerShell)

```powershell
# 1) Go to folder where you cloned this repo
cd C:\path\to\LANsurveil

# 2) Install server deps
npm run server:install

# 3) Start server
npm start
```

Alternative (inside repo root):
```powershell
npm --prefix server install
npm --prefix server start
```

## Quick Start (macOS/Linux)

```bash
cd /path/to/LANsurveil
npm run server:install
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

## Minimal End-to-End Test (copy/paste)

1) Register device
```bash
curl -s -X POST http://localhost:8080/api/v1/devices/register \
  -H "Content-Type: application/json" \
  -d '{"device_name":"node-1"}'
```

2) Heartbeat (replace `<TOKEN>`)
```bash
curl -s -X POST http://localhost:8080/api/v1/devices/heartbeat \
  -H "x-device-token: <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"status":"online","battery_level":90}'
```

3) Create event (replace `<TOKEN>`)
```bash
curl -s -X POST http://localhost:8080/api/v1/events \
  -H "x-device-token: <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"type":"motion","timestamp":"2026-04-21T20:00:00.000Z"}'
```

4) Upload video (replace `<TOKEN>` and `<EVENT_ID>`)
```bash
curl -s -X POST http://localhost:8080/api/v1/events/<EVENT_ID>/upload \
  -H "x-device-token: <TOKEN>" \
  -F "video=@/absolute/path/to/sample.mp4"
```

5) Open dashboard
- `http://localhost:8080/`

## Retention Cleanup

Hourly cleanup deletes events older than `RETENTION_DAYS` (default `14`).

## Current completion status

- ✅ Server API + storage + dashboard are implemented.
- ⚠️ Android client remains a scaffold and still needs full Camera2/MediaRecorder/Room/WorkManager integration for production use.

