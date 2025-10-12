import {Button} from "@/components/ui/button";
import Link from "next/link";
export default function ReportCard(){
    return (
            <div className="REPORTCARD flex mr-4 dark:bg-violet-600 dark:border-gray-800 rounded-lg p-4 inline-block font-bold bg-violet-200 text-white border-2 border-zinc-100 items-center justify-center m-4" >
                <section className="flex justify-between items-center mb-4 flex-col ">
                    <h1 className="text-xl">Нашли ошибку?</h1>
                    <h2 className="text-xl">Напишите нам!</h2>
                </section>
               <section>
                   <Link href="/Report">
                       <Button className="bg-violet-300 dark:bg-violet-700 lg:dark:bg-violet-600 hover:border-violet-300 hover:border-2 lg:bg-violet-200 hover:bg-violet-200 shadow-sm shadow-violet-300 dark:shadow-violet-700 dark:hover:border-violet-700 dark:text-white">
                            Написать
                       </Button>
                   </Link>
               </section>
            </div>
        )
}