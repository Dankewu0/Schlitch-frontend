'use client'

import React, { useState, useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import { User, Key, Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"

interface MessageState {
    text: string
    isError: boolean
}

interface LoginResponse {
    success: boolean
    message?: string
    token?: string
    user?: { name: string }
}

export default function Authorization() {
    const router = useRouter()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<MessageState | null>(null)
    const [user, setUser] = useState<LoginResponse['user'] | null>(null)

    const clearMessage = () => setTimeout(() => setMessage(null), 5000)

    const fetchMe = useCallback(async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/user`, {
                credentials: "include",
            })
            if (!res.ok) return
            const data = await res.json()
            setUser(data)
        } catch (err) {}
    }, [])

    useEffect(() => {
        fetchMe()
    }, [fetchMe])

    const loginHandler = useCallback(async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setMessage(null)

        try {
            await fetch(`${API_BASE_URL}/sanctum/csrf-cookie`, {
                credentials: "include",
            })

            const xsrfToken = document.cookie
                .split("; ")
                .find(row => row.startsWith("XSRF-TOKEN="))
                ?.split("=")[1]

            const res = await fetch(`${API_BASE_URL}/login`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "X-XSRF-TOKEN": decodeURIComponent(xsrfToken || ""),
                },
                body: JSON.stringify({ username, password }),
            })

            const data: LoginResponse = await res.json().catch(() => ({
                success: false,
                message: "Сервер вернул не JSON",
            }))

            if (res.ok && data.success) {
                if (data.token) { // если сервер возвращает токен
                    localStorage.setItem("token", data.token)
                }

                setMessage({
                    text: `Добро пожаловать, ${data.user?.name || username}!`,
                    isError: false,
                })
                setTimeout(() => router.push("/"), 1500)
            } else {
                const errorText = data.message || "Неверные данные или ошибка сервера."
                setMessage({ text: errorText, isError: true })
                clearMessage()
            }
        } catch (err) {
            setMessage({
                text: "Не удалось связаться с сервером. Проверьте API.",
                isError: true,
            })
            clearMessage()
        } finally {
            setLoading(false)
        }
    }, [username, password, router])



    return (
        <div className="min-h-screen flex items-center justify-center font-sans px-4">
            <div className="w-full max-w-3xl p-10 bg-white rounded-3xl shadow-md border border-violet-200">
                <div className="mb-6 text-center">
                    <h2 className="text-3xl font-extrabold text-gray-800 flex justify-center items-center">
                        <Image
                            src="/Other/GTWoman.png"
                            width={40}
                            height={30}
                            alt="Вентилятор"
                            className="object-contain pr-3"
                        />
                        Авторизация
                    </h2>
                    <p className="text-gray-600 mt-2 text-lg">Введите ваши данные для входа</p>
                </div>

                {message && (
                    <div
                        className={`px-4 py-2 mb-4 rounded-lg border ${
                            message.isError
                                ? "bg-red-50 text-red-600 border-violet-200"
                                : "bg-green-50 text-green-600 border-violet-200"
                        }`}
                    >
                        {message.text}
                    </div>
                )}

                <form onSubmit={loginHandler} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-gray-700 font-medium mb-1 text-lg">
                            Имя пользователя
                        </label>
                        <div className="flex items-center border border-violet-200 rounded-lg overflow-hidden bg-white">
                            <User className="ml-3 text-violet-200 w-5 h-5" />
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Введите имя пользователя"
                                required
                                className="flex-1 px-4 py-3 outline-none sm:text-sm text-gray-800 placeholder-gray-400 bg-transparent"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-gray-700 font-medium mb-1 text-lg">
                            Пароль
                        </label>
                        <div className="flex items-center border border-violet-200 rounded-lg overflow-hidden bg-white">
                            <Key className="ml-3 text-violet-200 w-5 h-5" />
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Введите пароль"
                                required
                                className="flex-1 px-4 py-3 outline-none sm:text-sm text-gray-800 placeholder-gray-400 bg-transparent"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 px-4 bg-violet-200 text-white font-semibold rounded-xl flex justify-center items-center disabled:bg-violet-200 disabled:cursor-not-allowed"
                    >
                        {loading && <Loader2 className="animate-spin w-5 h-5 mr-2 text-white" />}
                        Войти
                    </button>
                </form>

                <div className="mt-5 text-center text-sm">
                    <span className="text-gray-600">Нет аккаунта? </span>
                    <Link href="/Registration" className="text-violet-200 font-medium">
                        Зарегистрируйтесь
                    </Link>
                </div>
            </div>
        </div>
    )
}
