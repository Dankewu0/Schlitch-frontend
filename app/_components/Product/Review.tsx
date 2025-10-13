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
            setReviews(data)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const submitReview = async () => {
        if (!newComment) return
        setSubmitting(true)
        try {
            const payload = { product_id: productId, comment: newComment, rating: newRating }
            const created = await fetchData<Review>("/reviews", { method: "POST", body: JSON.stringify(payload) })
            setReviews(prev => [created, ...prev])
            setNewComment("")
            setNewRating(5)
        } catch (err) {
            console.error(err)
        } finally {
            setSubmitting(false)
        }
    }

    useEffect(() => { loadReviews() }, [productId])

    return (
        <div className="mt-8 bg-violet-200 p-6 rounded-xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Отзывы</h2>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
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
                        {reviews.length === 0 && <p className="text-gray-700">Нет отзывов</p>}
                        {reviews.map(r => (
                            <div key={r.id} className="bg-white rounded-lg p-4 shadow-sm flex flex-col sm:flex-row justify-between">
                                <div>
                                    <span className="font-semibold text-gray-900">{r.username}</span>
                                    <span className="ml-2 text-yellow-500">{'⭐'.repeat(r.rating)}</span>
                                </div>
                                <p className="text-gray-700 mt-1 sm:mt-0">{r.comment}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
