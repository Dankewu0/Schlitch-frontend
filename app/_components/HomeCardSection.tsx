import Link from "next/link";

export default function HomeCard() {
    return (
        <div className="flex justify-between items-center ">
            <section className="w-full max-w-xl  rounded-lg p-4 flex flex-col space-y-4">
                <h1 className="text-lg font-bold">Товары на каждый сезон</h1>
                <div className="flex space-x-4">
                    <div
                        className="w-32 h-32 bg-gray-50 hover:bg-gray-200  transition-colors duration-300  rounded-lg flex-shrink-0"></div>
                    {/* изображение */}
                    <div className="flex flex-col justify-center space-y-1">
                        <Link href="/">Обогреватели</Link>
                        <Link href="/">Вентиляторы</Link>
                    </div>
                </div>
            </section>
            <section className="w-full max-w-xl  rounded-lg p-4 flex flex-col space-y-4">
                <h1 className="text-lg font-bold">Акции</h1>
                <div className="flex space-x-4">
                    <div
                        className="w-32 h-32 bg-gray-50 hover:bg-gray-200  transition-colors duration-300  rounded-lg flex-shrink-0"></div>
                    <div className="flex flex-col justify-center space-y-1">
                        <Link href="/">Товары по акции</Link>
                        <Link href="/">Уцененные товары</Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
