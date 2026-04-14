# AGENTS.md - Productify

Monorepo con backend (Express/TypeScript/Drizzle) y frontend (React/Vite/Tailwind/TypeScript).

---

## 🔧 Ejecutar el proyecto

### Backend
```bash
cd backend
pnpm install
pnpm dev          # localhost:3000
pnpm db:push     # sincroniza schema PostgreSQL
```

### Frontend
```bash
cd frontend
pnpm install
pnpm dev          # localhost:5173
pnpm lint         # ESLint
pnpm typecheck    # TypeScript
pnpm build        # Compila
```

---

## 🏗️ Stack principal

| Capa | Backend | Frontend |
|------|---------|----------|
| Runtime | Express 5 | React 19 + Vite 7 |
| ORM/State | Drizzle ORM | Zustand |
| Query | — | TanStack Query |
| Auth | JWT + bcrypt | localStorage + axios interceptor |
| Styling | — | Tailwind CSS 4 + daisyUI 5 |
| Router | — | React Router 7 |
| Language | TypeScript | TypeScript |

---

## 📁 AGENTS.md Modulares

Para detalles específicos de cada parte del monorepo:

| Archivo | Descripción |
|---------|-------------|
| [`backend/AGENTS.md`](backend/AGENTS.md) | Estructura detallada del backend, endpoints, config |
| [`frontend/AGENTS.md`](frontend/AGENTS.md) | Estructura detallada del frontend, componentes, estado |

> Estos archivos contienen información más detallada sobre cada módulo.

---

## 📁 Estructura clave

### Backend (`backend/src/`)
```
├── index.ts              # Entry point Express
├── config/              # env.ts, cors.ts
├── controllers/         # auth, user, product, comment
├── routes/              # definición rutas REST
├── middleware/          # auth.ts (JWT), validation.ts
├── db/                  # schema.ts, queries.ts, index.ts
└── utils/               # jwt.ts, uuid.ts, auth.ts
```

### Frontend (`frontend/src/`)
```
├── main.tsx             # Entry point + QueryClient + Router
├── App.tsx              # Routes definition
├── api/api.ts           # Funciones API (axios)
├── components/          # Navbar, Logo, ThemeSelector, ErrorMessage
├── views/               # Login, Register, Home, Product, Profile, Create, Edit
├── layouts/AppLayout.tsx
├── hooks/useUserSinc.ts # Fetch user + sync store
├── store/store.ts       # Zustand (theme, user)
├── config/axios.ts      # Interceptors (401 handler)
├── constants/           # THEMES array
└── types/               # TypeScript types
```

---

## 🔐 Autenticación

- **Token**: `localStorage.getItem("AUTH_TOKEN")`
- **Interceptor axios**: añade `Authorization: Bearer <token>` a cada request
- **401 handler**: limpia token + store → redirige a "/"
- **Logout**: limpia token + store → redirige a "/"

---

## 🧠 Engram - Gestión de Contexto

Engram es la memoria persistente del proyecto. Se guarda automáticamente:

### Cuándo guardar (PROACTIVE)
- Decisiones de arquitectura
- Bugs corregidos (incluir root cause)
- Patrones establecidos (naming, estructura)
- Descubrimientos no obvios del codebase
- Preferencias del usuario aprendidas

### Cómo usar
```typescript
// Guardar algo importante
engram_mem_save({
  title: "Breve descripción",
  type: "bugfix | decision | architecture | discovery | pattern",
  content: "**What**: ...\n**Why**: ...\n**Where**: ...\n**Learned**: ...",
  project: "productify"
})

// Buscar contexto previo
engram_mem_search({ query: "keywords", project: "productify" })

// Recuperar sesión anterior
engram_mem_context({ project: "productify" })
```

### Sesión close (OBLIGATORIO)
Antes de terminar, llamar:
```typescript
engram_mem_session_summary({
  content: "## Goal\n...\n## Instructions\n...\n## Discoveries\n...\n## Accomplished\n...\n## Next Steps\n...\n## Relevant Files\n...",
  project: "productify"
})
```

---

## 🔌 MCPs disponibles

| MCP | Tipo | Función |
|-----|------|---------|
| **context7** | remote | Documentación de librerías (busca en docs oficiales) |
| **engram** | local | Memoria persistente |

### Context7 usage
```typescript
// Antes de consultar docs de una librería:
context7_resolve_library_id({ libraryName: "react", query: "useState" })
context7_query_docs({ libraryId: "/facebook/react", query: "how to use useState" })
```

---

## 🛠️ Skills SDD (Spec-Driven Development)

Skills cargados automáticamente según el contexto:

| Skill | Trigger | Descripción |
|-------|---------|-------------|
| **sdd-propose** | Crear proposal | Crear cambio desde exploración |
| **sdd-spec** | Escribir specs | Escribir especificaciones detalladas |
| **sdd-design** | Diseño técnico | Crear documento de arquitectura |
| **sdd-tasks** | Dividir tareas | Crear checklist de implementación |
| **sdd-apply** | Implementar | Escribir código desde tareas |
| **sdd-verify** | Verificar | Validar contra specs |
| **sdd-archive** | Archivar | Sincronizar specs y archivar |
| **sdd-init** | Iniciar SDD | Bootstrapping de contexto SDD |
| **sdd-onboard** | Onboarding | Walkthrough completo SDD |
| **sdd-explore** | Explorar | Investigar codebase |

### Workflow SDD
```
sdd-init → sdd-explore → sdd-propose → sdd-spec → sdd-design → sdd-tasks → sdd-apply → sdd-verify → sdd-archive
```

---

## 📋 Workflow común

1. **Backend**: modificar schema → `pnpm db:push`
2. **Frontend**: cambios en `src/views/` o `src/components/`
3. **Pre-commit**: `pnpm lint` y `pnpm typecheck`
4. **Errores 401**: el interceptor ya maneja token expirado automáticamente