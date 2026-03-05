import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../utils/firebase";

export const products = {
    getProducts: async () => {
        const snap = await getDocs(collection(db, "products"));
        return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    },

    getProductsByCategory: async (categoryId) => {
        const q = query(collection(db, "products"), where("category", "==", categoryId));
        const snap = await getDocs(q);
        return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    },

    getProductById: async (id) => {
        const ref = doc(db, "products", String(id));
        const snap = await getDoc(ref);
        if (!snap.exists()) return null;
        return { id: snap.id, ...snap.data() };
    },
};