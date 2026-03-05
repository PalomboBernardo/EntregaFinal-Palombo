import ItemCount from "../ItemCount/ItemCount";
import "./ItemDetail.css";
import { useCart } from "../../context/CartContext.jsx";

const money = (n) =>
    Number(n).toLocaleString("es-AR", { maximumFractionDigits: 0 });

const ItemDetail = ({ item }) => {
    const { addToCart } = useCart();

    const handleAdd = (quantity) => {
        addToCart(item, quantity);
    };

    const ivaRate = item.ivaRate ?? 0.21;
    const priceNet = item.price ?? 0;

    return (
        <section className="itemDetail">
            <div className="itemDetail__imgWrap">
                <img className="itemDetail__img" src={item.image} alt={item.title} />
            </div>

            <div className="itemDetail__info">
                <p className="itemDetail__badge">{item.category}</p>
                <h2 className="itemDetail__title">{item.title}</h2>
                <p className="itemDetail__desc">{item.description}</p>

                {Array.isArray(item.bullets) && item.bullets.length > 0 && (
                    <ul className="itemDetail__bullets">
                        {item.bullets.map((bullet, index) => (
                            <li key={`${item.id}-b-${index}`}>{bullet}</li>
                        ))}
                    </ul>
                )}

                <div className="itemDetail__priceBox">
                    <div className="itemDetail__priceLine">
                        <span className="itemDetail__label">Precio neto</span>
                        <span className="itemDetail__value">
                            $ {money(priceNet)} <span className="itemDetail__muted">/ {item.unit}</span>
                        </span>
                    </div>

                    <div className="itemDetail__priceLine">
                        <span className="itemDetail__label">IVA</span>
                        <span className="itemDetail__value">{(ivaRate * 100).toFixed(1)}%</span>
                    </div>
                </div>

                <ItemCount
                    stock={item.stock ?? 1000}
                    step={item.step ?? 1}
                    unit={item.unit ?? "u"}
                    onAdd={handleAdd}
                />
            </div>
        </section>
    );
};

export default ItemDetail;