# GlucoAmigo

Demo web mobile-first de una app educativa para pacientes con diabetes. Frontend only, sin backend.

## Documentación

- [Prompt original](./docs/PROMPT-ORIGINAL.md)
- [Especificación y plan por etapas](./docs/SPEC.md)

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS v4

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). La UI está optimizada para móvil (max-width ~430px).

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run start` | Servidor de producción |
| `npm run lint` | ESLint |

## Deploy en Vercel

1. Sube el repo a GitHub (o conecta la carpeta en [vercel.com](https://vercel.com)).
2. Importa el proyecto — Vercel detecta Next.js automáticamente.
3. No requiere variables de entorno para esta demo.
4. Framework preset: **Next.js** (default).

## Rutas

| Ruta | Contenido |
|------|-----------|
| `/` | Inicio — dashboard, racha, resumen semanal |
| `/glucosa` | Registro + gráfica de glucosa |
| `/aprende` | Cápsulas educativas + objetivos |
| `/retos` | Quiz rápido + retos familiares |
| `/comida` | Sugerencias + arma tu plato |
| `/emociones` | Check-in emocional |

## Estado del proyecto

| Etapa | Estado |
|-------|--------|
| 0 — Bootstrap | ✅ |
| 1 — Inicio | ✅ |
| 2 — Glucosa | ✅ |
| 3 — Aprende | ✅ |
| 4 — Retos | ✅ |
| 5 — Comida + emociones | ✅ (sugerencias, plato 3 pasos, check-in, AMDNL) |
| 6 — Pulido | ✅ (shell móvil, microinteracciones, disclaimers) |
# GlucoAmigo
