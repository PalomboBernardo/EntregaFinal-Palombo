import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    const totalItems = useMemo(
        () => cart.reduce((acc, item) => acc + (item.qty || 0), 0),
        [cart]
    );

    const addToCart = (item, quantity) => {
        setCart((prev) => {
            const found = prev.find((p) => p.id === item.id);
            if (found) {
                return prev.map((p) =>
                    p.id === item.id ? { ...p, qty: (p.qty || 0) + quantity } : p
                );
            }
            return [...prev, { ...item, qty: quantity }];
        });
    };

    const removeFromCart = (id) =>
        setCart((prev) => prev.filter((p) => p.id !== id));

    const clearCart = () => setCart([]);

    const updateQuantity = (id, newQuantity) => {
        setCart((prev) =>
            prev
                .map((p) => (p.id === id ? { ...p, qty: newQuantity } : p))
                .filter((p) => (p.qty || 0) > 0)
        );
    };

    return (
        <CartContext.Provider
            value={{ cart, totalItems, addToCart, removeFromCart, clearCart, updateQuantity }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
    return ctx;
}