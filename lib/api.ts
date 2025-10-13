export async function fetchData<T = unknown>(
    endpoint: string,
    options: RequestInit = { method: "GET" }
): Promise<T> {
    const baseUrl = 'http://localhost:8000';
    const method = options.method?.toUpperCase() || 'GET';

    if (['POST', 'PUT', 'DELETE'].includes(method)) {
        await fetch(`${baseUrl}/sanctum/csrf-cookie`, {
            credentials: 'include',
        });
    }

    const res = await fetch(`${baseUrl}${endpoint}`, {
        cache: 'no-store',
        ...options,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...(options.headers || {}),
        },
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(
            errorData?.message || `Failed to fetch from ${endpoint}`
        );
    }

    return res.json() as Promise<T>;
}
