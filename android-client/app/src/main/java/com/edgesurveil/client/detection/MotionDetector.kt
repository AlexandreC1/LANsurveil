package com.edgesurveil.client.detection

class MotionDetector(
    private val changeThresholdPercent: Float = 8.0f
) {
    fun detect(previousGrayFrame: ByteArray, currentGrayFrame: ByteArray): Boolean {
        if (previousGrayFrame.size != currentGrayFrame.size || previousGrayFrame.isEmpty()) return false

        var changed = 0
        for (i in previousGrayFrame.indices) {
            val diff = kotlin.math.abs((previousGrayFrame[i].toInt() and 0xFF) - (currentGrayFrame[i].toInt() and 0xFF))
            if (diff > 25) changed++
        }
        val pct = (changed.toFloat() / previousGrayFrame.size.toFloat()) * 100f
        return pct >= changeThresholdPercent
    }
}
