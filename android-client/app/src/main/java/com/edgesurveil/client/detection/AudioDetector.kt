package com.edgesurveil.client.detection

import kotlin.math.sqrt

class AudioDetector(
    private val rmsThreshold: Double = 1800.0
) {
    fun detect(samples: ShortArray): Boolean {
        if (samples.isEmpty()) return false
        var sumSquares = 0.0
        for (sample in samples) {
            val value = sample.toDouble()
            sumSquares += value * value
        }
        val rms = sqrt(sumSquares / samples.size)
        return rms >= rmsThreshold
    }
}
