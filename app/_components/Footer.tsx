import Link from "next/link";
export default function Footer() {
    return (
        <footer className="flex flex-wrap justify-between text-xl bg-violet-200 dark:bg-violet-600 border-t border-zinc-100 dark:border-gray-800">
            <Link href="/">
                <h2 className="text-lg sm:text-base md:text-lg text-violet-200 dark:text-violet-600 flex items-center justify-center">
                    Шлитц
                </h2>
            </Link>
            <Link href="/Hehe">
                <div className=" p-2 text-sm sm:text-base md:text-lg text-white">
                    Schlitch
                </div>
            </Link>
            <div className=" p-2 text-sm sm:text-base md:text-lg text-white">
                Магазин электроники
            </div>

            <div className="  p-2 text-sm sm:text-base md:text-lg text-white">
                2025
            </div>
            <Link href="/">
                <h2 className="text-lg sm:text-base md:text-lg dark:text-violet-600 text-violet-200 flex items-center justify-center">
                    dankewu
                </h2>
            </Link>
        </footer>
    )
}
