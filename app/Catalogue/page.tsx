'use client'

import { useRouter } from "next/navigation"
import { fetchData } from "@/lib/api"

export default function Catalogue() {
    const router = useRouter()

    const handleRedirect = async (slug?: string) => {
        if (!slug) return

        console.group(`➡ Redirect to category: ${slug}`)

        try {
            const endpoint = `/categories/${encodeURIComponent(slug)}`
            console.log(`Запрос категории: ${endpoint}`)

            const data = await fetchData<{ products?: any; brands?: any[] }>(endpoint)

            if (data && (data.products || data.brands)) {
                console.log(`✅ Категория найдена: ${slug}, редиректим...`)
                router.push(`/Catalog/${slug}`)
            } else {
                console.error(`❌ Категория "${slug}" не найдена. Ответ сервера:`, data)
            }
        } catch (err) {
            console.error(`🔥 Ошибка запроса категории "${slug}":`, err)
        } finally {
            console.groupEnd()
        }
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 text-white font-bold m-8">
            <div className="flex bg-violet-200 dark:bg-violet-600 p-4 flex-col">
                <h1 className="text-3xl">Смартфоны, планшеты</h1>
                <button className="text-xl p-2 text-left" onClick={() => handleRedirect("smartphones")}>Смартфоны</button>
                <button className="text-xl p-1 text-left" onClick={() => handleRedirect("tablets")}>Планшеты</button>
                <button className="text-xl p-1 text-left" onClick={() => handleRedirect("accessories")}>Аксессуары</button>
            </div>
            <div className="flex bg-violet-200 dark:bg-violet-600 p-4 flex-col">
                <h1 className="text-3xl">ТВ, Консоли, Аудио</h1>
                <button className="text-xl p-2 text-left" onClick={() => handleRedirect("tvs")}>Телевизоры</button>
                <button className="text-xl p-1 text-left" onClick={() => handleRedirect("consoles")}>Консоли</button>
                <button className="text-xl p-1 text-left" onClick={() => handleRedirect("audio")}>Аудиотехника</button>
            </div>
            <div className="flex bg-violet-200 dark:bg-violet-600 p-4 flex-col">
                <h1 className="text-3xl">ПК, Ноутбуки, Периферия</h1>
                <button className="text-xl p-2 text-left" onClick={() => handleRedirect("pcs")}>Сборки ПК</button>
                <button className="text-xl p-1 text-left" onClick={() => handleRedirect("laptops")}>Ноутбуки</button>
                <button className="text-xl p-1 text-left" onClick={() => handleRedirect("peripherals")}>Периферия</button>
            </div>
            <div className="flex bg-violet-200 dark:bg-violet-600 p-4 flex-col">
                <h1 className="text-3xl">Фототехника</h1>
                <button className="text-xl p-2 text-left" onClick={() => handleRedirect("cameras")}>Фотоаппараты</button>
                <button className="text-xl p-1 text-left" onClick={() => handleRedirect("camera-accessories")}>Аксессуары</button>
            </div>
            <div className="flex bg-violet-200 dark:bg-violet-600 p-4 flex-col">
                <h1 className="text-3xl">Бытовая техника</h1>
                <button className="text-xl p-2 text-left" onClick={() => handleRedirect("built-in-appliances")}>Встраиваемая техника</button>
                <button className="text-xl p-1 text-left" onClick={() => handleRedirect("home-appliances")}>Техника для дома</button>
                <button className="text-xl p-1 text-left" onClick={() => handleRedirect("kitchen-appliances")}>Техника для кухни</button>
            </div>
            <div className="flex bg-violet-200 dark:bg-violet-600 p-4 flex-col">
                <h1 className="text-3xl">Комплектующие для ПК</h1>
                <button className="text-xl p-2 text-left" onClick={() => handleRedirect("main-pc-parts")}>Основные комплектующие</button>
                <button className="text-xl p-1 text-left" onClick={() => handleRedirect("expansion-devices")}>Устройства расширения</button>
                <button className="text-xl p-1 text-left" onClick={() => handleRedirect("modding")}>Моддинг</button>
            </div>
            <div className="flex bg-violet-200 dark:bg-violet-600 p-4 flex-col">
                <h1 className="text-3xl">Сетевое оборудование</h1>
                <button className="text-xl p-2 text-left" onClick={() => handleRedirect("wifi-routers")}>WI-FI Роутеры</button>
                <button className="text-xl p-1 text-left" onClick={() => handleRedirect("pro-network")}>Профессиональное сетевое оборудование</button>
            </div>
        </div>
    )
}
