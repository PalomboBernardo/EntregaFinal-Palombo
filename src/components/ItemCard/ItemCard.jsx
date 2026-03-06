import { Link } from "react-router-dom";
import "./ItemCard.css";

const money = (n) => Number(n).toLocaleString("es-AR", { maximumFractionDigits: 0 });

const normalizeSrc = (src) => {
    if (!src) return "/vite.svg";
    return src.startsWith("/") ? src : `/${src}`;
};

const ItemCard = ({ item }) => {
    return (
        <article className="itemCard">
            <div className="itemCard__imgWrap">
                <img
                    className="itemCard__img"
                    src={normalizeSrc(item.image)}
                    alt={item.title}
                    loading="lazy"
                    onError={(e) => {
                        console.log("IMG ERROR:", item.title, item.image);
                        e.currentTarget.src = "/vite.svg";
                    }}
                />
            </div>

            <div className="itemCard__body">
                <h3 className="itemCard__title">{item.title}</h3>

                <p className="itemCard__cat">Categoría: {item.category}</p>

                <p className="itemCard__price">
                    USD {money(item.price)} <span className="itemCard__priceUnit">/ {item.unit}</span>
                </p>

                <p className="itemCard__iva">IVA: {(Number(item.ivaRate) * 100).toFixed(1)}%</p>

                <Link className="itemCard__link" to={`/item/${item.id}`}>
                    Ver detalle
                </Link>
            </div>
        </article>
    );
};

export default ItemCard;