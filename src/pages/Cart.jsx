import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import { useCart } from "../context/CartContext.jsx";

const money = (n) =>
    Number(n).toLocaleString("es-AR", { maximumFractionDigits: 0 });

const buildRows = (cart) =>
    cart.map((p) => {
        const qty = p.qty || 0;
        const net = (p.price || 0) * qty;
        const iva = net * (p.ivaRate ?? 0.21);
        const total = net + iva;
        return { ...p, qty, net, iva, total };
    });

export default function Cart() {
    const navigate = useNavigate();
    const { cart, removeFromCart, clearCart, updateQuantity } = useCart();

    const rows = useMemo(() => buildRows(cart), [cart]);

    const subtotal = useMemo(
        () => rows.reduce((acc, p) => acc + (p.net || 0), 0),
        [rows]
    );
    const ivaTotal = useMemo(
        () => rows.reduce((acc, p) => acc + (p.iva || 0), 0),
        [rows]
    );
    const grandTotal = useMemo(() => subtotal + ivaTotal, [subtotal, ivaTotal]);

    const handlePlus = (product) => {
        const step = product.step ?? 1;
        updateQuantity(product.id, (product.qty || 0) + step);
    };

    const handleMinus = (product) => {
        const step = product.step ?? 1;
        updateQuantity(product.id, (product.qty || 0) - step);
    };

    // Extra: WhatsApp
    const [phone, setPhone] = useState("");
    const buildMessage = () => {
        const lines = rows.map(
            (p) => `• ${p.title} — ${p.qty} ${p.unit} — Total: $ ${money(p.total)}`
        );
        return [
            "Hola! Te paso mi pedido:",
            "",
            ...lines,
            "",
            `Subtotal neto: $ ${money(subtotal)}`,
            `IVA: $ ${money(ivaTotal)}`,
            `Total: $ ${money(grandTotal)}`,
        ].join("\n");
    };

    const openWhatsapp = () => {
        const msg = encodeURIComponent(buildMessage());
        const clean = phone.replace(/[^\d]/g, "");
        window.open(`https://wa.me/${clean}?text=${msg}`, "_blank");
    };

    if (cart.length === 0) {
        return (
            <main className="cartPage">
                <div className="cartEmpty">
                    <h2>Tu carrito está vacío</h2>
                    <p>Agregá productos desde la Tienda.</p>
                    <button className="btn btn--primary" onClick={() => navigate("/tienda")}>
                        Ir a Tienda
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main className="cartPage">
            <header className="cartHeader">
                <div>
                    <h1 className="cartTitle">Carrito</h1>
                    <p className="cartSubtitle">Revisá cantidades y totales.</p>
                </div>

                <button className="btn btn--ghost" onClick={clearCart} type="button">
                    Vaciar carrito
                </button>
            </header>

            <div className="cartGrid">
                <section className="cartList">
                    {rows.map((product) => (
                        <article key={product.id} className="cartItem">
                            <div className="cartItem__imgWrap">
                                <img
                                    className="cartItem__img"
                                    src={product.image}
                                    alt={product.title}
                                    loading="lazy"
                                />
                            </div>

                            <div className="cartItem__info">
                                <h3 className="cartItem__name">{product.title}</h3>

                                <div className="cartItem__controls">
                                    <div className="qty">
                                        <button className="qty__btn" onClick={() => handleMinus(product)} type="button">
                                            −
                                        </button>

                                        <span className="qty__value">
                                            {product.qty} {product.unit}
                                        </span>

                                        <button className="qty__btn" onClick={() => handlePlus(product)} type="button">
                                            +
                                        </button>
                                    </div>

                                    <button
                                        className="btn btn--danger"
                                        onClick={() => removeFromCart(product.id)}
                                        type="button"
                                    >
                                        Quitar
                                    </button>
                                </div>
                            </div>

                            <div className="cartItem__totals">
                                <div className="row row--total">
                                    <span>Total</span>
                                    <strong>$ {money(product.total)}</strong>
                                </div>
                            </div>
                        </article>
                    ))}
                </section>

                <aside className="cartSummary">
                    <h2 className="summaryTitle">Resumen</h2>

                    <div className="summaryRow">
                        <span>Subtotal</span>
                        <strong>$ {money(subtotal)}</strong>
                    </div>

                    <div className="summaryRow">
                        <span>IVA</span>
                        <strong>$ {money(ivaTotal)}</strong>
                    </div>

                    <div className="summaryRow summaryRow--grand">
                        <span>Total</span>
                        <strong>$ {money(grandTotal)}</strong>
                    </div>

                    <button className="btn btn--primary" onClick={() => navigate("/checkout")} type="button">
                        Confirmar compra (Checkout)
                    </button>

                    <button className="btn btn--ghost" onClick={() => navigate("/tienda")} type="button">
                        Continuar comprando
                    </button>

                    <div className="waBox">
                        <h3 className="waTitle">Enviar por WhatsApp (extra)</h3>
                        <form
                            className="waForm"
                            onSubmit={(e) => {
                                e.preventDefault();
                                openWhatsapp();
                            }}
                        >
                            <input
                                className="waInput"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Ej: 5493534XXXXXX"
                                required
                            />
                            <button className="btn btn--ghost" type="submit">
                                Abrir WhatsApp
                            </button>
                        </form>
                    </div>
                </aside>
            </div>
        </main>
    );
}