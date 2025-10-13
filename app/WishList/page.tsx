'use client'

import { useEffect, useState } from "react"
import ProductCard from "@/app/_components/Product/ProductCard";
import { fetchData } from "@/lib/api"

interface Product {
    id: number
    name: string
    price: number
    description: string
    brand?: { name: string }
}

interface WishlistItem {
    id: number
    product_id: number
    product: Product
}

export default function WishlistPage() {
    const [wishlist, setWishlist] = useState<WishlistItem[]>([])
    const [userId, setUserId] = useState<number | null>(null)

    useEffect(() => {
        const loadWishlist = async () => {
            const token = localStorage.getItem("token")
            if (!token) return
            try {
                const user = await fetchData<{ id: number }>("/users/me", {
                    headers: { Authorization: `Bearer ${token}` },
                })
                setUserId(user.id)
                const items = await fetchData<WishlistItem[]>(`/wish_lists/${user.id}`)
                setWishlist(items)
            } catch (err) {
                console.error(err)
            }
        }
        loadWishlist()
    }, [])

    const handleRemove = async (itemId: number) => {
        try {
            await fetchData(`/wish_lists/${itemId}`, { method: "DELETE" })
            setWishlist(prev => prev.filter(i => i.id !== itemId))
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="min-h-screen p-8 font-sans">
            <h1 className="text-3xl font-bold mb-6">Мой Wishlist</h1>
            {wishlist.length === 0 ? (
                <p className="text-gray-500">Список пуст</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {wishlist.map(item => (
                        <div key={item.id} className="relative">
                            <ProductCard
                                product={item.product}
                                userId={userId}
                                inCart={false}
                                inWishlist={true}
                            />
                            <button
                                className="absolute top-2 right-2 text-red-500"
                                onClick={() => handleRemove(item.id)}
                            >
                                Удалить
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
