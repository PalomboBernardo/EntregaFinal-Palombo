# 🛒 NavegaLasRutas - E-commerce React  
Entrega Final – Curso React (Coderhouse)

Aplicación web tipo **E-commerce** desarrollada con **React + Vite**, que permite visualizar un catálogo de productos, navegar entre categorías, ver el detalle de cada producto y simular una compra agregando productos al carrito.

El proyecto implementa los principales conceptos de React vistos durante el curso, incluyendo **componentes, hooks, navegación con React Router y manejo de estado global para el carrito**.

---

## 🚀 Demo

![Demo navegación](./src/assets/Animation-2.gif)

---

## 📦 Funcionalidades

- 📋 Catálogo general de productos
- 🔎 Filtrado por categorías dinámicas
- 📄 Vista de detalle de producto
- ➕ Contador de unidades (`ItemCount`)
- 🛒 Carrito de compras
- 🧠 Manejo de estado global del carrito (Context)
- 🔗 Navegación entre rutas con React Router
- ❌ Ruta 404 personalizada
- ⏳ Simulación de consultas async mediante Promises
- ☁️ Conexión a Firebase para productos y órdenes

---

## 🧩 Componentes principales

- **NavBar** → navegación principal
- **CartWidget** → indicador del carrito
- **ItemListContainer** → contenedor del catálogo
- **ItemList** → renderiza lista de productos
- **ItemCard** → tarjeta individual de producto
- **ItemDetailContainer** → obtiene datos de un producto
- **ItemDetail** → muestra información detallada
- **ItemCount** → selector de cantidad

---

## 🗂️ Estructura del proyecto

src
│
├── components
│
├── pages
│ ├── StoreHub.jsx
│ └── NotFound.jsx
│
├── services
│ ├── products.js
│ ├── orders.js
│ └── index.js
│
├── utils
│ └── firebase.js
│
├── App.jsx
├── main.jsx
└── index.css


---

## 🛠️ Tecnologías utilizadas

- **React**
- **Vite**
- **React Router DOM**
- **Firebase (Firestore)**
- **CSS**

---

## ▶️ Cómo ejecutar el proyecto

1. Clonar el repositorio

https://github.com/PalomboBernardo/EntregaFinal-Palombo.git


2. Instalar dependencias

npm install


3. Ejecutar el servidor de desarrollo

npm run dev

4. Abrir en el navegador

http://localhost:5173


---

## 👨‍💻 Autor

**Bernardo Palombo**  
Proyecto realizado para el curso **React JS – Coderhouse**