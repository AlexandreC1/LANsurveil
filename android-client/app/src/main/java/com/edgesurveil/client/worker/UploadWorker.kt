package com.edgesurveil.client.worker

import android.content.Context
import androidx.work.CoroutineWorker
import androidx.work.WorkerParameters

class UploadWorker(
    appContext: Context,
    params: WorkerParameters
) : CoroutineWorker(appContext, params) {

    override suspend fun doWork(): Result {
        // TODO: Query local DB for pending events.
        // TODO: POST /events, then upload multipart video.
        // TODO: Mark event uploaded=true on success.
        return Result.retry()
    }
}
