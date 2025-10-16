'use client'

import { useEffect, useState } from "react"
import { useParams, useSearchParams } from "next/navigation"
import { fetchData } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import ProductCard from "@/app/_components/Product/ProductCard"

interface Product {
    id: number
    name: string
    details: string
    color: string
    processor: string
    price: string
    images?: { url: string }[]
}

interface CartItem { product_id: number }
interface WishlistItem { product_id: number }

type FilterType = "A-Z" | "Z-A" | "RAND" | null

export default function CategoryPage() {
    const { slug } = useParams()
    const searchParams = useSearchParams()
    const [products, setProducts] = useState<Product[]>([])
    const [filter, setFilter] = useState<FilterType>(null)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(1)
    const [loading, setLoading] = useState(true)
    const [cart, setCart] = useState<number[]>([])
    const [wishlist, setWishlist] = useState<number[]>([])

    const pageFromUrl = searchParams.get("page")

    const log = (msg: string, extra?: unknown) => {
        const timestamp = new Date().toISOString()
        console.log(`[${timestamp}] ${msg}` + (extra ? ` | ${JSON.stringify(extra)}` : ""))
    }

    useEffect(() => {
        if (pageFromUrl) setCurrentPage(Number(pageFromUrl))
    }, [pageFromUrl])

    useEffect(() => {
        const loadCategory = async () => {
            if (!slug) return
            try {
                setLoading(true)
                log(`🟢 Загрузка категории: ${slug}, страница ${currentPage}`)
                const data = await fetchData<{ products: { data: Product[]; last_page: number } }>(`/categories/${slug}?page=${currentPage}`)
                setProducts(data.products.data)
                setTotalPages(data.products.last_page)
                log("✅ Категория загружена", { count: data.products.data.length })
            } catch (err) {
                log("🔥 Ошибка загрузки категории", err)
            } finally {
                setLoading(false)
            }
        }
        loadCategory()
    }, [slug, currentPage])

    const sortedProducts = (): Product[] => {
        const copy = [...products]
        switch (filter) {
            case "A-Z":
                return copy.sort((a, b) => a.name.localeCompare(b.name))
            case "Z-A":
                return copy.sort((a, b) => b.name.localeCompare(a.name))
            case "RAND":
                for (let i = copy.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1))
                    ;[copy[i], copy[j]] = [copy[j], copy[i]]
                }
                return copy
            default:
                return copy
        }
    }

    const handlePrev = () => { if (currentPage > 1) setCurrentPage(prev => prev - 1) }
    const handleNext = () => { if (currentPage < totalPages) setCurrentPage(prev => prev + 1) }

    if (!slug) return <div className="p-8">Категория не выбрана</div>
    if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-10 w-10 border-4 border-violet-200 border-t-transparent"></div></div>

    return (
        <div className="min-h-screen flex flex-col lg:flex-row gap-8 p-8">
            <aside className="w-full lg:w-64 flex-shrink-0 bg-violet-200 rounded-2xl p-6 h-fit">
                <h2 className="text-xl font-bold mb-4">Фильтр карточек</h2>
                <div className="flex flex-col gap-2">
                    <Button variant={filter === null ? "default" : "outline"} onClick={() => setFilter(null)}>Все</Button>
                    <Button variant={filter === "A-Z" ? "default" : "outline"} onClick={() => setFilter("A-Z")}>А-Я</Button>
                    <Button variant={filter === "Z-A" ? "default" : "outline"} onClick={() => setFilter("Z-A")}>Я-А</Button>
                    <Button variant={filter === "RAND" ? "default" : "outline"} onClick={() => setFilter("RAND")}>Рандом</Button>
                </div>
            </aside>

            <main className="flex-1">
                {products.length === 0 ? (
                    <div>Товары не найдены.</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {sortedProducts().map(p => (
                            <ProductCard key={p.id} product={p} inCart={cart.includes(p.id)} inWishlist={wishlist.includes(p.id)} />
                        ))}
                    </div>
                )}

                {totalPages > 1 && (
                    <div className="mt-8 flex justify-center">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem><PaginationPrevious onClick={handlePrev} isActive={currentPage > 1} /></PaginationItem>
                                <PaginationItem><span className="px-4 py-2">{currentPage} / {totalPages}</span></PaginationItem>
                                <PaginationItem><PaginationNext onClick={handleNext} isActive={currentPage < totalPages} /></PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                )}
            </main>
        </div>
    )
}
