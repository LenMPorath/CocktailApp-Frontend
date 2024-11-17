import { refreshAccessToken } from "$lib/auth";
import type { BaseModel } from "$lib/models/basemodel";

const baseURL = import.meta.env.VITE_BASE_URL;

// Enum für HTTP-Methoden
export enum HttpMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
}

// Verallgemeinerte `fetchApi`-Funktion
export async function fetchApi(
    path: string,
    method: HttpMethod,
    body?: BaseModel,
    accessToken = null
) {
    try {
        let accessToken = localStorage.getItem("access_token");
        const headers = {
            "Content-Type": "application/json",
            ...(accessToken && { Authorization: `Bearer ${accessToken}` })
        };
        
        let response = await fetch(`${baseURL}${path}`, {
            method,
            headers,
            body: body ? JSON.stringify(body) : null
        });

        if (response.status === 401) {
            // Token könnte abgelaufen sein – Versuch, es zu erneuern
            accessToken = await refreshAccessToken();
            if (accessToken) {
                console.warn(`Retry fetching with new Access Token`);
                headers.Authorization = `Bearer ${accessToken}`;
                response = await fetch(`${baseURL}${path}`, {
                    method,
                    headers,
                    body: body ? JSON.stringify(body) : null
                });
            }
        }

        // Fehlerstatus zurückgeben und Details in der Fehlermeldung enthalten
        if (!response.ok) {
            const errorJson = await response.json();
            const errorMessage = errorJson.detail || "Unbekannter Fehler";
            throw new Error(`API Fehler (${response.status}) während ${method} auf ${path}: ${errorMessage}`);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
}