// src/pages/Checkout.jsx
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./Checkout.css";

import { services } from "../services/index.js";
import { useCart } from "../context/CartContext.jsx";

const money = (n) => Number(n || 0).toLocaleString("es-AR", { maximumFractionDigits: 0 });

const buildRows = (cart) =>
    cart.map((p) => {
        const qty = p.qty || 0;
        const net = (p.price || 0) * qty;
        const iva = net * (p.ivaRate ?? 0.21);
        const total = net + iva;
        return { ...p, qty, net, iva, total };
    });

export default function Checkout() {
    const { cart, clearCart } = useCart();

    const [buyer, setBuyer] = useState({ name: "", phone: "", email: "" });
    const [loading, setLoading] = useState(false);
    const [orderId, setOrderId] = useState("");

    const isCartEmpty = cart.length === 0;

    const rows = useMemo(() => buildRows(cart), [cart]);
    const total = useMemo(() => rows.reduce((acc, p) => acc + (p.total || 0), 0), [rows]);

    const canSubmit = useMemo(() => {
        const okName = buyer.name.trim().length >= 2;
        const okPhone = buyer.phone.trim().length >= 6;
        const okEmail = buyer.email.includes("@") && buyer.email.includes(".");
        return okName && okPhone && okEmail && !isCartEmpty && !loading;
    }, [buyer, isCartEmpty, loading]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBuyer((prev) => ({ ...prev, [name]: value }));
    };

    const handleCreateOrder = async (e) => {
        e.preventDefault();
        if (!canSubmit) return;

        try {
            setLoading(true);

            const order = {
                buyer: {
                    name: buyer.name.trim(),
                    phone: buyer.phone.trim(),
                    email: buyer.email.trim(),
                },
                items: cart.map((p) => ({
                    id: p.id,
                    title: p.title,
                    price: p.price,
                    qty: p.qty,
                    category: p.category,
                })),
                total,
            };

            const id = await services.orders.create(order);
            setOrderId(id);
            clearCart();
        } catch (err) {
            console.error(err);
            alert("No se pudo generar la orden. Probá de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    if (orderId) {
        return (
            <main className="checkoutPage">
                <section className="checkoutCard">
                    <h1>¡Orden generada!</h1>
                    <p>
                        ID de orden: <strong>{orderId}</strong>
                    </p>
                    <Link className="btn btn--primary" to="/tienda">
                        Volver a la tienda
                    </Link>
                </section>
            </main>
        );
    }

    if (isCartEmpty) {
        return (
            <main className="checkoutPage">
                <section className="checkoutCard">
                    <h1>Checkout</h1>
                    <p>Tu carrito está vacío.</p>
                    <Link className="btn btn--primary" to="/tienda">
                        Ir a la tienda
                    </Link>
                </section>
            </main>
        );
    }

    return (
        <main className="checkoutPage">
            <section className="checkoutCard">
                <h1>Checkout</h1>
                <p className="muted">Completá tus datos para generar la orden.</p>

                <div className="checkoutSummary">
                    <h2>Resumen</h2>

                    <ul className="checkoutItems">
                        {rows.map((p) => (
                            <li key={p.id} className="checkoutItem">
                                <span>
                                    {p.title} <span className="muted">x {p.qty}</span>
                                </span>
                                <strong>$ {money(p.total)}</strong>
                            </li>
                        ))}
                    </ul>

                    <div className="checkoutTotal">
                        <span>Total</span>
                        <strong>$ {money(total)}</strong>
                    </div>
                </div>

                <form className="checkoutForm" onSubmit={handleCreateOrder}>
                    <label className="field">
                        <span>Nombre</span>
                        <input name="name" value={buyer.name} onChange={handleChange} />
                    </label>

                    <label className="field">
                        <span>Teléfono</span>
                        <input name="phone" value={buyer.phone} onChange={handleChange} />
                    </label>

                    <label className="field">
                        <span>Email</span>
                        <input name="email" value={buyer.email} onChange={handleChange} />
                    </label>

                    <button className="btn btn--primary" type="submit" disabled={!canSubmit}>
                        {loading ? "Generando..." : "Generar orden"}
                    </button>
                </form>
            </section>
        </main>
    );
}