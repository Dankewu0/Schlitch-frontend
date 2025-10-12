'use client'

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { fetchData } from "@/lib/api"
import { User, Mail, Key, Loader2 } from "lucide-react"
import Image from "next/image"

export default function Registration() {
    const router = useRouter()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    const registerHandler = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setSuccess(null)

        try {
            const res = await fetchData("/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password }),
            })

            if (res.success) {
                setSuccess(`Аккаунт создан! Добро пожаловать, ${res.user.name}.`)
                setTimeout(() => router.push("/"), 1500)
            } else {
                setError(res.message || "Ошибка регистрации")
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
                        Регистрация
                    </h2>
                    <p className="text-gray-600 mt-2 text-lg">Создайте новый аккаунт</p>
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

                <form onSubmit={registerHandler} className="space-y-6">
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
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-1 text-lg">
                            Email
                        </label>
                        <div className="flex items-center border border-violet-200 rounded-lg overflow-hidden bg-white">
                            <Mail className="ml-3 text-violet-200 w-5 h-5" />
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Введите email"
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
                        Зарегистрироваться
                    </button>
                </form>

                <div className="mt-5 text-center text-sm">
                    <span className="text-gray-600">Уже есть аккаунт? </span>
                    <a href="/Authorization" className="text-violet-200 font-medium">Войти</a>
                </div>
            </div>
        </div>
    )
}
