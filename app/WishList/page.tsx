'use client'

import { useEffect, useState } from "react"
import Cookies from "js-cookie"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

interface Product {
    id: number
    name: string
    details: string
    color: string
    processor: string
    price: string
    images?: { url: string }[]
}

interface WishlistItem {
    id: number
    product_id: number
    product: Product
}

export default function WishlistPage() {
    const [wishlist, setWishlist] = useState<WishlistItem[]>([])
    const [loading, setLoading] = useState(true)

    const log = (msg: string, extra?: any) => {
        const timestamp = new Date().toISOString()
        const entry = `[${timestamp}] ${msg}` + (extra ? ` | ${JSON.stringify(extra)}` : "")
        console.log(entry)
    }

    const fetchCSRF = async () => {
        log("🟢 Запрос CSRF cookie начинается", { url: `${API_BASE_URL}/sanctum/csrf-cookie` })
        try {
            const res = await fetch(`${API_BASE_URL}/sanctum/csrf-cookie`, { credentials: "include" })
            const headers = [...res.headers.entries()]
            log("✅ Ответ от /sanctum/csrf-cookie", { status: res.status, statusText: res.statusText, headers })

            const xsrf = Cookies.get("XSRF-TOKEN")
            const session = Cookies.get("laravel_session")
            log("🍪 Cookie после CSRF запроса", { "XSRF-TOKEN": xsrf, "laravel_session": session })
        } catch (err) {
            log("🔥 Ошибка при получении CSRF cookie", { message: (err as Error).message })
            throw err
        }
    }

    const loadWishlist = async () => {
        log("🟢 Загрузка wishlist...")
        try {
            await fetchCSRF()
            const res = await fetch(`${API_BASE_URL}/wish-lists`, { credentials: "include" })
            const headers = [...res.headers.entries()]
            const data = await res.json().catch(() => null)
            log("📨 Ответ от /wish-lists", { status: res.status, statusText: res.statusText, headers, body: data })

            if (res.ok && Array.isArray(data)) {
                setWishlist(data)
                log(`✅ Wishlist загружен, элементов: ${data.length}`)
            } else {
                log("⚠ Не удалось загрузить wishlist", { response: data })
            }
        } catch (err) {
            log("🔥 Исключение loadWishlist", { message: (err as Error).message })
        } finally {
            setLoading(false)
        }
    }

    const handleRemove = async (itemId: number) => {
        log(`🟡 Удаление wishlist item id=${itemId}...`)
        try {
            await fetchCSRF()
            const xsrf = Cookies.get("XSRF-TOKEN")
            log("🍪 Извлечён токен XSRF-TOKEN", { token: xsrf })

            const res = await fetch(`${API_BASE_URL}/wish-lists/${itemId}`, {
                method: "DELETE",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "X-XSRF-TOKEN": xsrf ?? "❌ отсутствует"
                }
            })

            const respHeaders = [...res.headers.entries()]
            const data = await res.json().catch(() => null)
            log("📨 Ответ DELETE /wish-lists", { status: res.status, statusText: res.statusText, headers: respHeaders, body: data })

            if (res.ok) {
                setWishlist(prev => prev.filter(i => i.id !== itemId))
                log(`✅ Item удален, обновленный wishlist`)
            } else {
                log("⚠ Не удалось удалить item", { response: data })
            }
        } catch (err) {
            log("🔥 Исключение handleRemove", { message: (err as Error).message })
        }
    }

    useEffect(() => { loadWishlist() }, [])

    if (loading) return <div className="p-4 min-h-screen flex items-center justify-center text-violet-200 dark:text-violet-600 text-xl font-bold">Загрузка wishlist...</div>
    if (!wishlist.length) return <div className="p-4 min-h-screen flex flex-col items-center justify-center text-violet-200 dark:text-violet-600 font-bold">
        <div>Wishlist пуст</div>
    </div>

    return (
        <div className="min-h-screen p-8 font-sans">
            <h1 className="text-3xl font-bold mb-6 text-violet-200 dark:text-violet-600">Мой Wishlist</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {wishlist.map(item => (
                    <div key={item.id} className="bg-violet-200 dark:bg-violet-600 p-4 rounded-xl shadow-md flex flex-col">
                        <div>
                            <p className="font-bold text-white">{item.product.name}</p>
                            <p className="text-white text-sm">{item.product.details}</p>
                            <p className="text-white text-sm">{item.product.color} | {item.product.processor}</p>
                            <p className="text-white font-bold mt-1">{item.product.price}</p>
                        </div>
                        <button
                            onClick={() => handleRemove(item.id)}
                            className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-400 w-full sm:w-auto font-bold"
                        >
                            Удалить
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}
