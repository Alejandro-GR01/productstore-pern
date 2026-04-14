# AGENTS.md - Productify

Monorepo con backend (Express/TypeScript/Drizzle) y frontend (React/Vite/Tailwind).

## Ejecutar el proyecto

### Backend
```bash
cd backend
pnpm install
pnpm dev          # inicia servidor en localhost:3000
pnpm db:push     # sincroniza schema con PostgreSQL
```

### Frontend
```bash
cd frontend
pnpm install
pnpm dev          # inicia Vite en localhost:5173
pnpm lint         # ejecuta ESLint
pnpm typecheck    # verifica tipos TypeScript
pnpm build        # compila TypeScript + Vite
```

## Stack principal

- **Backend**: Express 5, Drizzle ORM, PostgreSQL, JWT + bcrypt
- **Frontend**: React 19 + TypeScript, Vite 7, Tailwind CSS 4, Zustand, TanStack Query, React Router 7, daisyUI

## Estructura clave

- `backend/src/index.ts` — punto de entrada del API
- `backend/src/db/schema.ts` — definición de entidades (users, products, comments)
- `frontend/src/main.tsx` — punto de entrada React con QueryClient y BrowserRouter
- `frontend/src/store/store.ts` — Zustand store para estado global

## Workflow común

1. Backend: modificar schema en `src/db/schema.ts` → `pnpm db:push`
2. Frontend: cambios en componentes dentro `src/views/` o `src/components/`
3. Ejecutar `pnpm lint` antes de commit en frontend