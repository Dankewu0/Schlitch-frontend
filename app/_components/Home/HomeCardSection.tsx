import Link from "next/link";
import Image from "next/image";

export default function HomeCard() {
    return (
        <div className="flex flex-col md:flex-row justify-between items-stretch  font-bold text-white">
            <section className="m-4 md:m-10 max-w-full md:max-w-xl rounded-lg p-4 flex flex-col space-y-4 bg-violet-200 dark:bg-violet-600   border-2  dark:shadow-lg dark:border-gray-800">
                <h1 className="text-lg font-bold">Товары на каждый сезон</h1>
                <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                    <div className=" flex-shrink-0 w-full sm:w-48 md:w-52 lg:w-60">
                        <Image
                            src="/Other/Season.png"
                            width={200}
                            height={80}
                            alt="Вентилятор"
                            className="object-contain w-full h-auto"
                        />
                    </div>
                    <div className="flex flex-col justify-center space-y-1">
                        <Link href="/">Обогреватели</Link>
                        <Link href="/">Вентиляторы</Link>
                    </div>
                </div>
            </section>
            <section className="m-4 md:m-10 max-w-full md:max-w-xl rounded-lg p-4 flex flex-col space-y-4 bg-violet-200 dark:bg-violet-600   border-2  dark:shadow-lg dark:border-gray-800">
                <div className="flex flex-col sm:flex-row sm:space-x-4  sm:space-y-0 ">
                    <Link href="/Catalogue">
                        <div className="flex flex-shrink-0 w-full justify-center md:w-52 lg:w-60 flex-col ">
                            <span className="flex justify-center lg:pt-24">Каталог</span>
                            <p className="flex justify-center items-center">каталог магазина Schlitch</p>
                        </div>
                    </Link>
                </div>
            </section>
            <section className="m-4 md:m-10 max-w-full md:max-w-xl rounded-lg p-4 flex flex-col space-y-4 bg-violet-200 dark:bg-violet-600   border-2  dark:shadow-lg dark:border-gray-800">
                <h1 className="text-lg font-bold">Акции</h1>
                <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                    <div className="flex-shrink-0 w-full sm:w-52 md:w-60 lg:w-72">
                        <Image
                            src="/Other/Discount.png"
                            alt="Вентилятор"
                            width={200}
                            height={80}
                            className="object-contain w-full h-auto"
                        />
                    </div>
                    <div className="flex flex-col justify-center space-y-1">
                        <Link href="/Discount">Товары по акции</Link>
                        <Link href="/Discount">Уцененные товары</Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
