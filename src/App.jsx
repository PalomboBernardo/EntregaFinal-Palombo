import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";

import NavBar from "./components/NavBar/NavBar.jsx";

// Components/containers
import ItemListContainer from "./components/ItemListContainer/ItemListContainer.jsx";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer.jsx";

// Pages (asumo tus nombres estándar)
import Home from "./pages/Home.jsx";
import StoreHub from "./pages/StoreHub.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import Contact from "./pages/Contact.jsx";
import Services from "./pages/Services.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
    const location = useLocation();
    const isHomePage = location.pathname === "/";

    return (
        <>
            {!isHomePage && <NavBar />}

            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/tienda" element={<StoreHub />} />

                <Route
                    path="/tienda/productos"
                    element={<ItemListContainer greeting="Catálogo de productos" />}
                />

                <Route
                    path="/category/:categoryId"
                    element={<ItemListContainer greeting="Productos por categoría" />}
                />

                <Route path="/item/:itemId" element={<ItemDetailContainer />} />

                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />

                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />

                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}