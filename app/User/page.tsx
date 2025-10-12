'use client'

import React, { useState, useEffect } from "react"
import Image from "next/image"
import { User } from "lucide-react"
import { useRouter } from "next/navigation"
import { fetchData } from "@/lib/api"

interface Order {
    id: string
    item: string
    date: string
    status: string
}

interface ProfileData {
    username: string
    email: string
    totalOrders: number
    lastLogin: string
    status: string
    orders: Order[]
}

export default function ProfileLayout() {
    const router = useRouter()
    const [activeView, setActiveView] = useState<'orders' | 'settings'>('orders')
    const [userData, setUserData] = useState<ProfileData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const token = localStorage.getItem("auth_token")
        if (!token) {
            router.push("/Authorization")
            return
        }

        async function loadUser() {
            setLoading(true)
            setError(null)
            try {
                const res = await fetchData("/users/me", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                })

                if (!res.username) {
                    throw new Error("Не удалось загрузить данные профиля")
                }

                setUserData({
                    username: res.username,
                    email: res.email,
                    totalOrders: res.orders?.length ?? 0,
                    lastLogin: res.lastLogin,
                    status: res.status ?? "Активен",
                    orders: res.orders ?? []
                })
            } catch (err: any) {
                setError(err.message || "Ошибка при загрузке профиля")
            } finally {
                setLoading(false)
            }
        }

        loadUser()
    }, [router])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center p-8">
                <div className="text-violet-200 text-xl">Загрузка профиля...</div>
            </div>
        )
    }

    if (error || !userData) {
        return (
            <div className="min-h-screen flex items-center justify-center p-8">
                <div className="text-red-600 text-lg">{error || "Профиль не найден"}</div>
            </div>
        )
    }

    const SidebarMenu = () => (
        <div className="flex-shrink-0 w-64 bg-violet-200 rounded-2xl p-6 flex flex-col gap-8">
            <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow">
                    <User/>
                </div>
                <h2 className="mt-3 text-xl font-bold text-gray-900 flex items-center gap-2">
                    {userData.username}
                    <Image
                        src="/Other/BothGT.png"
                        alt="Decorative"
                        width={20}
                        height={20}
                        className="object-cover w-full h-full"
                    />
                </h2>
                <span className="text-gray-600 text-sm">{userData.status}</span>
            </div>
            <ul className="flex flex-col gap-2 font-medium text-gray-700">
                <li
                    className={`cursor-pointer px-4 py-2 rounded-lg ${activeView === 'orders' ? 'bg-violet-200 text-white' : 'hover:bg-violet-100'}`}
                    onClick={() => setActiveView('orders')}
                >
                    Заказы ({userData.totalOrders})
                </li>
                <li
                    className={`cursor-pointer px-4 py-2 rounded-lg ${activeView === 'settings' ? 'bg-violet-200 text-white' : 'hover:bg-violet-100'}`}
                    onClick={() => setActiveView('settings')}
                >
                    Настройки профиля
                </li>
            </ul>
        </div>
    )

    const OrdersView = () => (
        <div className="flex-1 p-8 bg-violet-200 rounded-2xl shadow-inner">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Ваши заказы</h2>
            {userData.orders.length === 0 ? (
                <p className="text-gray-700">У вас нет заказов</p>
            ) : (
                <div className="grid gap-4">
                    {userData.orders.map(order => (
                        <div key={order.id} className="flex justify-between items-center p-4 bg-violet-100 rounded-xl">
                            <div className="flex flex-col">
                                <span className="font-semibold text-gray-900">{order.item}</span>
                                <span className="text-gray-700 text-sm">{order.date}</span>
                            </div>
                            <span className={`font-medium text-sm ${order.status === "Доставлен" ? "text-green-600" : order.status === "В пути" ? "text-yellow-600" : "text-gray-500"}`}>
                                {order.status}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )

    const SettingsView = () => (
        <div className="flex-1 p-8 bg-violet-200 rounded-2xl shadow-inner">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Настройки профиля</h2>
            <form className="flex flex-col gap-4 max-w-md">
                <div className="flex flex-col">
                    <label className="text-gray-700 font-medium">Имя пользователя</label>
                    <input type="text" value={userData.username} readOnly className="border border-gray-300 rounded-lg px-3 py-2 bg-violet-100" />
                </div>
                <div className="flex flex-col">
                    <label className="text-gray-700 font-medium">Email</label>
                    <input type="email" value={userData.email} readOnly className="border border-gray-300 rounded-lg px-3 py-2 bg-violet-100" />
                </div>
                <div className="flex flex-col">
                    <label className="text-gray-700 font-medium">Пароль</label>
                    <input type="password" value="••••••••" readOnly className="border border-gray-300 rounded-lg px-3 py-2 bg-violet-100" />
                </div>
                <div className="flex gap-4 mt-4">
                    <button type="button" className="bg-violet-300 text-white py-2 px-6 rounded-lg">Сменить пароль</button>
                    <button type="button" className="bg-red-200 text-white py-2 px-6 rounded-lg" onClick={() => {
                        localStorage.removeItem("auth_token")
                        router.push("/Authorization")
                    }}>Выйти</button>
                </div>
            </form>
        </div>
    )

    return (
        <div className="min-h-screen flex gap-6 p-8 font-sans">
            <SidebarMenu />
            {activeView === 'orders' && <OrdersView />}
            {activeView === 'settings' && <SettingsView />}
        </div>
    )
}
