import BrandList from "@/app/_components/BrandList";
import HomeCard from "@/app/_components/HomeCardSection";
import {Suspense} from "react";
import HomeCardSkeleton from "@/app/_components/HomeCardSectionSkeleton";
export default function Home() {
    return (
        <div>
            <Suspense fallback={<HomeCardSkeleton/>}>
                <section className="mb-20 mt-15"><HomeCard/></section>
            </Suspense>
            <section className="mt-25"><BrandList /></section>
        </div>
        )
}
