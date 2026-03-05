// src/services/products.js
import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    where,
    writeBatch,
    increment,
} from "firebase/firestore";
import { db } from "../utils/firebase";

export const products = {
    // Trae todos los productos
    getProducts: async () => {
        const snap = await getDocs(collection(db, "products"));
        return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    },

    // Trae productos filtrados por categoría
    getProductsByCategory: async (categoryId) => {
        const q = query(
            collection(db, "products"),
            where("category", "==", categoryId)
        );
        const snap = await getDocs(q);
        return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    },

    // Trae 1 producto por ID
    getProductById: async (id) => {
        const ref = doc(db, "products", String(id));
        const snap = await getDoc(ref);
        if (!snap.exists()) return null;
        return { id: snap.id, ...snap.data() };
    },

    // ✅ Descuenta stock (updateDoc) usando batch
    // cartItems: array de items del carrito [{id, qty}, ...]
    updateStock: async (cartItems) => {
        if (!Array.isArray(cartItems) || cartItems.length === 0) return;

        const batch = writeBatch(db);

        cartItems.forEach((item) => {
            const id = String(item.id);
            const qty = Number(item.qty || 0);

            if (!id || !Number.isFinite(qty) || qty <= 0) return;

            const ref = doc(db, "products", id);

            // descontamos stock: stock = stock - qty
            batch.update(ref, {
                stock: increment(-qty),
            });
        });

        await batch.commit();
    },
};