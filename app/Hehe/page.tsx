import Image from "next/image";

export default function Hehe() {
    return (
        <div className="flex flex-col lg:flex-row gap-6 p-6">
            <div className="text-violet-600 flex flex-col gap-2">
                <span className="text-4xl">Увы не сделано</span>
                <span className="text-4xl">А так хотелось</span>
                <p className="text-sm text-gray-200">Не хотелось, я что, псих, хотеть программировать</p>
                <span className="text-4xl">Лучше вот</span>
                <span className="text-4xl">На котов посмотреть</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <Image src="/Other/Privet.jpg" width={400} height={400} alt="Вентилятор" className="object-contain" />
                <Image src="/Other/YaBalbesik.jpg" width={400} height={400} alt="Вентилятор" className="object-contain" />
                <Image src="/Other/Uee.jpg" width={400} height={400} alt="Вентилятор" className="object-contain" />
                <Image src="/Other/Elki.jpg" width={400} height={400} alt="Вентилятор" className="object-contain" />
                <Image src="/Other/Emae.jpg" width={400} height={400} alt="Вентилятор" className="object-contain" />
                <Image src="/Other/Guten.jpg" width={400} height={400} alt="Вентилятор" className="object-contain" />
                <Image src="/Other/Chipseke.jpg" width={400} height={400} alt="Вентилятор" className="object-contain" />
                <Image src="/Other/Pyat.jpg" width={400} height={400} alt="Вентилятор" className="object-contain" />
            </div>

            <div className="text-violet-600 flex flex-col gap-2">
                <span className="text-4xl">Крутые коты, да?</span>
                <span className="text-4xl">Да ладно, они крутые</span>
            </div>
        </div>
    )
}
