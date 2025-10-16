'use client'

import Image from "next/image"
import { Heart, ShoppingCart, Star } from "lucide-react"
import { useState } from "react"
import Cookies from "js-cookie"
import clsx from "clsx"

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

interface ProductCardProps {
    product: Product
    inCart: boolean
    inWishlist: boolean
}

export default function ProductCard({ product, inCart, inWishlist }: ProductCardProps) {
    const [liked, setLiked] = useState(inWishlist)
    const [carted, setCarted] = useState(inCart)
    const [review, setReview] = useState("")
    const [rating, setRating] = useState(5)
    const [reviewSent, setReviewSent] = useState(false)
    const [animCart, setAnimCart] = useState(false)
    const [animHeart, setAnimHeart] = useState(false)
    const [animReview, setAnimReview] = useState(false)

    const log = (msg: string, extra?: any) => {
        const timestamp = new Date().toISOString()
        console.log(`[${timestamp}] ${msg}` + (extra ? ` | ${JSON.stringify(extra)}` : ""))
    }

    const fetchCSRF = async () => {
        try {
            await fetch(`${API_BASE_URL}/sanctum/csrf-cookie`, { credentials: "include" })
        } catch (err) { log("🔥 CSRF error", { message: (err as Error).message }) }
    }

    const handleAddToCart = async () => {
        setAnimCart(true)
        setTimeout(() => setAnimCart(false), 300)
        log("🟢 handleAddToCart вызван", { product_id: product.id })
        try {
            await fetchCSRF()
            const xsrf = Cookies.get("XSRF-TOKEN")
            const res = await fetch(`${API_BASE_URL}/cart`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json", "X-XSRF-TOKEN": xsrf ?? "❌" },
                body: JSON.stringify({ product_id: product.id, quantity: 1 }),
            })
            const data = await res.json().catch(() => null)
            log("📨 Ответ от /cart", { status: res.status, body: data })
            if (res.ok) setCarted(true)
        } catch (err) { log("🔥 handleAddToCart", { message: (err as Error).message }) }
    }

    const handleAddToWishlist = async () => {
        setAnimHeart(true)
        setTimeout(() => setAnimHeart(false), 500)
        log("🟢 handleAddToWishlist вызван", { product_id: product.id })
        try {
            await fetchCSRF()
            const xsrf = Cookies.get("XSRF-TOKEN")
            const res = await fetch(`${API_BASE_URL}/wish-lists`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json", "X-XSRF-TOKEN": xsrf ?? "❌" },
                body: JSON.stringify({ product_id: product.id }),
            })
            const data = await res.json().catch(() => null)
            log("📨 Ответ от /wish-lists", { status: res.status, body: data })
            if (res.ok) setLiked(true)
        } catch (err) { log("🔥 handleAddToWishlist", { message: (err as Error).message }) }
    }

    const handleAddReview = async () => {
        if (!review) return log("⚠ Пустой отзыв")
        setAnimReview(true)
        log("🟢 handleAddReview вызван", { product_id: product.id, review, rating })
        try {
            await fetchCSRF()
            const xsrf = Cookies.get("XSRF-TOKEN")
            const res = await fetch(`${API_BASE_URL}/reviews`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json", "X-XSRF-TOKEN": xsrf ?? "❌" },
                body: JSON.stringify({ product_id: product.id, content: review, rating })
            })
            const data = await res.json().catch(() => null)
            log("📨 Ответ от /reviews", { status: res.status, body: data })
            if (res.ok) {
                setReviewSent(true)
                setReview("")
                setRating(5)
                setTimeout(() => { setAnimReview(false); setReviewSent(false) }, 1500)
            }
        } catch (err) { log("🔥 handleAddReview", { message: (err as Error).message }) }
    }

    return (
        <div className="max-w-xs mx-auto bg-violet-200 rounded-2xl shadow-md overflow-hidden p-4 flex flex-col items-center text-center transition-shadow duration-300 hover:shadow-lg">
            <div className="w-full flex justify-end cursor-pointer" onClick={handleAddToWishlist}>
                <Heart className={clsx(
                    "w-6 h-6 transition-transform duration-300",
                    liked ? "text-violet-600" : "text-white",
                    animHeart && "animate-ping text-violet-300"
                )} />
            </div>

            <div className="w-full aspect-square rounded-xl overflow-hidden bg-white flex items-center justify-center mb-4">
                {product.images?.length ? (
                    <Image src={product.images[0].url} alt={product.name} width={200} height={200} className="object-contain w-full h-full" />
                ) : (
                    <span className="text-gray-400 text-sm">Фото отсутствует</span>
                )}
            </div>

            <div className="w-full bg-white rounded-md shadow-sm p-3 mb-2 text-left">
                <p className="text-lg font-semibold truncate text-violet-600">{product.name}</p>
                <p className="text-base font-normal text-violet-600">{product.details}</p>
                <p className="text-sm text-gray-700">{product.color}</p>
                <p className="text-sm text-gray-700">{product.processor}</p>
            </div>

            <div className="w-full flex justify-between items-center mt-2">
                <span className="text-2xl font-bold text-violet-600">{product.price}</span>
                <button
                    onClick={handleAddToCart}
                    className={clsx("p-2 rounded-full bg-white hover:bg-violet-600 transition-transform duration-300 flex items-center justify-center",
                        animCart && "animate-bounce"
                    )}
                >
                    <ShoppingCart className={`w-5 h-5 ${carted ? "text-violet-600" : "text-black"}`} />
                </button>
            </div>

            <div className={clsx(
                "mt-4 w-full flex flex-col gap-2 p-3 rounded-lg shadow-sm transition-all duration-300",
                animReview && "bg-violet-200 shadow-lg"
            )}>
                {reviewSent && <div className="text-sm text-white font-semibold mb-1 animate-pulse">Отзыв отправлен!</div>}
                <textarea
                    value={review}
                    onChange={e => setReview(e.target.value)}
                    placeholder="Оставьте отзыв..."
                    className="w-full p-2 border border-gray-300 rounded resize-none text-sm"
                />
                <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                        {Array.from({ length: 5 }, (_, i) => (
                            <Star key={i} className={clsx("w-5 h-5 cursor-pointer", i < rating ? "text-yellow-400" : "text-gray-300")}
                                  onClick={() => setRating(i + 1)} />
                        ))}
                    </div>
                    <button onClick={handleAddReview} className="px-3 py-1 bg-violet-600 text-white rounded hover:bg-violet-500">Отправить</button>
                </div>
            </div>
        </div>
    )
}
