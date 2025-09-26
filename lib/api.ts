export async function fetchData(
    endpoint: string,
    options: RequestInit = { method: "GET" },
) {
    const baseUrl = process.env.API_URL;

    const res = await fetch(`${baseUrl}${endpoint}`, {
        cache: "no-store",
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {}),
        },
    });

    if (!res.ok) throw new Error(`Failed to fetch from ${endpoint}`);
    return res.json();
}