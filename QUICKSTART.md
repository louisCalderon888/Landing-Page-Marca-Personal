# 🚀 Quick Start - Louis Calderon Landing Page

## Inicio Rápido (5 minutos)

### 1. Instalar Dependencias
```bash
npm install
```

### 2. Levantar en Desarrollo
```bash
npm run dev
```

Abre [http://localhost:4321](http://localhost:4321) en tu navegador.

### 3. Ver la Página
Navega por todas las secciones:
- Hero con propuesta de valor
- Track Record con métricas
- 3 planes de servicio
- Tu historia personal
- Blog (placeholders)
- FAQ
- Formulario de contacto

## 📝 Personalización Urgente (15 minutos)

### Cambios Mínimos Requeridos

1. **Tu Dominio** → `src/pages/index.astro` línea ~9
   ```astro
   const url = "https://tudominio.com";
   ```

2. **Tu Instagram** → `src/pages/index.astro` línea ~52
   ```astro
   'https://instagram.com/tu_usuario',
   ```

3. **Precios** → Sección "Servicios" (3 lugares)
   ```astro
   <div class="text-3xl font-bold text-white">USD 99...
   ```

4. **Foto** → Sección Hero
   - Coloca tu foto en `/public/foto-louis.jpg`
   - Busca el emoji 📊 y reemplaza con:
   ```astro
   <img src="/foto-louis.jpg" alt="Louis Calderon" />
   ```

## 🔧 Build y Deploy (10 minutos)

### Build Local
```bash
npm run build
npm run preview
```

### Deploy a Vercel

#### Opción A: Desde GitHub (Recomendado)
```bash
git init
git add .
git commit -m "feat: initial landing"
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git push -u origin main
```

Luego en [Vercel](https://vercel.com):
1. New Project
2. Import from GitHub
3. Selecciona tu repo
4. Deploy (automático)

#### Opción B: CLI de Vercel
```bash
npm i -g vercel
vercel
```

## 📋 Checklist Antes de Lanzar

- [ ] Actualicé mi dominio en index.astro
- [ ] Actualicé enlaces de redes sociales
- [ ] Agregué mis precios reales
- [ ] Subí mi foto profesional
- [ ] Pegué el widget de Myfxbook
- [ ] Actualicé las métricas (Win rate, Profit factor, Sharpe)
- [ ] Completé mi historia personal
- [ ] Revisé las preguntas FAQ
- [ ] Agregué disclaimers legales
- [ ] Configuré el formulario de contacto
- [ ] Probé en móvil
- [ ] Probé todos los links
- [ ] Hice build sin errores

## 🆘 Problemas Comunes

### Error: "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Error al hacer build
```bash
npm run lint
```
Revisa y corrige los errores que muestre.

### La página se ve rara en móvil
- Abre DevTools (F12)
- Toggle device toolbar (Ctrl+Shift+M)
- Prueba en iPhone SE, iPad, etc.

### El formulario no funciona
Necesitas configurar un servicio de formularios:
- Formspree (gratis)
- Netlify Forms
- O tu propio backend

## 📚 Documentación Completa

Para personalización detallada, lee:
- `PERSONALIZACION.md` - Guía paso a paso de cada sección
- `README.md` - Información técnica completa

## 🎯 Próximos Pasos Sugeridos

1. **Semana 1**: Personaliza contenido básico
2. **Semana 2**: Integra Myfxbook y agrega disclaimers
3. **Semana 3**: Configura blog y formulario
4. **Semana 4**: Agrega analytics y dominio personalizado

## 💡 Tips Pro

- **SEO**: Actualiza meta descriptions en cada sección
- **Performance**: Usa imágenes WebP
- **Conversión**: Prueba diferentes CTAs
- **Legal**: Revisa disclaimers con abogado

---

**¿Listo?** Empieza con `npm run dev` y abre [http://localhost:4321](http://localhost:4321)
