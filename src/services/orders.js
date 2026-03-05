// src/services/orders.js

import {
    addDoc,
    collection,
    serverTimestamp,
    doc,
    updateDoc,
    increment
} from "firebase/firestore";

import { db } from "../utils/firebase";

export const orders = {

    create: async (order) => {

        // crear orden
        const payload = {
            ...order,
            createdAt: serverTimestamp()
        };

        const ref = await addDoc(collection(db, "orders"), payload);

        // actualizar stock de cada producto
        for (const item of order.items) {

            const productRef = doc(db, "products", item.id);

            await updateDoc(productRef, {
                stock: increment(-item.qty)
            });

        }

        return ref.id;
    }

};