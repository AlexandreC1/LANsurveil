package com.edgesurveil.client.service

import android.app.Notification
import android.app.Service
import android.content.Intent
import android.os.IBinder

class SurveillanceService : Service() {
    override fun onCreate() {
        super.onCreate()
        startForeground(1001, Notification())
        // TODO: Start camera/audio monitoring loops.
        // TODO: Enforce cooldown window (10-15s).
        // TODO: Start MediaRecorder on trigger and persist event locally.
    }

    override fun onBind(intent: Intent?): IBinder? = null
}
