# Plan de Implementacion MVP - Sitio tipo Crumbl Cookies

## 1. Objetivo

Construir un MVP local inspirado en la experiencia de un sitio como Crumbl Cookies, enfocado en:

- exhibir productos de forma visual y atractiva,
- destacar sabores semanales,
- permitir armar un carrito,
- simular un checkout local,
- administrar contenido basico desde una vista interna,
- persistir datos unicamente con `localStorage`.

El proyecto se desarrollara con:

- `HTML`
- `CSS`
- `JavaScript`
- `jQuery`
- `Bootstrap`
- `localStorage` como mecanismo de persistencia

No se usara backend ni base de datos.

## 2. Referencia funcional tomada de Crumbl

Tomando como referencia la pagina oficial de Crumbl (`https://crumblcookies.com/`), el MVP debe capturar estas ideas:

- portada visual con productos destacados,
- seccion de sabores semanales,
- seccion de sabores clasicos,
- fichas de producto con imagen, nombre, descripcion y CTA,
- flujo simple para seleccionar productos y agregarlos al carrito,
- ubicaciones o puntos de venta mostrados de forma simple,
- tono visual limpio, comercial y centrado en fotografia de producto.

No es necesario replicar todas las funciones reales del sitio. El MVP debe enfocarse en una version local, navegable y demostrable.

## 3. Alcance del MVP

### Incluye

- Home comercial
- Catalogo de productos
- Detalle rapido de producto en modal
- Carrito persistente en `localStorage`
- Checkout simulado
- Vista de ubicaciones
- Panel admin local basico para editar catalogo, sabores destacados y sucursales

### No incluye

- pagos reales
- autenticacion real
- backend
- integracion con APIs externas
- base de datos
- geolocalizacion real
- panel multiusuario

## 4. Perfiles de uso

### Cliente

Puede:

- navegar por el home,
- ver sabores semanales y clasicos,
- revisar detalles de productos,
- agregar o quitar items del carrito,
- completar una compra simulada,
- consultar ubicaciones.

### Administrador local

Puede:

- crear, editar y eliminar productos,
- marcar productos como semanales o clasicos,
- actualizar banners destacados,
- administrar ubicaciones,
- revisar pedidos guardados localmente.

Nota: para el MVP, el acceso admin puede ser solo una ruta o pagina separada, sin login real.

## 5. Modulos funcionales

### 5.1 Home

Contenido sugerido:

- hero principal con llamada a la accion,
- bloque de "Sabores de esta semana",
- bloque de "Clasicos",
- bloque de beneficios o propuesta de valor,
- resumen de ubicaciones,
- footer con enlaces basicos.

### 5.2 Catalogo

Funciones:

- listar productos en cards,
- filtrar por categoria: semanal, clasico, premium, bebida,
- buscar por nombre,
- abrir modal de detalle,
- agregar al carrito.

### 5.3 Carrito

Funciones:

- ver items agregados,
- cambiar cantidad,
- eliminar items,
- calcular subtotal y total,
- persistir estado aunque se recargue la pagina.

### 5.4 Checkout local

Formulario simple con:

- nombre,
- telefono,
- direccion o sucursal,
- metodo de entrega: retiro o delivery,
- observaciones.

Al confirmar:

- guardar el pedido en `localStorage`,
- mostrar mensaje de exito,
- limpiar carrito.

### 5.5 Ubicaciones

Funciones:

- mostrar lista de sucursales,
- datos: ciudad, direccion, horario, telefono,
- opcion de "ver mapa" como enlace externo opcional.

### 5.6 Admin local

Secciones:

- gestion de productos,
- gestion de destacados,
- gestion de ubicaciones,
- listado de pedidos simulados.

## 6. Estructura de paginas sugerida

```text
/index.html                -> Home
/pages/menu.html           -> Catalogo
/pages/locations.html      -> Ubicaciones
/pages/cart.html           -> Carrito / checkout
/pages/admin.html          -> Panel local de administracion
```

## 7. Estructura tecnica sugerida

```text
/assets
  /css
    styles.css
    home.css
    admin.css
  /js
    app.js
    storage.js
    products.js
    cart.js
    checkout.js
    admin.js
    ui.js
  /data
    seed.js
  /img
    ...
/pages
  menu.html
  locations.html
  cart.html
  admin.html
/DOCS
  plan-implementacion-mvp-crumbl-local.md
/index.html
```

## 8. Modelo de datos en localStorage

Se recomienda usar claves separadas para facilitar mantenimiento.

### 8.1 Productos

Clave:

```js
localStorage["cc_products"]
```

Estructura:

```js
[
  {
    id: "prod-001",
    name: "Chocolate Chunk",
    category: "classic",
    price: 18,
    image: "assets/img/chocolate-chunk.jpg",
    shortDescription: "Galleta clasica con trozos de chocolate.",
    longDescription: "Descripcion ampliada del producto.",
    weekly: false,
    featured: true,
    active: true
  }
]
```

### 8.2 Carrito

Clave:

```js
localStorage["cc_cart"]
```

Estructura:

```js
[
  {
    productId: "prod-001",
    quantity: 2,
    unitPrice: 18
  }
]
```

### 8.3 Pedidos

Clave:

```js
localStorage["cc_orders"]
```

Estructura:

```js
[
  {
    id: "order-001",
    customerName: "Ana Perez",
    phone: "70000000",
    deliveryType: "pickup",
    address: "",
    storeId: "store-001",
    notes: "Sin contacto",
    items: [],
    subtotal: 36,
    total: 36,
    createdAt: "2026-04-02T10:30:00"
  }
]
```

### 8.4 Ubicaciones

Clave:

```js
localStorage["cc_locations"]
```

Estructura:

```js
[
  {
    id: "store-001",
    name: "Crumble Local Centro",
    city: "La Paz",
    address: "Av. Principal 123",
    phone: "2212345",
    hours: "09:00 - 21:00",
    mapUrl: "https://maps.google.com/"
  }
]
```

### 8.5 Configuracion del sitio

Clave:

```js
localStorage["cc_site_config"]
```

Estructura:

```js
{
  heroTitle: "Fresh cookies every week",
  heroText: "Descubre sabores unicos y arma tu caja favorita.",
  heroButtonText: "Ordena ahora",
  weeklyLabel: "Sabores de esta semana"
}
```

## 9. Inicializacion del sistema

Al cargar por primera vez:

- verificar si existen las claves en `localStorage`,
- si no existen, cargar datos semilla desde `seed.js`,
- almacenar productos, ubicaciones y configuracion inicial,
- dejar el carrito vacio.

Esto permite que el sistema funcione completamente offline y pueda reiniciarse facilmente.

## 10. Componentes UI necesarios

### Publicos

- navbar responsive
- hero banner
- cards de producto
- badges para "Weekly" o "Classic"
- modal de detalle
- offcanvas o tabla de carrito
- formulario de checkout
- cards de sucursales
- alerts y toasts de Bootstrap

### Administracion

- tabla editable de productos
- formulario CRUD de producto
- formulario CRUD de ubicaciones
- tabla de pedidos
- panel de resumen con metricas simples

## 11. Reglas de negocio del MVP

- un producto puede ser semanal, clasico o ambas cosas segun necesidad visual del MVP,
- solo se muestran productos `active: true`,
- el carrito no permite cantidades menores a 1,
- si el producto ya existe en carrito, se incrementa cantidad,
- al confirmar compra se genera un ID local,
- los pedidos quedan guardados para consulta en admin,
- el checkout no procesa pago, solo registra el pedido.

## 12. Flujo principal del usuario

1. El usuario entra al home.
2. Ve sabores destacados y navega al catalogo.
3. Consulta un producto en modal.
4. Agrega productos al carrito.
5. Revisa el carrito.
6. Completa formulario de checkout.
7. El sistema guarda el pedido en `localStorage`.
8. Se muestra confirmacion de compra simulada.

## 13. Flujo principal del administrador

1. El administrador entra a `admin.html`.
2. Visualiza productos y pedidos.
3. Edita o crea productos.
4. Marca productos como destacados o semanales.
5. Actualiza ubicaciones.
6. Los cambios se reflejan inmediatamente en las vistas publicas porque todo se lee desde `localStorage`.

## 14. Plan de implementacion por fases

### Fase 1 - Base del proyecto

Objetivo:
dejar estructura navegable y persistencia inicial.

Tareas:

- crear estructura de carpetas,
- integrar Bootstrap y jQuery,
- crear layout base reutilizable,
- definir `storage.js` con helpers de lectura y escritura,
- crear `seed.js` con datos de prueba,
- inicializar `localStorage` al cargar la app.

Entregable:

- proyecto navegable con datos semilla cargados.

### Fase 2 - Home y catalogo

Objetivo:
mostrar contenido comercial y productos.

Tareas:

- construir home con hero y secciones,
- renderizar sabores semanales,
- renderizar clasicos,
- crear pagina de menu/catalogo,
- implementar filtros y busqueda,
- crear modal de detalle de producto.

Entregable:

- home funcional y catalogo renderizado desde `localStorage`.

### Fase 3 - Carrito y checkout

Objetivo:
habilitar la compra simulada.

Tareas:

- implementar agregar al carrito,
- mostrar resumen de carrito,
- actualizar cantidades y eliminar items,
- calcular totales,
- construir formulario checkout,
- guardar pedidos en `localStorage`.

Entregable:

- flujo completo de pedido local sin backend.

### Fase 4 - Ubicaciones

Objetivo:
mostrar puntos de venta o retiro.

Tareas:

- construir pagina de ubicaciones,
- renderizar cards o tabla de sucursales,
- permitir seleccionar sucursal desde checkout.

Entregable:

- modulo de ubicaciones conectado al checkout.

### Fase 5 - Admin local

Objetivo:
administrar contenido del MVP.

Tareas:

- crear CRUD de productos,
- crear CRUD de ubicaciones,
- editar textos del home,
- listar pedidos realizados,
- agregar botones de reset de datos semilla.

Entregable:

- panel local funcional para demostracion del MVP.

### Fase 6 - Pulido visual y QA

Objetivo:
mejorar experiencia y estabilidad.

Tareas:

- ajustar responsive,
- validar formularios,
- mejorar feedback visual con alerts/toasts,
- revisar consistencia del `localStorage`,
- probar flujos completos,
- corregir errores de navegacion y persistencia.

Entregable:

- MVP presentable y estable para demo academica o prototipo funcional.

## 15. Recomendaciones de estilo visual

Para transmitir una experiencia tipo Crumbl:

- usar fotografias grandes de producto,
- paleta clara con acentos suaves y comerciales,
- tipografia moderna y amigable,
- cards limpias con foco en imagen,
- secciones amplias y respiradas,
- botones CTA visibles,
- badges para destacar sabores limitados.

Bootstrap puede encargarse de la grilla y componentes base, mientras `styles.css` define la identidad visual propia.

## 16. Riesgos y limites del enfoque local

- `localStorage` depende del navegador y del dispositivo,
- los datos pueden borrarse manualmente,
- no existe sincronizacion entre equipos,
- no hay seguridad real para admin,
- no sirve para produccion real,
- el volumen de datos debe mantenerse pequeno.

Para un MVP academico o demo local, este enfoque es suficiente.

## 17. Criterios de aceptacion del MVP

El MVP se considera completo si:

- el sitio abre localmente sin servidor backend,
- existen datos iniciales cargados automaticamente,
- el home muestra sabores destacados y clasicos,
- el catalogo permite buscar y filtrar,
- se puede agregar productos al carrito,
- el carrito persiste al recargar,
- el checkout guarda pedidos,
- las ubicaciones se muestran correctamente,
- el admin puede editar productos y ubicaciones,
- los cambios persisten en `localStorage`.

## 18. Siguiente paso recomendado

El siguiente paso ideal es crear una segunda documentacion breve en `DOCS` con:

- mapa de pantallas,
- wireframes simples,
- lista de componentes,
- backlog tecnico por archivo.

Eso permitiria pasar del plan a la construccion del proyecto de forma ordenada.
