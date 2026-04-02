window.CrumbleSeed = {
  config: {
    heroTitle: "Cookies frescas, visuales y listas para tu demo",
    heroText: "Un MVP local inspirado en Crumbl para explorar sabores semanales, armar pedidos y gestionar contenido sin backend.",
    heroButtonText: "Explorar menu",
    weeklyLabel: "Sabores de esta semana"
  },
  products: [
    { id: "prod-001", name: "Chocolate Chunk", category: "classic", price: 18, image: "chocolate-chunk.png", shortDescription: "Galleta clasica con trozos generosos de chocolate.", longDescription: "Una cookie tibia y suave con trozos de chocolate semi amargo y textura cremosa al centro.", weekly: false, featured: true, active: true },
    { id: "prod-002", name: "Strawberry Cream", category: "weekly", price: 22, image: "strawberry-cream.png", shortDescription: "Base de vainilla con crema batida y fresa.", longDescription: "Cookie suave con cobertura ligera, mermelada de fresa y acabado cremoso para destacar en el menu semanal.", weekly: true, featured: true, active: true },
    { id: "prod-003", name: "Carrot Cake Cookie", category: "premium", price: 24, image: "carrot-cake-cookie.png", shortDescription: "Inspirada en carrot cake con frosting delicado.", longDescription: "Una pieza premium con especias suaves, notas de zanahoria y topping cremoso para un perfil mas indulgente.", weekly: true, featured: true, active: true },
    { id: "prod-004", name: "Lemon Glaze", category: "weekly", price: 20, image: "lemon-glaze.png", shortDescription: "Cookie citrica con glaseado brillante.", longDescription: "Pensada para contrastar sabores intensos con un perfil fresco, ligero y muy visual.", weekly: true, featured: false, active: true },
    { id: "prod-005", name: "Brownie Batter", category: "classic", price: 19, image: "brownie-batter.png", shortDescription: "Intensa, densa y con centro de brownie.", longDescription: "Ideal para amantes del chocolate, con apariencia oscura y textura suave al partirla.", weekly: false, featured: false, active: true },
    { id: "prod-006", name: "Pink Velvet Milkshake", category: "drink", price: 15, image: "pink-velvet-milkshake.png", shortDescription: "Bebida fria para complementar la caja.", longDescription: "Un agregado sencillo para diversificar el menu y probar una categoria secundaria en el MVP.", weekly: false, featured: false, active: true }
  ],
  locations: [
    { id: "store-001", name: "Sucursal Centro", city: "La Paz", address: "Av. Camacho 120", phone: "2212345", hours: "09:00 - 21:00", mapUrl: "https://maps.google.com/" },
    { id: "store-002", name: "Sucursal Sur", city: "La Paz", address: "Calacoto, Calle 15", phone: "2789012", hours: "10:00 - 22:00", mapUrl: "https://maps.google.com/" },
    { id: "store-003", name: "Sucursal Miraflores", city: "La Paz", address: "Av. Busch 88", phone: "2233445", hours: "08:30 - 20:30", mapUrl: "https://maps.google.com/" }
  ]
};
