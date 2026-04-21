package com.edgesurveil.client.data

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "events")
data class EventEntity(
    @PrimaryKey val id: String,
    val type: String,
    val timestamp: String,
    val filePath: String,
    val uploaded: Boolean = false
)
