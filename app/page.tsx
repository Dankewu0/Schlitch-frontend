import BrandList from "@/app/_components/Brands/BrandList";
import HomeCard from "@/app/_components/Home/HomeCardSection";
import {Suspense} from "react";
import HomeCardSkeleton from "@/app/_components/Home/HomeCardSectionSkeleton";
import ReportCard from "@/app/_components/Report/ReportCard";
import FAQCard from "@/app/_components/FAQCard";
export default function Home() {
    return (
        <div className="bg-white dark:bg-gray-900 min-h-screen">
            <Suspense fallback={<HomeCardSkeleton/>}>
                <section className=" dark:bg-gray-900"><HomeCard/></section>
            </Suspense>
            <section className="dark:bg-gray-900"><BrandList /></section>
            <section className=" dark:bg-gray-900 flex-row">
               <ReportCard/>
                <FAQCard/>
            </section>
        </div>
        )
}
