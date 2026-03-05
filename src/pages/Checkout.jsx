// src/pages/Checkout.jsx
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { services } from "../services/index.js";
import { useCart } from "../context/CartContext.jsx";

// Si tenés Checkout.css y querés estilo, dejalo.
// Si no lo querés, podés borrar esta línea.
import "./Checkout.css";

const money = (n) => new Intl.NumberFormat("es-AR").format(Math.round(n || 0));

export default function Checkout() {
    const navigate = useNavigate();
    const { cart, totalPrice, clearCart } = useCart();

    const [buyer, setBuyer] = useState({ name: "", phone: "", email: "" });
    const [loading, setLoading] = useState(false);
    const [orderId, setOrderId] = useState("");

    const isCartEmpty = cart.length === 0;

    const items = useMemo(() => {
        return cart.map((p) => ({
            id: p.id,
            title: p.title || p.name || "Producto",
            price: Number(p.price || 0),
            qty: Number(p.qty || 0),
        }));
    }, [cart]);

    const total = useMemo(() => {
        // si tu CartContext ya calcula totalPrice bien, usamos eso
        const t = Number(totalPrice || 0);
        if (Number.isFinite(t) && t > 0) return t;

        // fallback por si totalPrice no está
        return items.reduce((acc, it) => acc + it.price * it.qty, 0);
    }, [items, totalPrice]);

    const onChange = (e) => {
        const { name, value } = e.target;
        setBuyer((prev) => ({ ...prev, [name]: value }));
    };

    const validate = () => {
        if (isCartEmpty) return "El carrito está vacío.";
        if (!buyer.name.trim()) return "Completá tu nombre.";
        if (!buyer.phone.trim()) return "Completá tu teléfono.";
        if (!buyer.email.trim()) return "Completá tu email.";
        // validación simple
        if (!buyer.email.includes("@")) return "El email no parece válido.";
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const err = validate();
        if (err) {
            alert(err);
            return;
        }

        setLoading(true);
        try {
            // 1) Actualizar stock (updateDoc) ANTES o DESPUÉS de crear la orden:
            // - Yo lo hago ANTES de limpiar el carrito, y si falla, no creo la orden.
            // - Si preferís crear primero la orden, también está bien.
            await services.products.updateStock(cart);

            // 2) Crear orden
            const order = {
                buyer: {
                    name: buyer.name.trim(),
                    phone: buyer.phone.trim(),
                    email: buyer.email.trim(),
                },
                items,
                total,
            };

            const newOrderId = await services.orders.create(order);

            // 3) Estado + limpiar carrito
            setOrderId(newOrderId);
            clearCart();
        } catch (error) {
            console.error(error);
            alert(
                "Hubo un problema generando la orden o actualizando stock. Revisá la consola."
            );
        } finally {
            setLoading(false);
        }
    };

    // ✅ Pantalla final con el ID (como te mostró antes)
    if (orderId) {
        return (
            <div className="checkoutPage">
                <h1>¡Orden generada!</h1>
                <p>
                    ID de orden: <b>{orderId}</b>
                </p>

                <Link className="checkoutLink" to="/tienda">
                    Volver a la tienda
                </Link>
            </div>
        );
    }

    return (
        <div className="checkoutPage">
            <h1>Checkout</h1>
            <p>Completá tus datos para generar la orden.</p>

            {isCartEmpty ? (
                <div className="checkoutEmpty">
                    <p>Tu carrito está vacío.</p>
                    <Link className="checkoutLink" to="/tienda">
                        Ir a la tienda
                    </Link>
                </div>
            ) : (
                <div className="checkoutGrid">
                    <section className="checkoutCard">
                        <h2>Resumen</h2>

                        <ul className="checkoutList">
                            {items.map((it) => (
                                <li key={it.id} className="checkoutRow">
                                    <span className="checkoutTitle">
                                        {it.title} <small>x {it.qty}</small>
                                    </span>
                                    <span className="checkoutPrice">${money(it.price * it.qty)}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="checkoutTotal">
                            <span>Total</span>
                            <b>${money(total)}</b>
                        </div>

                        <div className="checkoutActions">
                            <button
                                type="button"
                                className="checkoutBtnSecondary"
                                onClick={() => navigate("/cart")}
                                disabled={loading}
                            >
                                Volver al carrito
                            </button>
                            <Link className="checkoutLink" to="/tienda">
                                Seguir comprando
                            </Link>
                        </div>
                    </section>

                    <section className="checkoutCard">
                        <h2>Datos del comprador</h2>

                        <form onSubmit={handleSubmit} className="checkoutForm">
                            <label>
                                Nombre
                                <input
                                    name="name"
                                    value={buyer.name}
                                    onChange={onChange}
                                    placeholder="Tu nombre"
                                    autoComplete="name"
                                />
                            </label>

                            <label>
                                Teléfono
                                <input
                                    name="phone"
                                    value={buyer.phone}
                                    onChange={onChange}
                                    placeholder="Ej: 5493534XXXXXX"
                                    autoComplete="tel"
                                />
                            </label>

                            <label>
                                Email
                                <input
                                    name="email"
                                    value={buyer.email}
                                    onChange={onChange}
                                    placeholder="tu@email.com"
                                    autoComplete="email"
                                />
                            </label>

                            <button className="checkoutBtnPrimary" disabled={loading}>
                                {loading ? "Generando..." : "Generar orden"}
                            </button>
                        </form>
                    </section>
                </div>
            )}
        </div>
    );
}