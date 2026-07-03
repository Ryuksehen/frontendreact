# Tienda Online - Proyecto Final React

## 📝 Descripción del Proyecto
Esta es una aplicación web de comercio electrónico (E-commerce) desarrollada como proyecto final utilizando **React**, **Vite**, **Zustand** (para el estado global) y **Tailwind CSS**. 

La aplicación permite a los clientes explorar productos, agregarlos a un carrito de compras y realizar pedidos. Además, cuenta con un sistema de roles protegido y un **Panel de Administración** completo donde los administradores pueden gestionar el catálogo de productos (CRUD completo), visualizar clientes registrados, supervisar los pedidos, cambiar el estado de los mismos (Pendiente, Aprobado, Rechazado) y registrar nuevos administradores. Toda la interfaz está diseñada con un enfoque responsivo (Mobile First).

## 🔌 API Utilizada
El proyecto no consume una API pública externa en la nube. En su lugar, utiliza **[JSON Server](https://github.com/typicode/json-server)** para simular una API REST funcional de manera 100% local, empleando el archivo `db.json` como base de datos. 

Esto permite que la aplicación frontend realice peticiones asíncronas reales (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`) para gestionar autenticación, usuarios, productos y pedidos. Los cambios realizados se persisten automáticamente en el archivo `db.json`.

## ⚙️ Instrucciones de Instalación y Ejecución

Sigue estos pasos para levantar el entorno de desarrollo localmente:

1. **Requisitos previos:**
   Asegúrate de tener [Node.js](https://nodejs.org/) instalado en tu equipo.

2. **Instalar las dependencias:**
   Abre tu terminal en la carpeta raíz del proyecto y ejecuta:
   ```bash
   npm install
   ```

3. **Levantar la Base de Datos (API Simulada):**
   Para que el frontend pueda obtener y guardar datos, necesitas iniciar el JSON Server. Ejecuta el siguiente comando en la terminal (este proceso debe quedarse corriendo):
   ```bash
   npm run api
   ```
   *(La API correrá en `http://localhost:3001`)*

4. **Levantar la Aplicación React:**
   Abre una **nueva pestaña** en tu terminal (sin cerrar la de la API) y ejecuta:
   ```bash
   npm run dev
   ```

5. **Acceder a la app:**
   Abre tu navegador web e ingresa a `http://localhost:5173` (o la URL que la terminal de Vite te indique).

## 🔑 Credenciales de Prueba

Para probar las funcionalidades de inmediato sin tener que registrarte, puedes utilizar las siguientes credenciales pre-cargadas:

### 👤 Perfil Cliente (Tienda y Carrito)
- **Email:** `omar1@gmail.com`
- **Contraseña:** `123456`
> _Con este usuario podrás navegar por la tienda, agregar productos al carrito, realizar compras y ver tu historial de pedidos._

### 🛡️ Perfil Administrador (Dashboard)
- **Email:** `react@react.com`
- **Contraseña:** `reac123`
> _Con este usuario tendrás acceso al panel de administración para gestionar productos, actualizar el estado de los pedidos y crear más administradores._

---
*Nota: También puedes crear una cuenta nueva libremente utilizando el formulario de "Registrarse" de la aplicación.*
