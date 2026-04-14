# AGENTS.md - Backend Productify

> Ver también: [AGENTS.md raíz](../AGENTS.md) para config global, Engram y MCPs.

## Estructura de carpetas

```
backend/
├── src/
│   ├── index.ts              # Entry point - Express app
│   ├── config/
│   │   ├── env.ts            # Variables de entorno
│   │   └── cors.ts           # Configuración CORS
│   ├── controllers/          # Lógica de negocio
│   │   ├── authController.ts # Login/Register
│   │   ├── userController.ts # CRUD users
│   │   ├── productController.ts # CRUD products
│   │   └── commentController.ts # CRUD comments
│   ├── routes/               # Definición de rutas
│   │   ├── authRoutes.ts
│   │   ├── userRoutes.ts
│   │   ├── productRoutes.ts
│   │   └── commentRoutes.ts
│   ├── middleware/           # Middleware Express
│   │   ├── auth.ts           # JWT validation
│   │   └── validation.ts     # express-validator
│   ├── db/                   # Drizzle ORM
│   │   ├── schema.ts         # Entidades (users, products, comments)
│   │   ├── index.ts         # DB connection
│   │   └── queries.ts       # Queries personalizadas
│   └── utils/                # Utilidades
│       ├── jwt.ts           # JWT helpers
│       ├── uuid.ts          # UUID helpers
│       └── auth.ts          # Auth helpers (bcrypt)
├── drizzle.config.ts        # Drizzle Kit config
├── package.json
└── tsconfig.json
```

## Comandos

```bash
pnpm dev        # Inicia servidor en localhost:3000
pnpm db:push    # Sincroniza schema con PostgreSQL
pnpm build      # Compila TypeScript
```

## API Endpoints

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| POST | /auth/login | Login usuario | No |
| POST | /auth/register | Registro usuario | No |
| GET | /api/users/my | Datos usuario actual | Sí |
| GET | /api/products | Listar todos productos | No |
| GET | /api/products/my | Productos del usuario | Sí |
| GET | /api/products/:id | Detalle producto | No |
| POST | /api/products | Crear producto | Sí |
| PUT | /api/products/:id | Editar producto | Sí |
| DELETE | /api/products/:id | Eliminar producto | Sí |
| POST | /api/comments/:productId | Crear comentario | Sí |
| DELETE | /api/comments/:commentId | Eliminar comentario | Sí |

## Notas técnicas

- UUIDs como IDs (no seriales)
- Relaciones: users → products → comments
- JWT en header `Authorization: Bearer <token>`
- Password hasheado con bcrypt