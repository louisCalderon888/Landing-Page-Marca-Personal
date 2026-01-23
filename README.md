# Louis Calderon Landing (Astro + Tailwind)

Landing page para la marca personal "Louis Calderon" (trading algorítmico, señales, mentoría) lista para deploy en Vercel con CI/CD desde GitHub.

## Requisitos
- Node.js 18+ (Vercel usa 18/20 por defecto)
- npm

## Scripts
- `npm run dev` – desarrollo
- `npm run build` – build de producción (salida en `dist`)
- `npm run preview` – servir el build
- `npm run lint` – `astro check`

## Estructura
- `src/pages/index.astro` – landing completa
- `src/components/RiskNotice.astro` – componente reutilizable de aviso de riesgo
- `src/styles/global.css` – Tailwind base + tipografías
- `astro.config.mjs` – configuración Astro + Tailwind
- `tailwind.config.cjs` / `postcss.config.cjs`

## Cómo levantar local
```bash
npm install
npm run dev
```

## Despliegue en Vercel (CI/CD con GitHub)
1. Crea un repo en GitHub y apunta este proyecto como remoto:
   ```bash
   git init
   git add .
   git commit -m "chore: init landing astro"
   git branch -M main
   git remote add origin https://github.com/<usuario>/<repo>.git
   git push -u origin main
   ```
2. En Vercel: Add New Project → Importa desde GitHub ese repo.
3. Configuración:
   - Framework preset: Astro
   - Build command: `npm run build`
   - Output dir: `dist`
   - Node version: 18 o 20 (opcional via `vercel.json`)
4. Cada push a `main` despliega a producción; PRs crean previsualizaciones.

## Notas
- Coloca tu dominio real en `astro.config.mjs` (`site`) y en los metadatos de `index.astro`.
- Pega el widget de Myfxbook y los disclaimers legales en las zonas comentadas en `index.astro`.
- Ajusta precios, métricas y FAQ placeholders.
- Si quieres forzar Node 20 en Vercel, crea `vercel.json`:
  ```json
  { "build": { "env": { "NODE_VERSION": "20" } } }
  ```

## Seguridad
`npm audit` reporta 3 vulnerabilidades (2 moderadas, 1 alta) en dependencias transitivas. Ejecuta `npm audit fix --force` bajo tu criterio para ver si hay actualizaciones compatibles.
