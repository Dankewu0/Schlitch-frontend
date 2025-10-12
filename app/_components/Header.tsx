'use client'

import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { ChevronDown, Heart, ShoppingCart } from "lucide-react"
import ThemeSwitcher from "@/app/_components/ThemeSwitch/ThemeSwitcher"
import Image from "next/image"
import { fetchData } from "@/lib/api"

export default function Header() {
    const router = useRouter()
    const isAuthenticated = false // пока флаг авторизации для демонстрации

    const handleRedirect = async (slug: string) => {
        try {
            const data = await fetchData(`/categories/${slug}`)
            router.push(`/categories/${data.slug}`)
        } catch (err) {
            console.error("Ошибка редиректа:", err)
        }
    }

    const handleLogin = () => {
        router.push("/Authorization")
    }

    return (
        <header className="flex font-bold text-black dark:text-zinc-100 items-center flex-row p-2 text-white dark:text-black justify-between flex-shrink-0 dark:bg-gray-900">
            <div className="flex flex-col">
                <div className="flex items-center gap-4 bg-violet-200 dark:bg-violet-600 rounded-sm ">
                    <div className="flex items-center gap-2">
                        <Image
                            src="/Other/GTMan.png"
                            width={20}
                            height={10}
                            alt="Вентилятор"
                            className="object-contain"
                        />
                        <Link href="/">
                            <span className="inline-flex items-center h-10 sm:h-11 md:h-12 text-lg sm:text-xl md:text-2xl px-2 font-bold">
                                Schlitch
                            </span>
                        </Link>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="h-10 sm:h-11 md:h-12 px-2 text-lg sm:text-xl dark:hover:border-violet-700 md:text-2xl font-bold bg-violet-200 dark:bg-violet-600 text-white hover:border-2 hover:border-violet-400 hover:bg-violet-200 hidden sm:inline-flex">
                                Каталог
                                <ChevronDown className="ml-2"/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>
                                    Смартфоны, планшеты
                                </DropdownMenuSubTrigger>
                                <DropdownMenuSubContent>
                                    <DropdownMenuItem onClick={() => handleRedirect('smartphones')}>Смартфоны</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleRedirect('tablets')}>Планшеты</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleRedirect('accessories')}>Аксессуары</DropdownMenuItem>
                                </DropdownMenuSubContent>
                            </DropdownMenuSub>
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>ТВ, Консоли, Аудио</DropdownMenuSubTrigger>
                                <DropdownMenuSubContent>
                                    <DropdownMenuItem onClick={() => handleRedirect('tvs')}>Телевизоры</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleRedirect('consoles')}>Консоли</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleRedirect('audio')}>Аудиотехника</DropdownMenuItem>
                                </DropdownMenuSubContent>
                            </DropdownMenuSub>
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>Пк, Ноутбуки и Периферия</DropdownMenuSubTrigger>
                                <DropdownMenuSubContent>
                                    <DropdownMenuItem onClick={() => handleRedirect('pcs')}>Готовые сборки ПК</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleRedirect('laptops')}>Ноутбуки</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleRedirect('peripherals')}>Периферия</DropdownMenuItem>
                                </DropdownMenuSubContent>
                            </DropdownMenuSub>
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>Фототехника</DropdownMenuSubTrigger>
                                <DropdownMenuSubContent>
                                    <DropdownMenuItem onClick={() => handleRedirect('cameras')}>Фотоаппараты</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleRedirect('photo-accessories')}>Аксессуары</DropdownMenuItem>
                                </DropdownMenuSubContent>
                            </DropdownMenuSub>
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>Бытовая техника</DropdownMenuSubTrigger>
                                <DropdownMenuSubContent>
                                    <DropdownMenuItem onClick={() => handleRedirect('home-appliances')}>Встраиваемая техника</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleRedirect('kitchen')}>Техника для кухни</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleRedirect('household')}>Техника для дома</DropdownMenuItem>
                                </DropdownMenuSubContent>
                            </DropdownMenuSub>
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>Комплектующие для ПК</DropdownMenuSubTrigger>
                                <DropdownMenuSubContent>
                                    <DropdownMenuItem onClick={() => handleRedirect('components-main')}>Основные комплектующие</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleRedirect('expansion-devices')}>Устройства расширения</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleRedirect('modding')}>Обслуживание и моддинг</DropdownMenuItem>
                                </DropdownMenuSubContent>
                            </DropdownMenuSub>
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>Сетевое оборудование</DropdownMenuSubTrigger>
                                <DropdownMenuSubContent>
                                    <DropdownMenuItem onClick={() => handleRedirect('wifi-routers')}>WI-FI роутеры</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleRedirect('pro-network')}>Профессиональное сетевое оборудование</DropdownMenuItem>
                                </DropdownMenuSubContent>
                            </DropdownMenuSub>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <ThemeSwitcher />
            </div>

            <div>
                <div className="flex flex-row justify-end items-center gap-6 -mt-3">
                    <Link href="/">
                        <Heart className="text-violet-200 dark:text-violet-600"/>
                    </Link>
                    <Link href="/">
                        <ShoppingCart className="text-violet-200 dark:text-violet-600"/>
                    </Link>

                    {isAuthenticated ? (
                        <Link href="/Profile">
                            <Avatar className="bg-violet-200 dark:bg-violet-600"/>
                        </Link>
                    ) : (

                        <Button onClick={handleLogin} className="bg-violet-200 dark:bg-violet-600 text-white hover:bg-violet-300 dark:hover:bg-violet-500">
                            Войти
                        </Button>
                    )}
                </div>
            </div>
        </header>
    )
}
