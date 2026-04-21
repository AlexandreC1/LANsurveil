# Implementation Notes

## Reliability features implemented (server side)
- Device token authentication
- Event + upload split for resumable workflow
- SQLite WAL mode for better concurrent reliability
- Hourly retention cleanup job

## Remaining production hardening tasks
- Add HTTPS support (self-signed certs for LAN)
- Add request rate limiting and payload validation
- Add Android full app project (Gradle, Room DAO, Camera2 pipeline)
- Add process manager / service unit for auto-restart

## Testing checklist
1. Register device
2. Send heartbeat with valid token
3. Create event + upload video
4. Verify listing and playback in dashboard
5. Verify cleanup removes old records/files
