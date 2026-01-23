# Guía de Personalización - Louis Calderon Landing Page

Esta guía te ayudará a personalizar todos los elementos de tu landing page para que esté lista para producción.

## 📋 Checklist de Personalización

### ✅ 1. Contenido y Metadatos

#### index.astro (líneas 6-10)
```astro
const description = "Tu descripción personalizada aquí";
const url = "https://tudominio.com"; // Reemplaza con tu dominio real
const ogImage = "https://tudominio.com/og-image.jpg"; // Tu imagen Open Graph
```

#### Instagram y Redes Sociales
- **Línea ~52**: Actualiza el enlace de Instagram en el schema.org
- **Footer**: Actualiza todos los enlaces de redes sociales

### ✅ 2. Widget de Myfxbook

**Ubicación**: Busca `<!-- ZONA PARA WIDGET DE MYFXBOOK -->`

Reemplaza el div placeholder con tu código embebido de Myfxbook:

```html
<!-- Ejemplo de código Myfxbook -->
<script type="text/javascript" src="https://widgets.myfxbook.com/scripts/fxOutlook.js"></script>
<iframe src="https://www.myfxbook.com/members/..." width="100%" height="400" frameborder="0"></iframe>
```

### ✅ 3. Métricas de Trading

**Ubicación**: Sección "Track Record" - métricas con valor "—"

Actualiza estos valores con tus datos reales:
- **Win rate**: Porcentaje de operaciones ganadoras
- **Profit factor**: Ratio de ganancias/pérdidas
- **Sharpe ratio**: Medida de rendimiento ajustado al riesgo

Ejemplo:
```astro
<dd class="text-2xl font-bold text-white mt-1">58%</dd> <!-- Win rate -->
```

### ✅ 4. Precios de Servicios

**Ubicación**: Sección "Servicios" - tres tarjetas de precios

Actualmente muestra "USD —". Actualiza con tus precios reales:

```astro
<div class="text-3xl font-bold text-white">USD 99<span class="text-base font-medium text-slate-300"> / mes</span></div>
```

### ✅ 5. Foto Profesional

**Ubicación**: Sección Hero - placeholder con emoji 📊

Opciones para reemplazar:
1. Usa una imagen local en `public/`:
   ```astro
   <img src="/foto-louis.jpg" alt="Louis Calderon" class="w-full h-full object-cover rounded-xl" />
   ```

2. Usa un servicio externo (Cloudinary, Imgix):
   ```astro
   <img src="https://tu-cdn.com/foto-louis.jpg" alt="Louis Calderon" class="w-full h-full object-cover rounded-xl" />
   ```

**Recomendación**: Imagen de alta calidad, aspecto 3:4, formato WebP para mejor rendimiento.

### ✅ 6. Historia Personal

**Ubicación**: Sección "Sobre mí"

Reemplaza el texto de ejemplo con tu historia real:

```astro
<div>
  <h3 class="text-lg font-semibold text-white">El comienzo</h3>
  <p>TU HISTORIA REAL AQUÍ...</p>
</div>
```

Cuenta tu trayectoria de manera auténtica, manteniendo el tono directo y técnico.

### ✅ 7. Disclaimers Legales

**Ubicación principal**: Footer - busca `<!-- ZONA PARA DISCLAIMERS OFICIALES -->`

**Ubicaciones adicionales**:
- Sección Track Record
- Sección Servicios (en RiskNotice)
- Formulario de contacto

**Ejemplo de disclaimer para NinjaTrader Vendor**:

```html
<p class="text-xs text-slate-400">
  HYPOTHETICAL OR SIMULATED PERFORMANCE RESULTS HAVE CERTAIN INHERENT LIMITATIONS. 
  UNLIKE AN ACTUAL PERFORMANCE RECORD, SIMULATED RESULTS DO NOT REPRESENT ACTUAL TRADING. 
  ALSO, SINCE THE TRADES HAVE NOT ACTUALLY BEEN EXECUTED, THE RESULTS MAY HAVE UNDER- OR 
  OVER-COMPENSATED FOR THE IMPACT, IF ANY, OF CERTAIN MARKET FACTORS...
  [Incluye todo el disclaimer requerido por NinjaTrader]
</p>
```

### ✅ 8. Preguntas FAQ

**Ubicación**: Sección FAQ - dos preguntas con "Placeholder"

Completa con tu información real:

```astro
<p class="mt-3 text-sm text-slate-200 leading-relaxed">
  Entre 10.000 y 50.000 USD dependiendo del perfil de riesgo. 
  Cuentas menores pueden ser demasiado sensibles a la volatilidad...
</p>
```

### ✅ 9. Posts del Blog

**Ubicación**: Sección Blog - 3 posts placeholder

Opciones:
1. **Contenido estático**: Actualiza directamente en el código
2. **CMS**: Integra con:
   - Contentful
   - Strapi
   - Sanity
   - Markdown files en `/src/content/`

Ejemplo con Astro Content Collections:

```astro
---
import { getCollection } from 'astro:content';
const posts = await getCollection('blog');
---

{posts.map(post => (
  <article>
    <h3>{post.data.title}</h3>
    <p>{post.data.description}</p>
  </article>
))}
```

### ✅ 10. Formulario de Contacto

**Ubicación**: Sección Contacto

**Opciones de integración**:

#### A. Formspree (más simple)
```html
<form action="https://formspree.io/f/TU_ID" method="POST">
  <!-- campos del formulario -->
</form>
```

#### B. Netlify Forms
```html
<form name="contact" method="POST" data-netlify="true">
  <input type="hidden" name="form-name" value="contact" />
  <!-- campos del formulario -->
</form>
```

#### C. Backend personalizado
Configura un endpoint en Vercel Functions o servidor propio.

### ✅ 11. Analytics

Agrega tracking en `<head>` de index.astro:

#### Google Analytics
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

#### Plausible (alternativa privacy-friendly)
```html
<script defer data-domain="tudominio.com" src="https://plausible.io/js/script.js"></script>
```

### ✅ 12. Dominio Personalizado en Vercel

1. Ve a tu proyecto en Vercel
2. Settings → Domains
3. Agrega tu dominio (ej: `louiscalderon.com`)
4. Configura los DNS según las instrucciones de Vercel
5. Espera la propagación (puede tardar hasta 48h)

### ✅ 13. Variables de Entorno

Si necesitas API keys o secrets:

1. Crea archivo `.env`:
```
PUBLIC_SITE_URL=https://tudominio.com
FORMSPREE_ID=tu_id
```

2. Agrégalas en Vercel:
   - Settings → Environment Variables
   - Agrega cada variable

3. Úsalas en tu código:
```astro
const siteUrl = import.meta.env.PUBLIC_SITE_URL;
```

## 🚀 Pasos para Lanzamiento

1. ✅ Completa todos los placeholders
2. ✅ Prueba en local con `npm run dev`
3. ✅ Revisa en móvil (usa DevTools responsive mode)
4. ✅ Verifica todos los links
5. ✅ Prueba el formulario de contacto
6. ✅ Revisa disclaimers legales
7. ✅ Haz build de producción: `npm run build`
8. ✅ Prueba el build: `npm run preview`
9. ✅ Push a GitHub
10. ✅ Deploy a Vercel
11. ✅ Configura dominio personalizado
12. ✅ Verifica en Lighthouse (performance, SEO)

## 🎨 Personalización Avanzada

### Cambiar Colores

Edita `tailwind.config.cjs`:

```javascript
colors: {
  brand: {
    primary: '#TU_COLOR_PRIMARIO',
    secondary: '#TU_COLOR_SECUNDARIO',
    accent: '#TU_COLOR_ACENTO',
  },
},
```

### Agregar Animaciones

Usa clases de Tailwind o instala plugins:

```bash
npm install @tailwindcss/typography
```

### Optimizar Imágenes

Instala integración de imágenes de Astro:

```bash
npm install @astrojs/image
```

## 📞 Recursos Adicionales

- [Documentación de Astro](https://docs.astro.build)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Myfxbook Widget Generator](https://www.myfxbook.com/en/community/widgets)

## ⚠️ Importante

- **NUNCA** subas API keys o secrets al repositorio
- Usa `.env` para datos sensibles
- Configura `.gitignore` correctamente
- Revisa todos los disclaimers legales con un abogado si es necesario
- Cumple con regulaciones de tu jurisdicción (CFTC, etc.)

---

**¿Necesitas ayuda?** Revisa la documentación oficial o consulta con un desarrollador.
