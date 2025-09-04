import { Skeleton } from "@/components/ui/skeleton";

export default function HomeCardSkeleton() {
    return (
        <div className="flex justify-between items-center gap-6 flex-wrap">
            <section className="w-full max-w-xl rounded-lg p-4 flex flex-col space-y-4">
                <Skeleton className="h-6 w-48" />
                <div className="flex space-x-4">
                    <Skeleton className="w-32 h-32 rounded-lg flex-shrink-0" />
                    <div className="flex flex-col justify-center space-y-2">
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="h-4 w-32" />
                    </div>
                </div>
            </section>

            <section className="w-full max-w-xl rounded-lg p-4 flex flex-col space-y-4">
                <Skeleton className="h-6 w-24" />
                <div className="flex space-x-4">
                    <Skeleton className="w-32 h-32 rounded-lg flex-shrink-0" />
                    <div className="flex flex-col justify-center space-y-2">
                        <Skeleton className="h-4 w-36" />
                        <Skeleton className="h-4 w-28" />
                    </div>
                </div>
            </section>
        </div>
    );
}
