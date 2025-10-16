'use client'

import { useEffect, useState } from "react"
import ProductCard from "@/app/_components/Product/ProductCard"
import { fetchData } from "@/lib/api"
import { Button } from "@/components/ui/button"

interface Offer {
    id: number
    product: {
        id: number
        name: string
        price: number
        description: string
        images?: { url: string }[]
    }
    type: "discount" | "clearance"
    discountPercent?: number
}

export default function OffersPage() {
    const [offers, setOffers] = useState<Offer[]>([])
    const [filtered, setFiltered] = useState<Offer[]>([])
    const [filterType, setFilterType] = useState<"all" | "discount" | "clearance">("all")
    const [loading, setLoading] = useState(true)

    const userId = 1 // мок
    const inCart: number[] = []
    const inWishlist: number[] = []

    useEffect(() => {
        const loadOffers = async () => {
            console.group("📦 Загрузка предложений")

            try {
                console.log("➡ Запрос: /offers")
                const data = await fetchData<Offer[]>("/offers")
                console.log(`✅ Получено предложений: ${data.length}`)
                setOffers(data)
            } catch (err: any) {
                console.error("🔥 Ошибка при загрузке предложений:")
                console.error("Тип ошибки:", err?.name)
                console.error("Сообщение:", err?.message)
                console.error("Стек:", err?.stack)

                if (err?.response) {
                    console.error("Ответ сервера:", err.response)
                    try {
                        const text = await err.response.text()
                        console.error("Тело ответа:", text)
                    } catch (parseErr) {
                        console.error("Ошибка при чтении тела ответа:", parseErr)
                    }
                }

                console.table({
                    URL: "/offers",
                    Method: "GET",
                    Time: new Date().toLocaleString(),
                })
            } finally {
                console.groupEnd()
                setLoading(false)
            }
        }

        loadOffers()
    }, [])

    useEffect(() => {
        if (filterType === "all") setFiltered(offers)
        else setFiltered(offers.filter(o => o.type === filterType))
    }, [filterType, offers])

    if (loading)
        return (
            <div className="min-h-screen flex items-center justify-center text-violet-600 text-xl">
                Загрузка предложений...
            </div>
        )

    return (
        <div className="min-h-screen p-6 bg-white">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Акции и предложения</h1>

            <div className="flex flex-wrap gap-2 mb-6">
                <Button
                    variant={filterType === "all" ? "default" : "outline"}
                    className="bg-white text-violet-600 hover:bg-violet-100"
                    onClick={() => setFilterType("all")}
                >
                    Все
                </Button>
                <Button
                    variant={filterType === "discount" ? "default" : "outline"}
                    className="bg-white text-violet-600 hover:bg-violet-100"
                    onClick={() => setFilterType("discount")}
                >
                    Скидки
                </Button>
                <Button
                    variant={filterType === "clearance" ? "default" : "outline"}
                    className="bg-white text-violet-600 hover:bg-violet-100"
                    onClick={() => setFilterType("clearance")}
                >
                    Уценка
                </Button>
            </div>

            {filtered.length === 0 ? (
                <p className="text-gray-700 text-lg">Нет предложений</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filtered.map(o => (
                        <div key={o.id} className="relative">
                            {o.type === "clearance" && (
                                <span className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-sm z-10">
                                    Уценка
                                </span>
                            )}
                            {o.type === "discount" && o.discountPercent && (
                                <span className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 rounded text-sm z-10">
                                    {o.discountPercent}%
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
