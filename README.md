# Link Youtube

Presentación del core:
https://www.youtube.com/watch?v=uOphTIbTB5Y

Defensa del core: https:
//www.youtube.com/watch?v=5Lu2vP8Q-yE


# Sistema de Administración de Eventos

En el inicio de este proyecto se realiza el sistema de administración de eventos que permite a los administradores gestionar eventos y usuarios de manera eficiente. Utilizando el stack MERN (MongoDB, Express.js, React.js, Node.js), este sistema proporciona una interfaz amigable para realizar operaciones como la creación, actualización y eliminación de eventos, así como la gestión de usuarios registrados.

---

## Características Principales

- **Lista de Eventos:** Visualiza todos los eventos registrados.
- **Creación de Eventos:** Añade nuevos eventos al sistema.
- **Actualización de Eventos:** Modifica la información de eventos existentes.
- **Eliminación de Eventos:** Elimina eventos que ya no son necesarios.
- **Lista de Usuarios:** Explora la lista de usuarios registrados.
- **Edición y Eliminación de Usuarios:** Gestiona la información de los usuarios, incluida la capacidad de editar y eliminar perfiles.

---

## Tecnologías Utilizadas

- **MongoDB:** Base de datos no relacional para almacenar datos.
- **Express.js:** Framework para construir la capa del servidor.
- **React.js:** Biblioteca de interfaz de usuario para construir interfaces interactivas.
- **Node.js:** Entorno de ejecución para JavaScript en el lado del servidor.

---

## Instrucciones de Configuración

1. **Ejecutar proyecto**
   npm run server
2. **Instalación de dependencias**
   - cd frontend 
   npm install
   - cd backend
   npm install

# Diseño de ingeniería Admin
![image](https://github.com/ThyaraV/AdministracionMVC/assets/96449161/48ecece6-ed97-4646-8a05-5972ab247e31)
![image](https://github.com/ThyaraV/AdministracionMVC/assets/96449161/040a79da-713a-4643-80e4-8142286f1ec0)

## Módulo de Administrador

En el centro del sistema se encuentra el "Admin Module", que concentra las funcionalidades específicas para el administrador. Este módulo incluye los siguientes componentes clave:

1. **Admin:** La clase principal que abarca todas las operaciones que el administrador puede realizar, como la gestión de eventos y usuarios.

2. **ProductController y UserController:** Actúan como intermediarios entre el frontend y el backend para la gestión de productos y usuarios. El "Admin" interactúa con estos controladores para realizar operaciones específicas.

3. **AuthMiddleware:** Maneja la autenticación, asegurando que solo los administradores autenticados tengan acceso a las funciones administrativas. Se relaciona con tanto UserController como ProductController para garantizar la seguridad de las operaciones.

## Backend

En la sección de Backend, se encuentran los componentes responsables de la lógica del servidor:

1. **ProductModel y UserModel:** Estos modelos representan la estructura de datos para productos y usuarios en la base de datos. El ProductController y UserController interactúan con estos modelos para realizar operaciones CRUD.

2. **ProductRoutes y UserRoutes:** Definen las rutas específicas para las operaciones relacionadas con productos y usuarios. Son utilizados por el Server.js para enrutar las solicitudes HTTP entrantes a los controladores correspondientes.

3. **Server.js:** El punto de entrada del servidor que utiliza las rutas definidas para manejar las solicitudes HTTP. Se comunica con los controladores y, por ende, con el Admin Module.

## Frontend

En la sección de Frontend, encontramos los componentes y pantallas que forman la interfaz de usuario:

1. **Pantallas (Screens):** Representan las diferentes páginas de la aplicación, como Home, Login, Product, Profile, Register, ProductEdit, UserEdit, UserList y ProductList. El administrador puede navegar entre estas pantallas según sea necesario.

2. **Componentes (Components):** Elementos reutilizables que componen las pantallas y otros componentes. Componentes específicos para el administrador incluyen AdminRoute, que garantiza que solo los administradores accedan a ciertas áreas, y otros como Footer, Header, PrivateRouter, Product, Loader, Message y Rating, que proporcionan funcionalidades y estilos comunes.

3. **Slices:** Representan partes del estado de la aplicación gestionadas mediante Redux. Incluyen ApiSlice, AuthSlice, ProductApiSlice y UsersApiSlice, que gestionan el estado relacionado con la API, la autenticación, y la gestión de productos y usuarios.

## Interacciones

Las flechas entre los componentes indican las interacciones y dependencias entre ellos. Por ejemplo, el Admin interactúa con el UserController y el ProductController para gestionar usuarios y productos. El AuthMiddleware garantiza que estas operaciones solo sean realizadas por administradores autenticados.

En resumen, el diagrama representa cómo el administrador interactúa con las diversas capas de la aplicación, desde la interfaz de usuario hasta la lógica del servidor y la base de datos, para gestionar eventos y usuarios de manera eficiente.

## Diagrama de actividades del core
![image](https://github.com/ThyaraV/AdministracionMVC/assets/96449161/dcdc1b4d-2d9f-4c2e-a083-36cdf1972308)

El diagrama de actividades ilustra el flujo de procesos del controlador de recomendaciones en tu aplicación. Comienza con la recepción de una solicitud HTTP y la extracción del ID de usuario de la solicitud. Luego, inicializa varias estructuras de datos. El flujo se divide en paralelo para realizar múltiples tareas: obtener pedidos del usuario, tipos de proveedores, productos en categorías que le gustaron y calificaciones de proveedores. Después de estas tareas, el sistema analiza los pedidos para identificar categorías preferidas, filtra los productos en función de sus calificaciones y agrega las calificaciones de los proveedores. Finalmente, el controlador prepara las recomendaciones y envía una respuesta en formato JSON. Este flujo destaca cómo se manejan múltiples aspectos de la generación de recomendaciones en tu sistema.

## Diagrama de actividades de la defensa 
![image](https://github.com/ThyaraV/AdministracionMVC/assets/96449161/06e80fa2-3293-4acc-8f8e-1daae4e62b9a)

El diagrama de actividades representa el flujo de procesos para la gestión de pedidos en tu sistema. Comienza con la recepción de una solicitud de pedido, seguida de su validación. Si la solicitud es válida, el flujo se divide en varias ramas paralelas para manejar diferentes funciones: procesar un nuevo pedido y responder con los detalles del pedido o un error; obtener un pedido por ID y responder con los detalles del pedido o un error si no se encuentra; obtener los pedidos de un usuario y responder con ellos; actualizar un pedido a pagado y responder con los detalles actualizados o un error de actualización; actualizar un pedido a entregado y responder con la confirmación de la entrega o un error; obtener todos los pedidos y responder con ellos; analizar las preferencias del usuario y responder con ellas; obtener proveedores con las mejores calificaciones y responder con ellos; obtener los proveedores más vendidos y responder con los datos de ventas; y obtener los mejores proveedores en un rango específico, respondiendo con los datos del rango de proveedores. Si la solicitud inicial no es válida, el sistema responde con un error de solicitud inválida. Este diagrama destaca cómo se manejan diversas operaciones relacionadas con los pedidos en el sistema.

# Link del deploy
https://core-plpd.onrender.com

User: admin@email.com

Password: 123456

