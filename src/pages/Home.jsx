import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { services } from "../services/index.js";
import ItemCard from "../components/ItemCard/ItemCard.jsx";
import logo from "../assets/Logo.png";
import "./Home.css";

const Home = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        services.products
            .getProducts()
            .then((data) => setItems(data))
            .finally(() => setLoading(false));
    }, []);

    return (
        <main className="home">
            {/* HERO */}
            <section className="homeHero container">
                <img
                    src={logo}
                    alt="AgroStore"
                    className="homeLogo"
                />

                <p className="homeSubtitle">
                    Insumos para el agro con foco en calidad, asesoramiento y
                    soluciones reales para cada etapa del cultivo.
                </p>

                <div className="homeGrid">
                    <Link to="/tienda" className="homeTile">
                        <h2>Tienda</h2>
                        <p>Entrá por categorías y encontrá el producto ideal.</p>
                    </Link>

                    <Link to="/services" className="homeTile">
                        <h2>Servicios</h2>
                        <p>Asesoramiento técnico y acompañamiento.</p>
                    </Link>

                    <Link to="/contact" className="homeTile">
                        <h2>Contacto</h2>
                        <p>Consultas, presupuestos y atención directa.</p>
                    </Link>
                </div>
            </section>

            {/* DESTACADOS */}
            <section className="homeCarousel container">
                <div className="homeCarouselHeader">
                    <h2 className="homeSectionTitle">Productos destacados</h2>
                    <Link to="/tienda/productos" className="homeLink">
                        Ver todo el catálogo →
                    </Link>
                </div>

                {loading ? (
                    <p className="homeLoading">Cargando productos...</p>
                ) : (
                    <div className="carousel">
                        {items.slice(0, 12).map((item) => (
                            <div key={item.id} className="carouselItem">
                                <ItemCard item={item} />
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
};

export default Home;
