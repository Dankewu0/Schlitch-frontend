'use client'

import React, { useState, useEffect } from "react"
import Image from "next/image"
import { User, Mail, Clock } from "lucide-react"
import { useRouter } from "next/navigation"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"

interface ProfileApiResponse { username: string; email: string }
interface ProfileData { username: string; email: string; createdAt?: string }

export default function ProfileLayout() {
    const router = useRouter()
    const [userData, setUserData] = useState<ProfileData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [nickHovered, setNickHovered] = useState(false)
    const [lastVisit, setLastVisit] = useState(new Date())

    useEffect(() => {
        async function loadUser() {
            setLoading(true)
            setError(null)
            try {
                await fetch(`${API_BASE_URL}/sanctum/csrf-cookie`, { credentials: 'include' })
                const res = await fetch(`${API_BASE_URL}/user`, {
                    method: "GET",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                })
                if (!res.ok) throw new Error(`Ошибка ${res.status}: Не удалось загрузить данные профиля`)
                const data: ProfileApiResponse = await res.json()
                setUserData({ username: data.username, email: data.email, createdAt: new Date().toISOString() })
            } catch (err: unknown) {
                if (err instanceof Error) setError(err.message)
                else setError("Ошибка при загрузке профиля")
            } finally { setLoading(false) }
        }
        loadUser()
    }, [router])

    useEffect(() => {
        const interval = setInterval(() => setLastVisit(new Date()), 1000)
        return () => clearInterval(interval)
    }, [])

    const handleLogout = async () => {
        try {
            await fetch(`${API_BASE_URL}/sanctum/csrf-cookie`, { credentials: 'include' })
            const xsrfToken = document.cookie.split('; ').find(row => row.startsWith('XSRF-TOKEN='))?.split('=')[1]
            const res = await fetch(`${API_BASE_URL}/logout`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'X-XSRF-TOKEN': decodeURIComponent(xsrfToken || '') },
            })
            if (!res.ok) throw new Error("Не удалось выйти")
            router.push('/Authorization')
        } catch (err: unknown) {
            if (err instanceof Error) alert(err.message)
        }
    }

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center p-8 bg-violet-100">
            <div className="text-violet-200 text-xl">Загрузка профиля...</div>
        </div>
    )
    if (error || !userData) return (
        <div className="min-h-screen flex items-center justify-center p-8 bg-violet-100">
            <div className="text-red-600 text-lg">{error || "Профиль не найден"}</div>
        </div>
    )

    const SidebarMenu = () => (
        <div className="flex-shrink-0 w-full sm:w-64 bg-violet-300 rounded-2xl p-8 flex flex-col gap-8 items-center relative">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-lg transform transition-transform duration-500 hover:-translate-y-1 hover:scale-105 hover:shadow-xl p-4">
                <User className="w-full h-full text-white p-2"/>
            </div>

            <div
                className="relative mt-3 text-xl font-bold text-white flex items-center gap-2 cursor-pointer p-4"
                onMouseEnter={() => setNickHovered(true)}
                onMouseLeave={() => setNickHovered(false)}
            >
                <span className={`transition-colors duration-300 ${nickHovered ? 'text-yellow-300 animate-pulse' : 'text-white'}`}>
                    {userData.username}
                </span>
                <Image src="/Other/BothGT.png" alt="Decorative" width={20} height={20} className="object-cover w-full h-full"/>
                {nickHovered && (
                    <button
                        className="absolute -top-10 right-0 bg-yellow-400 text-white px-3 py-1 rounded shadow-lg animate-bounce"
                        onClick={() => alert("Привет, мудрец!")}>
                        👋
                    </button>
                )}
            </div>

            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full shadow-inner hover:bg-white/30 transition-colors duration-300">
                <Mail className="w-4 h-4 text-white"/>
                <span className="text-white text-sm truncate max-w-[10rem]">{userData.email}</span>
            </div>

            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full shadow-inner animate-fade-in">
                <Clock className="w-4 h-4 text-white"/>
                <span className="text-white text-sm">{lastVisit.toLocaleTimeString()}</span>
            </div>

            <button
                className="bg-red-400 text-white py-2 px-6 rounded-lg mt-4 hover:bg-red-500 transition-all duration-200 transform hover:scale-105"
                onClick={handleLogout}
            >
                Выйти
            </button>
        </div>
    )

    const ProfileView = () => (
        <div className="flex-1 p-8 bg-violet-100 rounded-2xl shadow-inner flex flex-col gap-8 animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Информация о профиле</h2>
            <div className="flex flex-col gap-6 max-w-md">
                <div className="transition-transform duration-300 hover:scale-105 p-4 bg-white rounded-lg shadow-sm">
                    <label className="text-gray-700 font-medium">Дата создания профиля</label>
                    <input
                        type="text"
                        value={userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString() : new Date().toLocaleDateString()}
                        readOnly
                        className="border border-gray-300 rounded-lg px-3 py-2 w-full bg-white"
                    />
                </div>

                <div className="transition-transform duration-300 hover:scale-105 p-4 bg-white rounded-lg shadow-sm">
                    <label className="text-gray-700 font-medium">Email</label>
                    <input type="email" value={userData.email} readOnly className="border border-gray-300 rounded-lg px-3 py-2 w-full bg-white" />
                </div>

                <div className="transition-transform duration-300 hover:scale-105 p-4 bg-white rounded-lg shadow-sm">
                    <label className="text-gray-700 font-medium">Последний визит</label>
                    <input type="text" value={lastVisit.toLocaleString()} readOnly className="border border-gray-300 rounded-lg px-3 py-2 w-full bg-white" />
                </div>
            </div>
        </div>
    )

    return (
        <div className="min-h-screen flex flex-col sm:flex-row gap-6 p-8 font-sans">
            <SidebarMenu />
            <ProfileView />
        </div>
    )
}
