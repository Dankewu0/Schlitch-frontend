'use client'

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { fetchData } from "@/lib/api"
import { User, RectangleEllipsis, Loader2 } from "lucide-react"
import Image from "next/image"

export default function Authorization() {
    const router = useRouter()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    const loginHandler = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setSuccess(null)

        try {
            const res = await fetchData("/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            })

            if (res.success) {
                localStorage.setItem("auth_token", res.token)
                setSuccess(`Добро пожаловать, ${res.user.name}! Переадресация...`)
                setTimeout(() => router.push("/"), 1500)
            } else {
                setError(res.message || "Неверный логин или пароль")
            }
        } catch (err) {
            setError("Ошибка связи с сервером")
        } finally {
            setLoading(false)
        }
    }

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
                        Система авторизации
                    </h2>
                    <p className="text-gray-600 mt-2 text-lg">Введите ваши данные для входа</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 px-4 py-2 mb-4 rounded-lg border border-violet-200">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="bg-green-50 text-green-600 px-4 py-2 mb-4 rounded-lg border border-violet-200">
                        {success}
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
                            <RectangleEllipsis className="ml-3 text-violet-200 w-5 h-5" />
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
                    <a href="/Registration" className="text-violet-200 font-medium">Зарегистрируйтесь</a>
                </div>
            </div>
        </div>
    )
}
