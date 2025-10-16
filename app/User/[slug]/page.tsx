'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { User } from 'lucide-react'

interface UserData {
    username: string
    registeredAt: string
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'

export default function PublicProfilePage({ params }: { params: Promise<{ slug: string }> }) {
    const router = useRouter()
    const [slug, setSlug] = useState<string | null>(null)
    const [userData, setUserData] = useState<UserData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const resolveParams = async () => {
            const resolved = await params
            setSlug(resolved.slug)
        }
        resolveParams()
    }, [params])

    useEffect(() => {
        if (!slug) return

        const fetchUser = async () => {
            setLoading(true)
            setError(null)
            try {
                const res = await fetch(`${API_BASE_URL}/users?username=${encodeURIComponent(slug)}`, {
                    credentials: 'include',
                })
                if (!res.ok) throw new Error('Ошибка загрузки профиля')
                const data: UserData = await res.json()
                if (!data?.username) {
                    router.push('/UserNotFound')
                    return
                }
                setUserData(data)
            } catch {
                setError('Не удалось загрузить профиль')
            } finally {
                setLoading(false)
            }
        }

        fetchUser()
    }, [slug, router])

    if (loading) return <div className="flex justify-center items-center min-h-screen">Загрузка...</div>
    if (error || !userData) return <div className="flex justify-center items-center min-h-screen text-red-600">{error || 'Профиль не найден'}</div>

    return (
        <div className="flex items-center justify-center min-h-screen p-8 bg-white">
            <div className="flex flex-col gap-4 w-full max-w-3xl">
                <div className="bg-violet-200/30 rounded-2xl p-6 flex flex-col items-center gap-4 shadow-lg">
                    <div className="w-32 h-32 rounded-full bg-violet-100 flex items-center justify-center shadow-inner">
                        <User className="w-16 h-16 text-violet-400" />
                    </div>
                    <Image src="/Other/BothGT.png" alt="Decorative" width={60} height={60} className="object-cover rounded-lg" />
                </div>
                <div className="flex gap-4">
                    <div className="flex-1 bg-violet-100 rounded-2xl p-4 flex justify-center items-center shadow-inner">
                        <span className="text-gray-900 font-semibold text-lg">{userData.username}</span>
                    </div>
                    <div className="flex-1 bg-violet-100 rounded-2xl p-4 flex justify-center items-center shadow-inner">
                        <span className="text-gray-900 font-semibold text-lg">{userData.registeredAt}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
