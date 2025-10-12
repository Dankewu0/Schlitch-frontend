import { Loader } from "lucide-react";
export default function Loading() {
    return (
        <div className="flex flex-col space-y-4 items-center justify-center">
            <section className="flex flex-row items-center justify-center">
                    <h1>Подождите немного</h1>
                    <h2>Страница скоро прогрузится</h2>

            </section>
            <section className="flex items-center justify-center">
                <Loader className="animate-spin" size={36} />
            </section>
        </div>
    );
}
