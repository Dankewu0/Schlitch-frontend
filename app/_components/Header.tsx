import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Heart } from "lucide-react";
import { ShoppingCart } from "lucide-react";

export default function Header() {
    return (
        <header className="grid grid-cols-3 items-center px-4 py-2 flex-shrink-0">
            <div className="flex justify-start">
                <Link href="/">
                     <span className="inline-block tracking-tight text-lg sm:text-xl md:text-2xl bg-gray-100 px-2 py-1">
                      Schlitch
                     </span>
                </Link>
            </div>

            <div className="flex justify-center">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className="px-5 py-2 sm:px-6 sm:py-3 text-base sm:text-lg md:text-xl bg-gray-100 text-black hover:bg-gray-200  transition-colors duration-300 focus:outline-none focus:ring-0">
                            <ChevronDown className="mr-2" />
                            Каталог
                            <ChevronDown className="ml-2" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                                Смартфоны, планшеты и фототехника
                            </DropdownMenuSubTrigger>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem>Смартфоны</DropdownMenuItem>
                                <DropdownMenuItem>Планшеты</DropdownMenuItem>
                                <DropdownMenuItem>Фототехника</DropdownMenuItem>
                                <DropdownMenuItem>Аксессуары</DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuSub>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>ТВ, Консоли, Аудио</DropdownMenuSubTrigger>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem>Телевизоры</DropdownMenuItem>
                                <DropdownMenuItem>Консоли</DropdownMenuItem>
                                <DropdownMenuItem>Аудиотехника</DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuSub>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>Пк, Ноутбуки и Периферия</DropdownMenuSubTrigger>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem>Готовые сборки ПК</DropdownMenuItem>
                                <DropdownMenuItem>Ноутбуки</DropdownMenuItem>
                                <DropdownMenuItem>Периферия</DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuSub>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>Смартфоны и фототехника</DropdownMenuSubTrigger>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem>Смартфоны</DropdownMenuItem>
                                <DropdownMenuItem>Фотоаппараты</DropdownMenuItem>
                                <DropdownMenuItem>Аксессуары</DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuSub>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>ТВ, Консоли, Аудио</DropdownMenuSubTrigger>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem>Телевизоры</DropdownMenuItem>
                                <DropdownMenuItem>Консоли</DropdownMenuItem>
                                <DropdownMenuItem>Аудиотехника</DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuSub>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>Комплектующие для ПК</DropdownMenuSubTrigger>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem>Основные комплектующие для пк</DropdownMenuItem>
                                <DropdownMenuItem>Устройства расширения</DropdownMenuItem>
                                <DropdownMenuItem>Обслуживание и моддинг</DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuSub>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>Сетевое оборудование</DropdownMenuSubTrigger>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem>WI-FI роутеры</DropdownMenuItem>
                                <DropdownMenuItem>Проффесиональное сетевое оборудование</DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuSub>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="flex justify-end gap-6">
                <Heart className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 flex items-center justify-center" />
                <ShoppingCart className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 items-center justify-center" />
                <Avatar className="bg-black w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12" />
            </div>
        </header>
    );
}
