import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { fetchData } from "@/lib/api";

type Product = {
    id: number;
    name: string;
    imageUrl: string;
    brand?: { name: string };
};

export default function ProductCard({ productId }: { productId: number }) {
    const [product, setProduct] = useState<Product | null>(null);
    const [isAdd, setIsAdd] = useState(false);

    useEffect(() => {
        fetchData(`products/${productId}`)
            .then((data) => setProduct(data))
            .catch((err) => console.log(err));
    }, [productId]);

    const AddProduct = () => {
        if (!product) return;
        fetchData("carts", {
            method: "POST",
            body: JSON.stringify({
                productId: product.id,
                quantity: 1,
            }),
        })
            .then(() => setIsAdd(true))
            .catch((err) => console.log(err));
    };

    if (!product) return <div>Загрузка...</div>;

    return (
        <div className="bg-gray-100 w-300 h-250">
            <section className="w-[300px] h-[100px] relative">
                <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    style={{ objectFit: "cover" }}
                />
            </section>
            <section>
                <h1 className="BRAND-NAME">{product.brand?.name}</h1>
                <h2 className="PRODUCT-NAME">{product.name}</h2>
            </section>
            <section>
                <Button onClick={AddProduct}>
                    {isAdd ? "Добавлено" : "Добавить в корзину"}
                </Button>
            </section>
        </div>
    );
}
