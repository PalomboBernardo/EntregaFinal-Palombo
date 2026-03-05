# 🛒 NavegaLasRutas - E-commerce React

Entrega Final – **Curso React JS (Coderhouse)**

Aplicación web tipo **E-commerce** desarrollada con **React + Vite**, que permite visualizar un catálogo de productos, navegar entre categorías, ver el detalle de cada producto y simular una compra agregando productos al carrito.

El proyecto implementa los principales conceptos vistos durante el curso, incluyendo **componentización, hooks, navegación con React Router, manejo de estado global y conexión con Firebase**.

---

## 🚀 Demo

![Demo navegación](./src/assets/Animation-2.gif)

---

## 📦 Funcionalidades

- 📋 Catálogo dinámico de productos
- 🔎 Filtrado por categorías
- 📄 Vista de detalle de producto
- ➕ Selector de cantidad mediante **ItemCount**
- 🛒 Sistema de carrito de compras
- 🧠 Manejo de estado global con **React Context**
- 🔗 Navegación entre rutas con **React Router**
- ❌ Ruta **404** personalizada
- ⏳ Simulación de consultas asincrónicas
- ☁️ Integración con **Firebase Firestore**

---

## 🧩 Componentes principales

El proyecto se organiza mediante componentes reutilizables siguiendo la separación entre **componentes contenedores y de presentación**.

### Navegación
- **NavBar** → barra de navegación principal
- **CartWidget** → indicador de cantidad de productos en el carrito

### Catálogo
- **ItemListContainer** → obtiene productos desde la base de datos
- **ItemList** → renderiza la lista de productos
- **ItemCard** → tarjeta individual de producto

### Detalle de producto
- **ItemDetailContainer** → obtiene información del producto
- **ItemDetail** → muestra la información del producto
- **ItemCount** → selector de cantidad con validación de stock

### Carrito
- **Cart** → visualización de productos agregados
- **Checkout** → generación de orden de compra

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

## ✅ Requisitos del proyecto (Coderhouse)

### Listado y detalle de productos

- Generación dinámica del listado mediante **ItemListContainer**
- Acceso al detalle del producto mediante **ItemDetailContainer**
- Separación entre **componentes contenedores y de presentación**
- Implementación del componente **ItemCount** con validaciones de cantidad mínima y límite por stock
- Ocultamiento de **ItemCount** luego de agregar un producto al carrito

### Navegación

- Navegación entre catálogo, categorías, detalle, carrito y checkout mediante **React Router**
- Links de navegación implementados en **NavBar**
- Implementación del modelo **Single Page Application (SPA)** sin recarga del navegador
- Ruta **404** para páginas inexistentes

### Carrito de compras

- Estado global del carrito implementado con **React Context**
- Visualización de productos agregados dentro del componente **Cart**
- Cálculo de cantidades, subtotales y total de compra
- **CartWidget** mostrando el total de unidades agregadas al carrito

### Firebase

- Implementación de **Firebase Firestore** como base de datos
- Colección de productos almacenada en Firestore
- Consulta de productos desde React
- Generación de documento de orden en Firestore al confirmar la compra
- Visualización del **ID de la orden generada**

### Experiencia de usuario

- Renderizado condicional para mostrar loaders durante la carga de datos
- Mensajes para diferentes estados:
  - carrito vacío
  - producto sin stock
  - carga de productos
- Confirmación de compra mostrando el **ID de la orden generada**

---

## 🛠️ Tecnologías utilizadas

- **React**
- **Vite**
- **React Router DOM**
- **Firebase (Firestore)**
- **CSS**

---

## ▶️ Cómo ejecutar el proyecto

### 1️⃣ Clonar el repositorio

git clone https://github.com/PalomboBernardo/EntregaFinal-Palombo.git

### 2️⃣ Instalar dependencias

npm install

### 3️⃣ Ejecutar servidor de desarrollo

npm run dev

### 4️⃣ Abrir en el navegador

http://localhost:5173


---

## 🔥 Configuración de Firebase

El proyecto utiliza **Firebase Firestore** para almacenar los productos y registrar las órdenes de compra.

Pasos básicos:

1. Crear un proyecto en **Firebase**
2. Crear una base de datos en **Firestore**
3. Crear una colección de productos (por ejemplo `products`)
4. Configurar las credenciales en el archivo:

src/utils/firebase.js


⚠️ Se recomienda utilizar **variables de entorno** para proteger las credenciales.

---

## 👨‍💻 Autor

**Bernardo Palombo**

Ingeniero Agrónomo  
ATC – Timac Agro Argentina

Proyecto desarrollado para el curso  
**React JS – Coderhouse**

---

## ⭐ Observación

Este proyecto fue desarrollado con fines educativos aplicando los conceptos aprendidos durante el curso de **React JS en Coderhouse**, incluyendo arquitectura de componentes, manejo de estado, navegación SPA y persistencia de datos con Firebase.