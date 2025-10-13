'use client';

import { useEffect, useState } from "react";
import { fetchData } from "@/lib/api";
import { useRouter } from "next/navigation";

interface Product {
    id: number;
    name: string;
    quantity: number;
}

interface CartItem {
    id: number;
    quantity: number;
    product: Product;
}

interface DeliverDetails {
    address: string;
    city: string;
    postalCode: string;
    phone: string;
}

export default function CartPage() {
    const router = useRouter();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [placingOrder, setPlacingOrder] = useState(false);
    const [delivery, setDelivery] = useState<DeliverDetails>({
        address: "",
        city: "",
        postalCode: "",
        phone: "",
    });

    const loadCart = async () => {
        try {
            const data = await fetchData<CartItem[]>("/cart");
            setCartItems(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const removeItem = async (id: number) => {
        try {
            await fetchData(`/cart/${id}`, { method: "DELETE" });
            setCartItems(prev => prev.filter(item => item.id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    const updateQuantity = async (id: number, qty: number) => {
        try {
            const item = cartItems.find(i => i.id === id);
            if (!item) return;
            const updated = await fetchData<{ quantity: number } | null>("/cart", {
                method: "POST",
                body: JSON.stringify({ product_id: item.product.id, quantity: qty }),
            });
            if (!updated) return;
            setCartItems(prev => prev.map(i => i.id === id ? { ...i, quantity: updated.quantity } : i));
        } catch (err) {
            console.error(err);
        }
    };

    const placeOrder = async () => {
        if (!cartItems.length) return;
        setPlacingOrder(true);
        try {
            const payload = {
                items: cartItems.map(item => ({ product_id: item.product.id, quantity: item.quantity })),
                delivery,
            };
            await fetchData("/orders", { method: "POST", body: JSON.stringify(payload) });
            setCartItems([]);
            router.push("/Profile");
        } catch (err) {
            console.error(err);
        } finally {
            setPlacingOrder(false);
        }
    };

    useEffect(() => { loadCart(); }, []);

    if (loading) return <div className="p-4 min-h-screen flex items-center justify-center text-violet-600 text-xl">Загрузка корзины...</div>;
    if (!cartItems.length) return <div className="p-4 min-h-screen flex items-center justify-center text-gray-700">Корзина пуста</div>;

    return (
        <div className="p-4 max-w-4xl mx-auto flex flex-col gap-4 sm:gap-6">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900 text-center sm:text-left">Корзина</h1>
            <div className="flex flex-col gap-4">
                {cartItems.map(item => (
                    <div key={item.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-2 border-violet-600 p-3 sm:p-4 rounded-xl shadow-md bg-white">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 w-full">
                            <div className="font-semibold text-gray-900">{item.product.name}</div>
                            <div className="flex items-center mt-1 sm:mt-0 text-gray-700">
                                Количество:
                                <input
                                    type="number"
                                    min={1}
                                    value={item.quantity}
                                    onChange={e => updateQuantity(item.id, parseInt(e.target.value))}
                                    className="ml-2 border border-violet-200 rounded px-2 w-16 focus:outline-none focus:ring-2 focus:ring-violet-600"
                                />
                            </div>
                        </div>
                        <button
                            onClick={() => removeItem(item.id)}
                            className="mt-2 sm:mt-0 bg-violet-600 text-white px-3 py-1 rounded hover:bg-violet-500 sm:ml-4"
                        >
                            Удалить
                        </button>
                    </div>
                ))}
            </div>

            <div className="flex flex-col gap-4 mt-6 p-4 bg-violet-100 rounded-xl">
                <h2 className="text-xl font-semibold text-gray-900">Детали доставки</h2>
                <input
                    type="text"
                    placeholder="Адрес"
                    value={delivery.address}
                    onChange={e => setDelivery({...delivery, address: e.target.value})}
                    className="border border-violet-200 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-violet-600"
                />
                <input
                    type="text"
                    placeholder="Город"
                    value={delivery.city}
                    onChange={e => setDelivery({...delivery, city: e.target.value})}
                    className="border border-violet-200 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-violet-600"
                />
                <input
                    type="text"
                    placeholder="Почтовый индекс"
                    value={delivery.postalCode}
                    onChange={e => setDelivery({...delivery, postalCode: e.target.value})}
                    className="border border-violet-200 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-violet-600"
                />
                <input
                    type="text"
                    placeholder="Телефон"
                    value={delivery.phone}
                    onChange={e => setDelivery({...delivery, phone: e.target.value})}
                    className="border border-violet-200 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-violet-600"
                />
            </div>

            <div className="mt-6 flex justify-center sm:justify-end">
                <button
                    onClick={placeOrder}
                    disabled={placingOrder}
                    className="bg-violet-600 text-white py-2 px-6 rounded-lg hover:bg-violet-500 shadow-md w-full sm:w-auto"
                >
                    {placingOrder ? "Оформление..." : "Оформить заказ"}
                </button>
            </div>
        </div>
    );
}
