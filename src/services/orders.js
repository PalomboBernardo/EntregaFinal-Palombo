// src/services/orders.js
import {
    addDoc,
    collection,
    doc,
    serverTimestamp,
    writeBatch,
    increment,
} from "firebase/firestore";
import { db } from "../utils/firebase";

export const orders = {
    create: async (order) => {
        const payload = {
            ...order,
            createdAt: serverTimestamp(),
        };

        const ref = await addDoc(collection(db, "orders"), payload);
        return ref.id;
    },


    updateStock: async (cartItems) => {
        const batch = writeBatch(db);

        cartItems.forEach((item) => {
            const ref = doc(db, "products", String(item.id));
            batch.update(ref, {
                stock: increment(-Number(item.qty || 0)),
            });
        });

        await batch.commit();
    },
};