# Louis Calderon Landing (Astro + Tailwind)

Landing page profesional para la marca personal "Louis Calderon" - Trading algorítmico, señales y mentoría.

## 🚀 Características

- ✅ Diseño moderno y responsive (mobile-first)
- ✅ Optimizado para Core Web Vitals
- ✅ SEO on-page completo
- ✅ Menú móvil interactivo
- ✅ Secciones completas: Hero, Track Record, Servicios, Blog, FAQ, Contacto
- ✅ Componentes reutilizables (RiskNotice, ServiceCard)
- ✅ Animaciones y transiciones suaves
- ✅ Paleta de colores personalizada para trading/finanzas
- ✅ Lista para deploy en Vercel con CI/CD

## Requisitos
- Node.js 18+ (Vercel usa 18/20 por defecto)
- npm
## 📦 Instalación

```bash
npm install
```


## Scripts
- `npm run dev` – desarrollo
- `npm run build` – build de producción (salida en `dist`)
- `npm run preview` – servir el build
- `npm run lint` – `astro check`

## Estructura
- `src/pages/index.astro` – landing completa
- `src/components/RiskNotice.astro` – avisos de riesgo personalizables
- `src/components/ServiceCard.astro` – tarjetas de servicios
- `src/styles/global.css` – Tailwind base + tipografías
- `astro.config.mjs` – configuración Astro + Tailwind
- `tailwind.config.cjs` / `postcss.config.cjs`
## 🎨 Paleta de Colores

- **Primario**: `#1E3A8A` (azul confianza)
- **Secundario**: `#059669` (verde crecimiento)
- **Acento**: `#EA580C` (naranja advertencia/riesgo)
- **Fondo**: `#0B1224` (dark)
- **Neutrales**: Escala de grises

## 🔧 Personalización Requerida

### 1. Widget de Myfxbook
Busca el comentario `<!-- ZONA PARA WIDGET DE MYFXBOOK -->` en `index.astro` y pega tu código embebido.

### 2. Métricas de Trading
Actualiza los valores placeholders en la sección "Track Record":
- Win rate
- Profit factor
- Sharpe ratio

### 3. Disclaimers Legales
Busca `<!-- ZONA PARA DISCLAIMERS OFICIALES -->` y agrega tus textos legales como vendor de NinjaTrader.

### 4. Precios de Servicios
Actualiza los precios en las tarjetas de servicio (actualmente muestran "USD —").

### 5. Imagen Personal
Reemplaza el placeholder en la sección Hero con tu foto profesional.

### 6. URLs y Dominios
- Actualiza `url` en `index.astro` (línea ~9)
- Actualiza `site` en `astro.config.mjs`
- Actualiza enlaces de redes sociales en el footer

### 7. Contenido del Blog
Conecta tu CMS o actualiza los posts placeholder en la sección Blog.

### 8. Formulario de Contacto
Integra un servicio de formularios (Formspree, Netlify Forms, etc.) o un endpoint backend.


## Cómo levantar local
```bash
npm install
npm run dev
```
Abre [http://localhost:4321](http://localhost:4321)

## Despliegue en Vercel (CI/CD con GitHub)
1. Crea un repo en GitHub y apunta este proyecto como remoto:
   ```bash
   git init
   git add .
   git commit -m "feat: initial landing page"
   git branch -M main
   git remote add origin https://github.com/<usuario>/<repo>.git
   git push -u origin main
   ```
2. En Vercel: Add New Project → Importa desde GitHub ese repo.
3. Configuración:
   - Framework preset: Astro
   - Build command: `npm run build`
   - Output dir: `dist`
   - Node version: 18.x o 20.x
4. Cada push a `main` despliega a producción; PRs crean previsualizaciones.

## 📝 Secciones de la Landing Page

1. **Header/Navbar**: Navegación fija con menú móvil
2. **Hero**: Propuesta de valor principal con CTA
3. **Track Record**: Métricas verificadas y widget de Myfxbook
4. **Servicios**: 3 planes con pricing cards
5. **Sobre mí**: Historia personal y trayectoria
6. **Pilares/Filosofía**: 4 pilares del enfoque de trading
7. **Blog**: Grid de posts (placeholder para CMS)
8. **FAQ**: Preguntas frecuentes con acordeón
9. **Contacto**: Formulario y CTAs finales
10. **Footer**: Links legales, redes sociales, disclaimers

## ⚡ Performance

- Fuentes optimizadas con `preconnect`
- Imágenes lazy-load (cuando agregues imágenes reales)
- CSS crítico inline
- JavaScript mínimo y eficiente
- Score Lighthouse esperado: 90-100

## 🔒 Legal y Compliance

Asegúrate de incluir:
- Disclaimers de riesgo (trading)
- Términos y condiciones
- Política de privacidad
- Avisos regulatorios (CFTC, etc.)
- Disclaimers específicos de NinjaTrader vendor

## 🎯 Próximos Pasos

1. Personaliza todo el contenido placeholder
2. Agrega tu foto profesional
3. Integra Myfxbook widget
4. Configura el formulario de contacto
5. Conecta tu blog/CMS
6. Agrega tracking analytics (Google Analytics, Plausible, etc.)
7. Configura dominio personalizado en Vercel
8. Implementa sistema de pagos (Stripe/PayPal) cuando estés listo

## 📞 Soporte

Para preguntas sobre la implementación técnica, revisa la [documentación de Astro](https://docs.astro.build).

---

**Hecho con Astro + Tailwind CSS**
  ```json
  { "build": { "env": { "NODE_VERSION": "20" } } }
  ```

## Seguridad
`npm audit` reporta 3 vulnerabilidades (2 moderadas, 1 alta) en dependencias transitivas. Ejecuta `npm audit fix --force` bajo tu criterio para ver si hay actualizaciones compatibles.
