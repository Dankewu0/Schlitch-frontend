'use client';

import { useEffect, useState } from "react";
import Cookies from "js-cookie";

interface Product { id: number; name: string; }
interface CartItem { id: number; quantity: number; product: Product; }
interface DeliveryDetails { address: string; city: string; postalCode: string; phone: string; }

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function CartPage() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [placingOrder, setPlacingOrder] = useState(false);
    const [delivery, setDelivery] = useState<DeliveryDetails>({ address: "", city: "", postalCode: "", phone: "" });

    const log = (msg: string, extra?: any) => {
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] ${msg}` + (extra ? ` | ${JSON.stringify(extra)}` : ""));
    };

    const fetchCSRF = async () => {
        log("🟢 Запрос CSRF cookie начинается", { url: `${API_BASE_URL}/sanctum/csrf-cookie` });
        const res = await fetch(`${API_BASE_URL}/sanctum/csrf-cookie`, { credentials: "include" });
        log("✅ Ответ от /sanctum/csrf-cookie", { status: res.status });
        return Cookies.get("XSRF-TOKEN") || "";
    };

    const loadCart = async () => {
        log("🟢 Загрузка корзины...");
        try {
            const xsrf = await fetchCSRF();
            const res = await fetch(`${API_BASE_URL}/cart`, { credentials: "include", headers: { "X-XSRF-TOKEN": xsrf } });
            const data = await res.json().catch(() => null);
            log("📨 Ответ от /cart", { status: res.status, body: data });
            if (res.ok && Array.isArray(data)) setCartItems(data);
        } catch (err) { log("🔥 Исключение loadCart", { message: (err as Error).message }); }
        finally { setLoading(false); }
    };

    const removeItem = async (id: number) => {
        log(`🟡 Удаление товара id=${id}...`);
        try {
            const xsrf = await fetchCSRF();
            const res = await fetch(`${API_BASE_URL}/cart/${id}`, { method: "DELETE", credentials: "include", headers: { "X-XSRF-TOKEN": xsrf } });
            const data = await res.json().catch(() => null);
            log("📨 Ответ от DELETE /cart", { status: res.status, body: data });
            if (res.ok) setCartItems(prev => prev.filter(item => item.id !== id));
        } catch (err) { log("🔥 Ошибка removeItem", { message: (err as Error).message }); }
    };

    const updateQuantity = async (id: number, qty: number) => {
        log(`🟡 Обновление количества товара id=${id} на ${qty}...`);
        try {
            const xsrf = await fetchCSRF();
            const item = cartItems.find(i => i.id === id);
            if (!item) return log("⚠ Товар не найден");
            const res = await fetch(`${API_BASE_URL}/cart`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json", "X-XSRF-TOKEN": xsrf },
                body: JSON.stringify({ product_id: item.product.id, quantity: qty })
            });
            const data = await res.json().catch(() => null);
            log("📨 Ответ от POST /cart", { status: res.status, body: data });
            if (res.ok) setCartItems(prev => prev.map(i => i.id === id ? { ...i, quantity: qty } : i));
        } catch (err) { log("🔥 Ошибка updateQuantity", { message: (err as Error).message }); }
    };

    const placeOrder = async () => {
        if (!cartItems.length) return log("⚠ Корзина пуста");
        setPlacingOrder(true);
        log("🟢 Оформление заказа...");
        try {
            const xsrf = await fetchCSRF();
            const res = await fetch(`${API_BASE_URL}/orders`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json", "X-XSRF-TOKEN": xsrf },
                body: JSON.stringify({ items: cartItems.map(i => ({ product_id: i.product.id, quantity: i.quantity })), delivery })
            });
            const data = await res.json().catch(() => null);
            log("📨 Ответ от POST /orders", { status: res.status, body: data });
            if (res.ok) {
                setCartItems([]);
                alert("Все детали доставки будут отправлены по смс");
            }
        } catch (err) { log("🔥 Ошибка placeOrder", { message: (err as Error).message }); }
        finally { setPlacingOrder(false); }
    };

    const sendDeliveryDetails = async () => {
        log("🟢 Отправка деталей доставки...");
        try {
            const xsrf = await fetchCSRF();
            const res = await fetch(`${API_BASE_URL}/deliver-details`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json", "X-XSRF-TOKEN": xsrf },
                body: JSON.stringify(delivery)
            });
            const data = await res.json().catch(() => null);
            log("📨 Ответ от POST /deliver-details", { status: res.status, body: data });
            if (res.ok) {
                placeOrder();
            }
        } catch (err) { log("🔥 Ошибка sendDeliveryDetails", { message: (err as Error).message }); }
    };

    useEffect(() => { loadCart(); }, []);

    if (loading) return <div className="p-4 min-h-screen flex items-center justify-center text-violet-200 dark:text-violet-600 text-xl font-bold">Загрузка корзины...</div>;

    return (
        <div className="p-4 min-h-screen flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row gap-6 flex-1">
                <div className="flex-1 flex flex-col gap-4">
                    <h1 className="text-2xl font-bold mb-4 text-violet-200 dark:text-violet-600">Корзина</h1>
                    {cartItems.length ? cartItems.map(item => (
                        <div key={item.id} className="flex flex-col sm:flex-row justify-between items-center border-2 border-violet-600 p-3 rounded-xl shadow-md bg-white">
                            <div className="flex-1 font-bold text-violet-200 dark:text-violet-600">{item.product.name}</div>
                            <div className="flex items-center gap-2 mt-2 sm:mt-0">
                                <input type="number" min={1} value={item.quantity} onChange={e => updateQuantity(item.id, parseInt(e.target.value))}
                                       className="border border-violet-200 rounded px-2 py-1 w-20 shadow focus:outline-none focus:ring-2 focus:ring-violet-600 text-violet-200"/>
                                <button onClick={() => removeItem(item.id)} className="bg-violet-600 text-white px-3 py-1 rounded hover:bg-violet-500 font-bold">Удалить</button>
                            </div>
                        </div>
                    )) : <div className="text-violet-200 dark:text-violet-600 font-bold">Корзина пуста</div>}
                </div>

                <div className="flex-1 flex flex-col gap-2 p-4 rounded-xl shadow-md bg-violet-200 dark:bg-violet-700 text-white ">
                    <h2 className="text-xl font-bold mb-2">Детали доставки</h2>
                    {["address", "city", "postalCode", "phone"].map((key) => (
                        <input
                            key={key}
                            type="text"
                            placeholder={key === "postalCode" ? "Почтовый индекс" : key === "phone" ? "Телефон" : key === "city" ? "Город" : "Адрес"}
                            value={delivery[key as keyof DeliveryDetails]}
                            onChange={e => setDelivery({...delivery, [key]: e.target.value})}
                            className="w-full px-3 py-2 rounded shadow bg-white text-violet-300 focus:outline-none mb-2"
                        />
                    ))}
                    <button onClick={sendDeliveryDetails} className="mt-2 bg-violet-200 dark:bg-violet-600 dark:hover:border-2 dark:hover:border-violet-700 dark:hover:bg-violet-700 text-white py-2 px-4 rounded hover:bg-violet-500 font-bold w-full sm:w-auto">Отправить детали</button>
                </div>
            </div>
        </div>
    );
}
