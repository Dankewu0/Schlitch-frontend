'use client'

import React, { useEffect, useState } from "react"
import Cookies from "js-cookie"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"

interface FAQItem {
    id: number
    question: string
    answer: string
}

export default function FAQPage() {
    const [faqItems, setFaqItems] = useState<FAQItem[]>([])
    const [loading, setLoading] = useState(true)
    const [expandedIds, setExpandedIds] = useState<number[]>([])

    const toggleExpand = (id: number) => {
        setExpandedIds(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        )
    }

    useEffect(() => {
        const loadFAQ = async () => {
            setLoading(true)
            try {
                const xsrf = Cookies.get("XSRF-TOKEN")
                const res = await fetch(`${API_BASE_URL}/faqs`, {
                    credentials: "include",
                    headers: { "X-XSRF-TOKEN": xsrf ?? "" }
                })
                if (!res.ok) throw new Error("Ошибка при загрузке FAQ")
                const data: FAQItem[] = await res.json()
                setFaqItems(data)
            } catch {
                const mock: FAQItem[] = [
                    { id: -1, question: "Как оформить заказ?", answer: "Выберите товар, добавьте в корзину и следуйте шагам оформления." },
                    { id: -2, question: "Можно ли вернуть товар?", answer: "Да, в течение 14 дней при соблюдении условий возврата." },
                    { id: -3, question: "Можно вернуть товар, заказанный онлайн?", answer: "Да, при соблюдении условий возврата. В течение 7 дней принимаются все товары." },
                    { id: -4, question: "Как отслеживать доставку?", answer: "После оформления заказа вы получите трек-номер для отслеживания." },
                    { id: -5, question: "Какие способы оплаты доступны?", answer: "Банковские карты, PayPal, а также при получении наличными в некоторых городах." },
                    { id: -6, question: "Можно ли изменить заказ?", answer: "Да, пока он не отправлен на доставку, через поддержку." }
                ]
                setFaqItems(mock)
            } finally {
                setLoading(false)
            }
        }
        loadFAQ()
    }, [])

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center text-violet-200 text-xl">
            Загрузка FAQ...
        </div>
    )

    return (
        <main className="min-h-screen p-6 font-sans bg-white flex justify-center">
            <div className="w-full max-w-3xl flex flex-col gap-4">
                <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Часто задаваемые вопросы</h1>
                {faqItems.map(item => {
                    const isExpanded = expandedIds.includes(item.id)
                    return (
                        <div
                            key={item.id}
                            className={`bg-white rounded-xl shadow-md border-2 border-violet-600 p-6 transition-all duration-300 ${isExpanded ? "scale-105" : "scale-100"}`}
                        >
                            <div
                                className="cursor-pointer font-semibold text-gray-900 flex justify-between items-center"
                                onClick={() => toggleExpand(item.id)}
                            >
                                <span>{item.question}</span>
                                <span className={`transition-transform duration-300 ${isExpanded ? "rotate-45" : "rotate-0"}`}>+</span>
                            </div>
                            {isExpanded && <p className="mt-4 text-gray-700">{item.answer}</p>}
                        </div>
                    )
                })}
            </div>
        </main>

    )
}
