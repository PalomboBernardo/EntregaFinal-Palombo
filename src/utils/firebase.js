import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD_GusOkITHz1s6jCs8CkxS-cWGusHhGn4",
    authDomain: "agrostore-entregafinal.firebaseapp.com",
    projectId: "agrostore-entregafinal",
    storageBucket: "agrostore-entregafinal.appspot.com",
    messagingSenderId: "988582976404",
    appId: "1:988582976404:web:9f3184f09dee070a84cd81"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);