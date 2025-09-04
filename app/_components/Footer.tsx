import Link from "next/link";
export default function Footer() {
    return (
        <footer className="flex flex-wrap justify-between text-xl bg-gray-50">
            <Link href="/">
                <h2 className="text-lg sm:text-base md:text-lg text-gray-50 flex items-center justify-center">
                    Шлитц
                </h2>
            </Link>
            <div className="bg-gray-100 p-2 text-sm sm:text-base md:text-lg">
                Schlitch
            </div>

            <div className="bg-gray-100 p-2 text-sm sm:text-base md:text-lg">
                Магазин электроники
            </div>

            <div className="bg-gray-100 p-2 text-sm sm:text-base md:text-lg">
                2025
            </div>
            <Link href="/">
                <h2 className="text-lg sm:text-base md:text-lg text-gray-50 flex items-center justify-center">
                    dankewu
                </h2>
            </Link>
        </footer>
    )
}
