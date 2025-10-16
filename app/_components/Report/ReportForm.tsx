'use client'
import { useState } from "react"

export default function ReportForm() {
    const [status, setStatus] = useState<"success" | "error" | null>(null)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setStatus(null)
        setErrorMessage(null)

        const formData = new FormData(e.currentTarget)
        const data = {
            title: formData.get("title"),
            description: formData.get("description"),
        }

        try {
            console.group("📤 Отправка репорта")
            console.log("➡ URL:", "/tickets")
            console.log("➡ Данные:", data)

            const res = await fetch("http://localhost:8000/tickets", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });


            console.log("⬅ Ответ:", res.status, res.statusText)

            if (!res.ok) {
                const text = await res.text()
                console.error("❌ Ошибка ответа сервера:", text || "пусто")
                throw new Error(`Ошибка ${res.status}: ${res.statusText}`)
            }

            setStatus("success")
            e.currentTarget.reset()
            console.log("✅ Репорт успешно отправлен")

        } catch (err: any) {
            console.error("🔥 Ошибка при отправке формы:", err)
            setStatus("error")
            setErrorMessage(err?.message || "Не удалось отправить запрос. Проверь соединение или попробуй позже.")
        } finally {
            console.groupEnd()
        }
    }

    return (
        <div className="flex flex-col gap-8 w-full px-4 py-6 items-center">
            <div className="w-full max-w-3xl text-center bg-violet-200 dark:bg-violet-600 p-6 rounded-lg">
                <h1 className="text-3xl font-semibold mb-2">Форма отправки сообщений об ошибке</h1>
                <h2 className="text-2xl font-bold mb-4 text-red-800">Важно!</h2>
                <p className="mb-1">Пиши подробно: что, когда и как сломалось.</p>
                <p className="mb-1">Если форма используется не по назначению — будет бан.</p>
            </div>

            <div className="w-full max-w-md flex flex-col items-center">
                <span className="text-2xl font-bold mb-4">Форма отправки</span>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4 w-full p-6 border-2 border-violet-300 rounded-lg bg-white dark:bg-violet-600"
                >
                    <input
                        name="title"
                        placeholder="Краткое описание"
                        required
                        className="w-full py-3 px-4 border border-violet-300 dark:border-violet-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400 dark:focus:ring-violet-300"
                    />
                    <textarea
                        name="description"
                        placeholder="Подробное описание"
                        required
                        className="w-full py-3 px-4 border border-violet-300 dark:border-violet-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400 dark:focus:ring-violet-300 resize-none h-40"
                    />
                    <button
                        type="submit"
                        className="w-full py-3 bg-violet-600 text-white font-semibold rounded-lg hover:bg-violet-700 transition-colors"
                    >
                        Отправить репорт
                    </button>

                    {status === "success" && (
                        <p className="text-green-600 text-center py-2">✅ Репорт успешно отправлен</p>
                    )}
                    {status === "error" && (
                        <p className="text-green-600 text-center py-2">✅ Репорт успешно отправлен</p>
                    )}
                </form>
            </div>
        </div>
    )
}
