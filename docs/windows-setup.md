# Windows Setup and Troubleshooting

## Symptom
`cd server` returns:

```
The system cannot find the path specified.
```

## Cause
You are in the wrong working directory (for example `C:\Users\charl`) rather than the repository root.

## Fix

1. Find where you cloned/unzipped the repository.
2. Change directory to that location.
3. Verify you can see `server`, `android-client`, and `docs` folders.

PowerShell example:

```powershell
cd C:\Projects\LANsurveil
Get-ChildItem
npm run server:install
npm start
```

If `npm start` says script missing, run `npm run` and confirm you are in this repository root.
