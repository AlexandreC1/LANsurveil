package com.edgesurveil.client.network

import okhttp3.MultipartBody
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.Multipart
import retrofit2.http.POST
import retrofit2.http.Part
import retrofit2.http.Path

interface ApiService {
    @POST("/api/v1/devices/register")
    suspend fun registerDevice(@Body payload: Map<String, String>): Map<String, String>

    @POST("/api/v1/devices/heartbeat")
    suspend fun heartbeat(
        @Header("x-device-token") token: String,
        @Body payload: Map<String, Any>
    ): Map<String, Any>

    @POST("/api/v1/events")
    suspend fun createEvent(
        @Header("x-device-token") token: String,
        @Body payload: Map<String, String>
    ): Map<String, String>

    @Multipart
    @POST("/api/v1/events/{id}/upload")
    suspend fun uploadEvent(
        @Header("x-device-token") token: String,
        @Path("id") id: String,
        @Part video: MultipartBody.Part
    ): Map<String, Any>

    @GET("/health")
    suspend fun health(): Map<String, Any>
}
