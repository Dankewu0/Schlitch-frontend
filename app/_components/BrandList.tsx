export default function BrandList() {
    return (
        <div className="overflow-x-auto py-4">
            <div className="flex space-x-4 ">
                {[...Array(10)].map((_, idx) => (
                    <div
                        key={idx}
                        className="w-32 h-16 bg-gray-200 hover:bg-gray-300 transition-colors duration-300 rounded-lg flex items-center justify-center text-black"
                    >
                        Brand
                    </div>
                ))}
            </div>
        </div>
    );
}
