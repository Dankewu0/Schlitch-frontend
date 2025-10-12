'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import {fetchData} from "@/lib/api";

export default function Catalogue() {
    const router = useRouter();

    const handleRedirect = async (slug: string) => {
        try {
            const data = await fetchData(`/categories/${slug}`);
            router.push(`/categories/${data.slug}`);
        } catch (err) {
            console.error("Ошибка редиректа:", err);
        }
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 text-white font-bold m-8">
            <div className="flex bg-violet-200 dark:bg-violet-600 p-4 flex-col">
                <h1 className="text-3xl">Смартфоны, планшеты</h1>
                <Link href="#" className="text-xl p-2" onClick={() => handleRedirect("smartphones")}>
                    Смартфоны
                </Link>
                <Link href="#" className="text-xl p-1" onClick={() => handleRedirect("tablets")}>
                    Планшеты
                </Link>
                <Link href="#" className="text-xl p-1" onClick={() => handleRedirect("accessories")}>
                    Акссесуары
                </Link>
            </div>
            <div className="flex bg-violet-200 dark:bg-violet-600 p-4 flex-col">
                <h1 className="text-3xl">ТВ, Консоли, Аудио</h1>
                <Link href="#" className="text-xl p-2" onClick={() => handleRedirect("tv")}>
                    Телевизоры
                </Link>
                <Link href="#" className="text-xl p-1" onClick={() => handleRedirect("consoles")}>
                    Консоли
                </Link>
                <Link href="#" className="text-xl p-1" onClick={() => handleRedirect("audio")}>
                    Аудиотехника
                </Link>
            </div>
            <div className="flex bg-violet-200 dark:bg-violet-600 p-4 flex-col">
                <h1 className="text-3xl">ПК, Ноутбуки, Периферия</h1>
                <Link href="#" className="text-xl p-2" onClick={() => handleRedirect("pc-builds")}>
                    Сборки ПК
                </Link>
                <Link href="#" className="text-xl p-1" onClick={() => handleRedirect("laptops")}>
                    Ноутбуки
                </Link>
                <Link href="#" className="text-xl p-1" onClick={() => handleRedirect("peripherals")}>
                    Периферия
                </Link>
            </div>
            <div className="flex bg-violet-200 dark:bg-violet-600 p-4 flex-col">
                <h1 className="text-3xl">Фототехника</h1>
                <Link href="#" className="text-xl p-2" onClick={() => handleRedirect("cameras")}>
                    Фотоаппараты
                </Link>
                <Link href="#" className="text-xl p-1" onClick={() => handleRedirect("camera-accessories")}>
                    Акссесуары
                </Link>
            </div>
            <div className="flex bg-violet-200 dark:bg-violet-600 p-4 flex-col">
                <h1 className="text-3xl">Бытовая техника</h1>
                <Link href="#" className="text-xl p-2" onClick={() => handleRedirect("pc-builds")}>
                    Встраиваемая техника
                </Link>
                <Link href="#" className="text-xl p-1" onClick={() => handleRedirect("laptops")}>
                    Техника для дома
                </Link>
                <Link href="#" className="text-xl p-1" onClick={() => handleRedirect("peripherals")}>
                    Техника для кухни
                </Link>
            </div>
            <div className="flex bg-violet-200 dark:bg-violet-600 p-4 flex-col">
                <h1 className="text-3xl">Комплектующие для пк</h1>
                <Link href="#" className="text-xl p-2" onClick={() => handleRedirect("pc-builds")}>
                    Основные комплектующие для пк
                </Link>
                <Link href="#" className="text-xl p-1" onClick={() => handleRedirect("laptops")}>
                    Устройства расширения
                </Link>
                <Link href="#" className="text-xl p-1" onClick={() => handleRedirect("peripherals")}>
                    Моддинг
                </Link>
            </div>
            <div className="flex bg-violet-200 dark:bg-violet-600 p-4 flex-col">
                <h1 className="text-3xl">Сетевое оборудование</h1>
                <Link href="#" className="text-xl p-2" onClick={() => handleRedirect("pc-builds")}>
                    WI-FI Роутеры
                </Link>
                <Link href="#" className="text-xl p-1" onClick={() => handleRedirect("laptops")}>
                    Проффесиональное сетевое оборудование
                </Link>
            </div>
        </div>
    );
}
