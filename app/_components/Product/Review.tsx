'use client'

import { useEffect, useState } from "react"
import { fetchData } from "@/lib/api"
import { Button } from "@/components/ui/button"

interface Review {
    id: number
    username: string
    rating: number
    comment: string
}

interface ReviewsProps {
    productId: number
}

export default function Reviews({ productId }: ReviewsProps) {
    const [reviews, setReviews] = useState<Review[]>([])
    const [newComment, setNewComment] = useState("")
    const [newRating, setNewRating] = useState(5)
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)

    const loadReviews = async () => {
        try {
            const data = await fetchData<Review[]>(`/reviews?product_id=${productId}`)
            setReviews(data ?? [])
        } catch (err) {
            console.error("Ошибка загрузки отзывов:", err)
            setReviews([])
        } finally {
            setLoading(false)
        }
    }

    const submitReview = async () => {
        if (!newComment.trim()) return
        setSubmitting(true)
        try {
            const payload = { product_id: productId, comment: newComment, rating: newRating }
            const created = await fetchData<Review>("/reviews", {
                method: "POST",
                body: JSON.stringify(payload)
            })
            setReviews(prev => [created, ...prev])
            setNewComment("")
            setNewRating(5)
        } catch (err) {
            console.error("Ошибка отправки отзыва:", err)
        } finally {
            setSubmitting(false)
        }
    }

    useEffect(() => { loadReviews() }, [productId])

    return (
        <div className="mt-6 bg-violet-200 p-4 rounded-xl shadow-md">
            <h2 className="text-xl font-bold text-violet-600 mb-3">Отзывы</h2>

            <div className="flex flex-col sm:flex-row gap-2 mb-4">
                <input
                    type="text"
                    placeholder="Ваш отзыв"
                    value={newComment}
                    onChange={e => setNewComment(e.target.value)}
                    className="flex-1 border border-violet-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-600"
                />
                <select
                    value={newRating}
                    onChange={e => setNewRating(parseInt(e.target.value))}
                    className="border border-violet-600 rounded px-2 py-2 focus:outline-none focus:ring-2 focus:ring-violet-600"
                >
                    {[5,4,3,2,1].map(n => <option key={n} value={n}>{n}⭐</option>)}
                </select>

            </div>
            <div>
                <Button
                    onClick={submitReview}
                    disabled={submitting}
                    className="bg-violet-600 text-white hover:bg-violet-500"
                >
                    {submitting ? "Отправка..." : "Оставить"}
                </Button>
            </div>
            {loading ? (
                <div className="text-violet-600 text-center py-4">Загрузка отзывов...</div>
            ) : (
                <div className="flex flex-col gap-3">
                    {(!reviews || reviews.length === 0) && (
                        <p className="text-white/80 text-center">Нет отзывов</p>
                    )}
                    {reviews.map(r => (
                        <div key={r.id} className="bg-white rounded-lg p-3 shadow flex flex-col sm:flex-row justify-between gap-2">
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-violet-600">{r.username}</span>
                                <span className="text-yellow-400">{'⭐'.repeat(r.rating)}</span>
                            </div>
                            <p className="text-gray-700">{r.comment}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
