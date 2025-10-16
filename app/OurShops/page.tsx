'use client'

import React, { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { fetchData } from "@/lib/api"
import { MapPin, Phone } from "lucide-react"
import Cookies from "js-cookie"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"

interface ShopItem {
    id: number
    name: string
    address: string
    phone?: string
    type: "shop" | "pickup"
}

export default function OurShopsPage() {
    const [shops, setShops] = useState<ShopItem[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadShops = async () => {
            setLoading(true)
            try {
                const xsrf = Cookies.get("XSRF-TOKEN")

                const [shopRes, pickupRes] = await Promise.all([
                    fetch(`${API_BASE_URL}/shop-info`, {
                        credentials: "include",
                        headers: { "X-XSRF-TOKEN": xsrf ?? "" }
                    }),
                    fetch(`${API_BASE_URL}/pickup-points`, {
                        credentials: "include",
                        headers: { "X-XSRF-TOKEN": xsrf ?? "" }
                    })
                ])

                let data: ShopItem[] = []

                if (shopRes.ok) {
                    const shopData: { id: number; name: string; address: string; phone?: string }[] = await shopRes.json()
                    data = shopData.map<ShopItem>(s => ({ ...s, type: "shop" }))
                }

                if (pickupRes.ok) {
                    const pickupData: { id: number; name: string; address: string; phone?: string }[] = await pickupRes.json()
                    data = [
                        ...data,
                        ...pickupData.map<ShopItem>(p => ({ ...p, type: "pickup" }))
                    ]
                }

                if (!data.length) throw new Error("Нет данных")
                setShops(data)
            } catch {
                const mock: ShopItem[] = [
                    { id: -1, name: "Главный магазин", address: "ул. Ленина, 1", phone: "+7 999 999 99 99", type: "shop" },
                    { id: -2, name: "Магазин на Площади", address: "ул. Пушкина, 12", phone: "+7 000 000 00 00", type: "shop" },
                    { id: -3, name: "Пункт выдачи №1", address: "ул. Гагарина, 5", type: "pickup" },
                    { id: -4, name: "Пункт выдачи №2", address: "пр. Мира, 10", type: "pickup" },
                ]
                setShops(mock)
            } finally {
                setLoading(false)
            }
        }

        loadShops()
    }, [])

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center text-violet-500 text-xl bg-white">
            Загрузка магазинов...
        </div>
    )

    return (
        <main className="min-h-screen p-6 bg-white font-sans">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">Наши магазины и пункты выдачи</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {shops.map(shop => (
                    <Card key={shop.id} className="border-violet-400 shadow-md hover:shadow-xl transition-shadow duration-300">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold text-violet-700 flex justify-between items-center">
                                {shop.name}
                                <span className={`text-sm px-2 py-1 rounded ${shop.type === "shop" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}`}>
                                    {shop.type === "shop" ? "Магазин" : "Пункт выдачи"}
                                </span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-2">
                            <div className="flex items-center gap-2 text-gray-700">
                                <MapPin className="w-4 h-4 text-violet-500"/>
                                <span>{shop.address}</span>
                            </div>
                            {shop.phone && (
                                <div className="flex items-center gap-2 text-gray-700">
                                    <Phone className="w-4 h-4 text-violet-500"/>
                                    <span>{shop.phone}</span>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </main>
    )
}
