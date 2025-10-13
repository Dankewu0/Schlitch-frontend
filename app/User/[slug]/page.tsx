'use client'

import React, { useEffect, useState } from "react"
import Image from "next/image"
import { User } from "lucide-react"
import { useRouter } from "next/navigation"

interface UserData {
    username: string
    registeredAt: string
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"

export default function PublicProfilePage({ params }: { params: { slug: string } }) {
    const router = useRouter()
    const slug = params.slug
    const [userData, setUserData] = useState<UserData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true)
            setError(null)
            try {
                const res = await fetch(`${API_BASE_URL}/users?username=${encodeURIComponent(slug)}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                })
                if (!res.ok) throw new Error("Ошибка загрузки пользователей")
                const user: UserData | null = await res.json()
                if (!user || !user.username) {
                    router.push('/UserNotFound')
                    return
                }
                setUserData(user)
            } catch {
                setError("Не удалось загрузить профиль")
            } finally {
                setLoading(false)
            }
        }
        fetchUser()
    }, [slug, router])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full w-12 h-12 border-4 border-violet-300 border-t-transparent"></div>
                    <p className="text-violet-400 font-medium">Загрузка профиля...</p>
                </div>
            </div>
        )
    }

    if (error || !userData) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="bg-violet-50 p-12 rounded-2xl shadow-lg text-center max-w-md">
                    <p className="text-2xl font-bold text-red-600 mb-4">Ошибка загрузки профиля</p>
                    <p className="text-gray-700">{error}</p>
                </div>
            </div>
        )
    }

    const { username, registeredAt } = userData

    return (
        <div className="flex items-center justify-center min-h-screen p-8 bg-white">
            <div className="flex flex-col gap-4 w-full max-w-3xl">
                <div className="bg-violet-200/30 rounded-2xl p-6 flex flex-col items-center gap-4 shadow-lg">
                    <div className="w-32 h-32 rounded-full bg-violet-100 flex items-center justify-center shadow-inner">
                        <User className="w-16 h-16 text-violet-400" />
                    </div>
                    <Image
                        src="/Other/BothGT.png"
                        alt="Decorative"
                        width={60}
                        height={60}
                        className="object-cover rounded-lg"
                    />
                </div>
                <div className="flex gap-4">
                    <div className="flex-1 bg-violet-100 rounded-2xl p-4 flex justify-center items-center shadow-inner">
                        <span className="text-gray-900 font-semibold text-lg">{username}</span>
                    </div>
                    <div className="flex-1 bg-violet-100 rounded-2xl p-4 flex justify-center items-center shadow-inner">
                        <span className="text-gray-900 font-semibold text-lg">{registeredAt}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
