# Android Client (Kotlin) Scaffold

This folder contains a reference implementation scaffold for the Android camera node.

Core modules:
- `service/SurveillanceService.kt`: foreground service orchestration
- `detection/MotionDetector.kt`: frame-difference trigger logic
- `detection/AudioDetector.kt`: RMS-based trigger logic
- `worker/UploadWorker.kt`: resilient upload pipeline with retry
- `network/ApiService.kt`: Retrofit API surface
- `data/EventEntity.kt`: local Room event record

Use this scaffold to bootstrap a full Android Studio project.
