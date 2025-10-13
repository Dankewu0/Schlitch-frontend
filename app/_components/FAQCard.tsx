import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function FAQCard() {
    return (
        <main className="bg-violet-200 font-bold text-violet-200 p-6 shadow-sm rounded-4xl max-w-md mx-auto">
            <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2  p-2 ">
                    <span className="text-lg bg-white rounded-lg shadow-sm">Есть Вопросы?</span>
                    <Image
                        src="/Other/GTWoman.png"
                        alt="Decorative"
                        width={24}
                        height={24}
                        className="object-cover"
                    />
                </div>
                <div className="bg-white p-2 rounded-xl text-base shadow-sm">Ну тогда</div>
                <div className="bg-white p-2 rounded-xl text-base shadow-sm">Гляньте F.A.Q</div>

                <Link href="/FAQ">
                    <Button className="bg-violet-300 dark:bg-violet-700 lg:dark:bg-violet-600 hover:border-violet-300 hover:border-2 lg:bg-violet-200 hover:bg-violet-200 shadow-sm shadow-violet-300 dark:shadow-violet-700 dark:hover:border-violet-700 dark:text-white mt-2 w-full">
                        FAQ
                    </Button>
                </Link>
            </div>
        </main>
    );
}
