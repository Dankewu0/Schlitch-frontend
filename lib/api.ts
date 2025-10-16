'use client';

import { useEffect, useState } from "react";

export async function fetchData<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
    const url = `${baseUrl}${endpoint}`;

    console.group(`🛰 Fetch Start: ${url}`);
    console.log("Options:", options);

    try {
        const res = await fetch(url, {
            ...options,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                ...(options.headers || {}),
            },
        });

        console.log("HTTP Status:", res.status, res.statusText);

        let rawText: string | null = null;
        let data: T | null = null;

        try {
            rawText = await res.text();
            console.log("Raw response text:", rawText);

            if (rawText) {
                data = JSON.parse(rawText) as T;
                console.log("Parsed JSON:", data);
            }
        } catch (jsonErr) {
            console.warn("⚠ Не удалось распарсить JSON:", jsonErr, "Raw text:", rawText);
        }

        if (!res.ok) {
            console.error(
                `❌ Ошибка запроса: ${res.status} ${res.statusText}`,
                data,
                { rawText, stack: new Error().stack }
            );
            throw new Error(`Ошибка запроса: ${res.status} ${res.statusText}`);
        }

        console.log(`✅ Fetch Success: ${url}`);
        console.groupEnd();
        return data!;
    } catch (err) {
        console.error(`🔥 Fetch упал полностью: ${url}`, err, { stack: (err as Error).stack });
        console.groupEnd();
        throw err;
    }
}
