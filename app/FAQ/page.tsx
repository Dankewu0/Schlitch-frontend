'use client';

import React, { useEffect, useState } from "react";
import { fetchData } from "@/lib/api";

interface FAQItem {
    id: number;
    question: string;
    answer: string;
}

export default function FAQPage() {
    const [faqItems, setFaqItems] = useState<FAQItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadFAQ = async () => {
            try {
                const data = await fetchData<FAQItem[]>("/f_a_q_s");
                setFaqItems(data);
            } catch (err) {
                console.error("Ошибка загрузки FAQ:", err);
            } finally {
                setLoading(false);
            }
        }
        loadFAQ();
    }, []);

    const mockQuestions: FAQItem[] = [
        { id: -1, question: "Как оформить заказ?", answer: "Выберите товар, добавьте в корзину и следуйте шагам оформления." },
        { id: -2, question: "Можно ли вернуть товар?", answer: "Да, в течение 14 дней при соблюдении условий возврата. " },
        { id: -3, question: "Можно вернуть товар, заказаный онлайн", answer: "Да, при соблюдении условий возврата. В течение 7 дней принимаются все товары." }
    ];

    const allQuestions = [...mockQuestions, ...faqItems];

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center text-violet-200 text-xl">
            Загрузка FAQ...
        </div>
    );

    return (
        <main className="min-h-screen p-6 font-sans">
            <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Часто задаваемые вопросы</h1>
            <div className="max-w-3xl mx-auto flex flex-col gap-4">
                {allQuestions.map(item => (
                    <details
                        key={item.id}
                        className="bg-white rounded-lg p-4 shadow-md border-2 border-violet-600"
                    >
                        <summary className="cursor-pointer font-semibold text-gray-900">{item.question}</summary>
                        <p className="mt-2 text-gray-700">{item.answer}</p>
                    </details>
                ))}
            </div>
        </main>
    );
}
