# AGENTS.md - Frontend Productify

> Ver también: [AGENTS.md raíz](../AGENTS.md) para config global, Engram y MCPs.

## Estructura de carpetas

```
frontend/
├── src/
│   ├── main.tsx              # Entry point - React + QueryClient + BrowserRouter
│   ├── App.tsx               # Routes definitions
│   ├── api/
│   │   └── api.ts            # Funciones API (getUser, getProducts, etc.)
│   ├── components/           # Componentes reutilizables
│   │   ├── Navbar.tsx       # Navigation bar + logout
│   │   ├── Logo.tsx         # Logo con Link
│   │   ├── ThemeSelector.tsx # Theme dropdown (daisyUI)
│   │   └── ErrorMessage.tsx # Error display
│   ├── views/               # Vistas/pages
│   │   ├── LoginView.tsx    # Login form
│   │   ├── RegisterView.tsx # Register form
│   │   ├── HomeView.tsx     # Lista productos
│   │   ├── ProductView.tsx  # Detalle producto
│   │   ├── CreateProductView.tsx # Crear producto
│   │   ├── EditProductView.tsx   # Editar producto
│   │   └── ProfileView.tsx  # Perfil usuario
│   ├── layouts/
│   │   └── AppLayout.tsx    # Layout con Navbar + Outlet
│   ├── hooks/
│   │   └── useUserSinc.ts   # Fetch user + sync con store
│   ├── store/
│   │   └── store.ts         # Zustand store (theme, user)
│   ├── config/
│   │   └── axios.ts         # Axios instance + interceptors (401 handler)
│   ├── constants/
│   │   └── index.ts         # THEMES array
│   ├── types/
│   │   └── index.ts         # TypeScript types
│   └── index.css            # Tailwind + daisyUI
├── vite.config.ts           # Vite config
├── tsconfig.json            # TypeScript config
├── package.json
└── eslint.config.js
```

## Comandos

```bash
pnpm dev          # Inicia Vite en localhost:5173
pnpm lint         # Ejecuta ESLint
pnpm typecheck    # Verifica tipos TypeScript
pnpm build        # Compila TypeScript + Vite
```

## Estado global (Zustand)

```ts
// store.ts
{
  theme: string,      // daisyUI theme (default: "forest")
  user: User,        // usuario actual (id, email, name, role, etc.)
  setTheme(theme),
  setUser(user),
  reset(),           // limpia todo (logout)
}
```

## Autenticación

- Token JWT se guarda en `localStorage.getItem("AUTH_TOKEN")`
- Axios interceptor añade el token a cada request
- Si 401 → limpia token + store → redirige a "/"
- `useUserSinc` solo hace fetch si existe token

## Stack

- React 19 + TypeScript
- Vite 7
- Tailwind CSS 4 + daisyUI 5
- Zustand (estado global)
- TanStack Query (server state)
- React Router 7
- Axios

---

## 🛠️ Skills del Proyecto

Skills específicas del proyecto (ubicadas en `.agents/skills/`):

| Skill | Trigger | Descripción |
|-------|---------|-------------|
| **vercel-react-best-practices** | Código React | 40+ reglas de performance (waterfalls, bundle size, re-renders, server-side) |
| **frontend-design** | Diseño UI/UX | Guías de diseño para componentes y layouts |

> Estas skills se cargan automáticamente según el contexto del código.