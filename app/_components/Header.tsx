'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
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
import { ChevronDown, Heart, ShoppingCart, User, Store } from "lucide-react"
import ThemeSwitcher from "@/app/_components/ThemeSwitch/ThemeSwitcher"
import { fetchData } from "@/lib/api"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"

interface User {
    id: number
    username: string
    email: string
}

interface CategoryResponse {
    slug: string
}

interface CategoryData {
    products?: unknown[]
    brands?: unknown[]
}

export default function Header() {
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null)
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const [checkingAuth, setCheckingAuth] = useState<boolean>(true)
    const [cartCount, setCartCount] = useState<number>(0)
    const [wishlistCount, setWishlistCount] = useState<number>(0)

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/user`, { credentials: 'include' })
                if (res.ok) {
                    const data: User = await res.json()
                    setUser(data)
                    setIsAuthenticated(true)
                    await loadCartAndWishlist()
                } else {
                    setUser(null)
                    setIsAuthenticated(false)
                }
            } catch (err) {
                console.error("Ошибка при проверке авторизации:", err)
                setUser(null)
                setIsAuthenticated(false)
            } finally {
                setCheckingAuth(false)
            }
        }
        checkAuth()
    }, [])

    const loadCartAndWishlist = async () => {
        try {
            const [cartRes, wishRes] = await Promise.all([
                fetch(`${API_BASE_URL}/cart`, { credentials: "include" }),
                fetch(`${API_BASE_URL}/wish-lists`, { credentials: "include" })
            ])

            if (cartRes.ok) {
                const cartData: unknown[] = await cartRes.json()
                setCartCount(cartData.length)
            } else {
                setCartCount(0)
            }

            if (wishRes.ok) {
                const wishData: unknown[] = await wishRes.json()
                setWishlistCount(wishData.length)
            } else {
                setWishlistCount(0)
            }
        } catch (err) {
            console.error("Ошибка загрузки корзины или вишлиста:", err)
            setCartCount(0)
            setWishlistCount(0)
        }
    }

    const handleRedirect = async (slug?: string) => {
        if (!slug) return
        try {
            const endpoint = `/categories/${encodeURIComponent(slug)}`
            const data: CategoryData | null = await fetchData<CategoryData>(endpoint)
            if (data && (data.products || data.brands)) router.push(`/Catalog/${slug}`)
        } catch (err) {
            console.error(`🔥 Ошибка запроса категории "${slug}":`, err)
        }
    }

    const handleLogin = () => router.push("/Authorization")

    return (
        <header className="flex font-bold text-black dark:text-zinc-100 items-center flex-row p-2 text-white dark:text-black justify-between flex-shrink-0 dark:bg-gray-900">
            <div className="flex flex-col">
                <div className="flex items-center gap-4 bg-violet-200 dark:bg-violet-600 rounded-sm ">
                    <div className="flex items-center gap-2">
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
                                <DropdownMenuSubTrigger>Смартфоны, планшеты</DropdownMenuSubTrigger>
                                <DropdownMenuSubContent>
                                    <DropdownMenuItem onClick={() => handleRedirect("smartphones")}>Смартфоны</DropdownMenuItem>
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
                                    <DropdownMenuItem onClick={() => handleRedirect('camera-accessories')}>Аксессуары</DropdownMenuItem>
                                </DropdownMenuSubContent>
                            </DropdownMenuSub>
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>Бытовая техника</DropdownMenuSubTrigger>
                                <DropdownMenuSubContent>
                                    <DropdownMenuItem onClick={() => handleRedirect('built-in-appliances')}>Встраиваемая техника</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleRedirect('kitchen-appliances')}>Техника для кухни</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleRedirect('home-appliances')}>Техника для дома</DropdownMenuItem>
                                </DropdownMenuSubContent>
                            </DropdownMenuSub>
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>Комплектующие для ПК</DropdownMenuSubTrigger>
                                <DropdownMenuSubContent>
                                    <DropdownMenuItem onClick={() => handleRedirect('main-pc-parts')}>Основные комплектующие</DropdownMenuItem>
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
            <Link href="/OurShops">
                <div className="flex flex-row justify-end items-center gap-9 -mt-6 relative bg-violet-200 dark:bg-violet-600 p-4 rounded-lg">
                    <span className="hidden md:inline font-semibold">Наши магазины</span>
                    <Store className="md:hidden "/>
                </div>
            </Link>
            <div>
                <div className="flex flex-row justify-end items-center gap-6 -mt-6 relative">
                    <Link href="/WishList" className="relative">
                        <Heart className="text-violet-200 dark:text-violet-600"/>
                        {wishlistCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                {wishlistCount}
                            </span>
                        )}
                    </Link>

                    <Link href="/Cart" className="relative">
                        <ShoppingCart className="text-violet-200 dark:text-violet-600"/>
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    {!checkingAuth && (
                        isAuthenticated ? (
                            <Link href="/User">
                                <div className="bg-violet-200 dark:bg-violet-600 p-1 rounded-3xl flex items-center justify-center">
                                    <User className="text-violet-600 dark:text-violet-800 w-6 h-6"/>
                                </div>
                            </Link>
                        ) : (
                            <Button onClick={handleLogin} className="bg-violet-200 dark:bg-violet-600 text-white hover:bg-violet-300 dark:hover:bg-violet-500">
                                Войти
                            </Button>
                        )
                    )}
                </div>
            </div>
        </header>
    )
}
