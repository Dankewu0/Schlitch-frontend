'use client'

import { useEffect, useState } from "react"
import { useSearchParams, useParams } from "next/navigation"
import { fetchData } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import ProductCard from "@/app/_components/Product/ProductCard"

interface Product {
    id: number
    name: string
    price: number
    description: string
    brand?: { name: string }
}

interface Brand {
    id: number
    name: string
}

interface CartItem {
    product_id: number
}

interface WishlistItem {
    product_id: number
}

export default function CategoryPage() {
    const { slug } = useParams()
    const searchParams = useSearchParams()
    const [products, setProducts] = useState<Product[]>([])
    const [brands, setBrands] = useState<Brand[]>([])
    const [selectedBrand, setSelectedBrand] = useState<string | null>(null)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(1)
    const [loading, setLoading] = useState(true)
    const [userId, setUserId] = useState<number | null>(null)
    const [cart, setCart] = useState<number[]>([])
    const [wishlist, setWishlist] = useState<number[]>([])

    const pageFromUrl = searchParams.get("page")

    useEffect(() => {
        if (pageFromUrl) setCurrentPage(Number(pageFromUrl))
    }, [pageFromUrl])

    useEffect(() => {
        const loadUser = async () => {
            const token = localStorage.getItem("token")
            if (!token) return
            try {
                const user = await fetchData<{ id: number }>("/users/me", {
                    headers: { "Authorization": `Bearer ${token}` }
                })
                setUserId(user.id)
                const cartData = await fetchData<CartItem[]>(`/cart/${user.id}`)
                const wishData = await fetchData<WishlistItem[]>(`/wish_lists/${user.id}`)
                setCart(cartData.map(c => c.product_id))
                setWishlist(wishData.map(w => w.product_id))
            } catch (err) {
                console.error(err)
            }
        }
        loadUser()
    }, [])

    useEffect(() => {
        const loadCategory = async () => {
            try {
                setLoading(true)
                const data = await fetchData<{
                    products: { data: Product[], last_page: number },
                    brands: Brand[]
                }>(`/categories/${slug}?page=${currentPage}${selectedBrand ? `&brand=${selectedBrand}` : ""}`)
                setProducts(data.products.data)
                setBrands(data.brands)
                setTotalPages(data.products.last_page)
            } catch (err) {
                console.error("Ошибка загрузки:", err)
            } finally {
                setLoading(false)
            }
        }
        loadCategory()
    }, [slug, selectedBrand, currentPage])

    const handleBrandSelect = (brand: string | null) => {
        setSelectedBrand(brand)
        setCurrentPage(1)
    }

    const handlePrev = () => { if (currentPage > 1) setCurrentPage(prev => prev - 1) }
    const handleNext = () => { if (currentPage < totalPages) setCurrentPage(prev => prev + 1) }

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-violet-200 border-t-transparent"></div>
        </div>
    )

    return (
        <div className="min-h-screen flex flex-col lg:flex-row gap-8 p-8 font-sans">
            <aside className="w-full lg:w-64 flex-shrink-0 bg-violet-200 rounded-2xl p-6 h-fit">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Фильтр по бренду</h2>
                <div className="flex flex-col gap-2">
                    <Button
                        variant={selectedBrand === null ? "default" : "outline"}
                        onClick={() => handleBrandSelect(null)}
                        className="bg-violet-300 text-white hover:bg-violet-400"
                    >Все бренды</Button>
                    {brands.map(b => (
                        <Button
                            key={b.id}
                            variant={selectedBrand === b.name ? "default" : "outline"}
                            onClick={() => handleBrandSelect(b.name)}
                            className={`text-gray-800 ${selectedBrand === b.name ? "bg-violet-300 text-white" : "bg-white hover:bg-violet-100"}`}
                        >{b.name}</Button>
                    ))}
                </div>
            </aside>

            <main className="flex-1">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Категория: {slug}</h1>
                {products.length === 0 ? (
                    <div className="text-gray-500 text-lg">Товары не найдены.</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products.map(p => (
                            <ProductCard
                                key={p.id}
                                product={p}
                                userId={userId}
                                inCart={cart.includes(p.id)}
                                inWishlist={wishlist.includes(p.id)}
                            />
                        ))}
                    </div>
                )}

                {totalPages > 1 && (
                    <div className="mt-8 flex justify-center">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious onClick={handlePrev} className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}/>
                                </PaginationItem>
                                <PaginationItem>
                                    <span className="px-4 py-2">{currentPage} / {totalPages}</span>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationNext onClick={handleNext} className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}/>
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                )}
            </main>
        </div>
    )
}
