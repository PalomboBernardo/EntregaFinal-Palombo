import { useEffect, useState } from "react";
import "./ItemCount.css";

const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

const ItemCount = ({ stock = 1000, initial, step = 1, unit = "u", onAdd }) => {
    const safeStep = Number(step) > 0 ? Number(step) : 1;
    const safeInitial = initial ?? safeStep;

    const [count, setCount] = useState(safeInitial);

    // si cambia el producto (step/unit), resetea el contador
    useEffect(() => {
        setCount(safeInitial);
        
    }, [safeStep, unit]);

    const handleMinus = () =>
        setCount((previousCount) => clamp(previousCount - safeStep, safeStep, stock));

    const handlePlus = () =>
        setCount((previousCount) => clamp(previousCount + safeStep, safeStep, stock));

    const handleAdd = () => {
        if (typeof onAdd === "function") onAdd(count);
    };

    return (
        <div className="itemCount">
            <div className="qty">
                <button
                    className="qty__btn"
                    onClick={handleMinus}
                    disabled={count <= safeStep}
                    type="button"
                    aria-label="Restar"
                >
                    −
                </button>

                <div className="qty__center">
                    <span className="qty__value">
                        {count} <span className="qty__unit">{unit}</span>
                    </span>
                    <span className="qty__hint">paso {safeStep} {unit}</span>
                </div>

                <button
                    className="qty__btn"
                    onClick={handlePlus}
                    disabled={count >= stock}
                    type="button"
                    aria-label="Sumar"
                >
                    +
                </button>
            </div>

            <button className="btnAdd" onClick={handleAdd} disabled={stock <= 0} type="button">
                Agregar al carrito
            </button>

            <p className="stockText">
                Stock disponible: {stock} {unit}
            </p>
        </div>
    );
};

export default ItemCount;
