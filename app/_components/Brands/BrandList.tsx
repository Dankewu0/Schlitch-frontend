'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const brands = [
    { id: 1, name: 'amd', image: '/brands/amd.png', lightImage: '/brands/amd_light.png' },
    { id: 2, name: 'ardor', image: '/brands/ardor.png', lightImage: '/brands/ardor_light.png' },
    { id: 3, name: 'honor', image: '/brands/honor.png', lightImage: '/brands/honor_light.png' },
    { id: 4, name: 'indesit', image: '/brands/indesit.png', lightImage: '/brands/indesit_light.png' },
    { id: 5, name: 'intel', image: '/brands/intel.png', lightImage: '/brands/intel_light.png' },
    { id: 6, name: 'msi', image: '/brands/msi.png', lightImage: '/brands/msi_light.png' },
    { id: 7, name: 'oneplus', image: '/brands/oneplus.png', lightImage: '/brands/oneplus_light.png' },
    { id: 8, name: 'tefal', image: '/brands/tefal.png', lightImage: '/brands/tefal_light.png' },
    { id: 9, name: 'huawei', image: '/brands/huawei.png', lightImage: '/brands/huawei_light.png' },
    { id: 10, name: 'xiaomi', image: '/brands/xiaomi.png', lightImage: '/brands/xiaomi_light.png' },
];

export default function BrandList() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        setIsDark(document.documentElement.classList.contains('dark'));
        const observer = new MutationObserver(() => {
            setIsDark(document.documentElement.classList.contains('dark'));
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        return () => observer.disconnect();
    }, []);

    return (
        <div className="w-full p-6 dark:bg-gray-900 text-zinc-900 dark:text-zinc-100">
            <div className="overflow-x-auto sm:overflow-x-visible">
                <div className="
                    grid grid-flow-col auto-cols-[minmax(120px,1fr)]
                    sm:grid-flow-row sm:grid-cols-[repeat(auto-fit,minmax(144px,1fr))]
                    gap-4 sm:gap-6
                ">
                    {brands.map((brand) => (
                        <div
                            key={brand.id}
                            className="
                                w-28 sm:w-32 md:w-36 h-20 sm:h-24 md:h-28
                                bg-white border-2 border-zinc-100 dark:border-gray-800 dark:bg-gray-900
                                rounded-lg flex items-center justify-center
                                transition-colors cursor-pointer
                            "
                        >
                            <Image
                                src={isDark ? brand.lightImage : brand.image}
                                width={100}
                                height={40}
                                alt={brand.name}
                                className="object-contain"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
