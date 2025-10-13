'use client'

import { Heart, ShoppingCart } from "lucide-react"
import Image from "next/image"
import Reviews from "@/app/_components/Product/Review";

interface Product {
    id: number
    name: string
    price: number
    description: string
    images?: { url: string }[]
    brand?: { name: string }
}

interface ProductCardProps {
    product: Product
    userId: number | null
    inCart: boolean
    inWishlist: boolean
}

export default function ProductCard({
                                        product,
                                        userId,
                                        inCart,
                                        inWishlist,
                                    }: ProductCardProps) {
    const handleAddToCart = () => {
        if (!userId) return
        console.log(`Добавляем продукт ${product.id} в корзину пользователя ${userId}`)
    }

    const handleAddToWishlist = () => {
        if (!userId) return
        console.log(`Добавляем продукт ${product.id} в wishlist пользователя ${userId}`)
    }

    return (
        <div className="bg-violet-600 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all">
            <div className="p-4 flex flex-col gap-3">
                <div
                    className="flex justify-end cursor-pointer"
                    onClick={handleAddToWishlist}
                >
                    <Heart className={`w-5 h-5 ${inWishlist ? "text-violet-600" : "text-white"}`} />
                </div>

                <div className="aspect-square rounded-xl overflow-hidden bg-violet-100 flex items-center justify-center">
                    {product.images && product.images.length > 0 ? (
                        <Image
                            src={product.images[0].url}
                            alt={product.name}
                            width={200}
                            height={200}
                            className="object-cover w-full h-full"
                        />
                    ) : (
                        <span className="text-gray-400 text-sm">Фото отсутствует</span>
                    )}
                </div>

                <div className="text-center bg-white text-violet-600 shadow-sm rounded-md p-2">
                    <h3 className="text-lg font-semibold truncate">{product.name}</h3>
                    <p className="text-sm line-clamp-2">{product.description}</p>
                    <span className="text-violet-600 font-bold">{product.price} ₽</span>
                </div>

                <div
                    className="mt-2 flex justify-center cursor-pointer"
                    onClick={handleAddToCart}
                >
                    <ShoppingCart className={`w-5 h-5 ${inCart ? "text-violet-600" : "text-white"}`} />
                </div>
            </div>

            <div className="mt-4">
                <Reviews productId={product.id} />
            </div>
        </div>
    )
}
