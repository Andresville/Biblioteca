# Biblioteca Digital - Proyecto de Administración de Libros

Este proyecto es una aplicación completa para la gestión y administración de libros en una biblioteca digital. Incluye un backend basado en Node.js con una base de datos en MySQL, un frontend desarrollado con React y diseñado con Bootstrap para un diseño responsivo. Además, incorpora un sistema de autenticación que distingue entre usuarios regulares y administradores, ofreciendo diferentes funcionalidades según el tipo de usuario.

---

## Tabla de Contenidos
1. [Tecnologías Usadas](#tecnologías-usadas)
2. [Funcionalidades Principales](#funcionalidades-principales)
3. [Instalación y Configuración](#instalación-y-configuración)
   - [Backend](#backend)
   - [Frontend](#frontend)
4. [Estructura de Carpetas](#estructura-de-carpetas)
5. [Instrucciones de Uso](#instrucciones-de-uso)
6. [Como clonar el repositorio](#clonar)


## 1. Tecnologías Usadas

### Backend
- **Node.js**: Servidor para manejar las APIs.
- **Express**: Framework para crear y gestionar las rutas del backend.
- **MySQL**: Base de datos para almacenar información sobre libros, usuarios, copias, estados, editoriales e idiomas.
- **Workbench de MySQL**: Herramienta para modelar y gestionar la base de datos.
- **JWT (JSON Web Tokens)**: Para manejar la autenticación y autorización de usuarios.

### Frontend
- **React**: Biblioteca para desarrollar la interfaz del usuario.
- **React Router**: Manejo de rutas para la navegación entre diferentes vistas.
- **Bootstrap 5**: Estilizado responsivo.

---

## 2. Funcionalidades Principales

### Sistema de Autenticación
- **Inicio de sesión**: Los usuarios pueden autenticarse ingresando sus credenciales.
- **Registro de nuevos usuarios**: Permite crear cuentas nuevas, ya sea como usuario regular o como administrador.
- **Autorización basada en roles**:
  - **Usuario regular**: Puede buscar libros y realizar reservas.
  - **Administrador**: Puede crear, actualizar y eliminar libros; gestionar devoluciones; y cambiar estados de copias.

### Funcionalidades para Administradores
- Crear nuevos libros y agregar información sobre:
- Título, autor, editorial, idioma, número de copias.
- Cambiar estados de las copias de libros (por ejemplo, disponible o prestado).
- Eliminar copias de libros de la base de datos.
- Registrar devoluciones de libros prestados.

### Funcionalidades para Usuarios
- Buscar libros por:
  - Título, autor, editorial, idioma.
- Reservar libros disponibles.

---

## 3. Instalación y Configuración

### Prerrequisitos
1. **Node.js** y **npm** instalados.
2. **MySQL** y **Workbench de MySQL** instalados.
3. **Bootstrap 5** y dependencias de React configuradas en el proyecto frontend.

### Instalación del Backend
1. Clonar el repositorio del backend.
2. Ejecutar `npm install` para instalar las dependencias.
3. Configurar las credenciales de MySQL en un archivo `.env`:
   ```
   DB_HOST=localhost
   DB_USER=tu_usuario
   DB_PASSWORD=tu_contraseña
   DB_NAME=biblioteca
   JWT_SECRET=clave_secreta
   ```
4. Ejecutar las migraciones de la base de datos (si aplica).
5. Iniciar el servidor con `npm start` o `node index.js`.

### Instalación del Frontend
1. Clonar el repositorio del frontend.
2. Ejecutar `npm install` para instalar las dependencias.
3. Iniciar la aplicación con `npm start`.

---

### 4. Estructura de carpetas

FRONT

biblioteca-front/
├── public/                   # Archivos estáticos
├── src/                      # Código fuente
│   ├── components/           # Componentes React
│   ├── Context/              # Contexto de usuario
│   ├── services/             # Llamadas a la API
│   ├── App.js                # Componente principal
│   ├── index.js              # Punto de entrada
│   └── ...
├── package.json              # Configuración de dependencias
└── vite.config.js            # Configuración de Vite


BACKEND

biblioteca-api/
├── node_modules/             # Dependencias de Node.js
├── controllers/              # Lógica de controladores
├── routes/                   # Rutas de la API
├── .env                      # Variables de entorno
├── index.js                  # Punto de entrada del servidor
├── package.json              # Configuración de dependencias
└── ...




## 5. Instrucciones de Uso

1. Iniciar sesión como **usuario** o **administrador**.
2. Navegar según las funcionalidades asignadas:
   - Usuarios: Buscar y reservar libros.
   - Administradores: Crear, modificar o eliminar libros y gestionar devoluciones.
3. Utilizar los filtros de búsqueda en la interfaz para encontrar libros específicos.


---

### 6. Como clonar el repositorio

6. Clonar el repositorio

Para clonar este repositorio en tu máquina local, sigue estos pasos:

A) Asegúrate de tener Git instalado en tu sistema.

B) Abre una terminal o línea de comandos.

C) Ejecuta el siguiente comando para clonar el repositorio:

git clone https://github.com/Andresville/Biblioteca.git

D) Navega al directorio clonado usando el comando:

cd Biblioteca

E) Si utilizas el Visual Studio Code puedes inicializarlo colocando el "code ." dentro de la carpeta en la que clonaste.

© 2024 Biblioteca Digital. Todos los derechos reservados.

