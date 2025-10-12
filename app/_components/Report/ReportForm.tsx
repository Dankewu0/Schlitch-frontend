'use client';
import { useState } from "react";

export default function ReportForm() {
    const [status, setStatus] = useState<"success" | "error" | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus(null);
        const formData = new FormData(e.currentTarget);
        const data = {
            title: formData.get("title"),
            description: formData.get("description"),
        };
        try {
            const res = await fetch("/report", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (!res.ok) throw new Error();
            setStatus("success");
            e.currentTarget.reset();
        } catch {
            setStatus("error");
        }
    }

    return (
        <div className="flex flex-col gap-8 w-full px-4 py-6 items-center">
            <div className="w-full max-w-3xl text-center bg-zinc-100 dark:bg-zinc-900 p-6 rounded-lg">
                <h1 className="text-3xl font-semibold mb-2">Форма отправки сообщений об ошибке</h1>
                <h2 className="text-2xl font-bold mb-4 text-red-800">Важно!</h2>
                <p className="mb-1">В форме нужно описывать все подробно</p>
                <p className="mb-1">Как случилась ошибка, когда случилась ошибка</p>
                <p className="mb-1">В случае если ошибки не было</p>
                <p className="mb-1">Или форма использована не по назначению</p>
                <p className="mb-1">Аккаунт получит блокировку</p>
            </div>

            <div className="w-full max-w-md flex flex-col items-center">
                <span className="text-2xl font-bold mb-4">Форма отправки</span>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4 w-full p-6 border-2 border-zinc-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800"
                >
                    <input
                        name="title"
                        placeholder="Краткое описание"
                        required
                        className="w-full py-3 px-4 border border-zinc-300 dark:border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 dark:focus:ring-lime-300"
                    />
                    <textarea
                        name="description"
                        placeholder="Подробное описание"
                        required
                        className="w-full py-3 px-4 border border-zinc-300 dark:border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 dark:focus:ring-lime-300 resize-none h-40"
                    />
                    <button
                        type="submit"
                        className="w-full py-3 bg-lime-500 text-white font-semibold rounded-lg hover:bg-lime-600 transition-colors"
                    >
                        Отправить репорт
                    </button>
                    {status === "success" && <p className="text-green-600 text-center py-2">Отправлено</p>}
                    {status === "error" && <p className="text-red-600 text-center py-2">Ошибка отправления</p>}
                </form>
            </div>
        </div>
    );
}
