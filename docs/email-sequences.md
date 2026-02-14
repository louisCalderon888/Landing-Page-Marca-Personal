# 📧 Secuencias de Email Marketing - Louis Calderon

> **Estrategia:** PAS Framework + Marketing Psychology + Sales Pipeline
> **Herramientas:** Supabase + Brevo
> **Fecha:** Febrero 2026

---

## 🎯 Contexto de Marca

### Propuesta de Valor Única (USP)
> "Datos sobre emociones, siempre. Track record verificado con transparencia total - incluyendo los drawdowns."

### Frase de Marca
> "No opino, valido con datos."

### Tono de Comunicación
- **Directo**: Sin rodeos, al grano
- **Transparente**: Mostramos todo, incluso lo malo
- **Humano**: Conexión real, no gurú inalcanzable
- **Anti-humo**: Cero promesas vacías de riqueza fácil
- **Científico**: Datos, métricas, validación

### Diferenciadores Clave
1. **Transparencia radical** - Muestra drawdowns (-48%), no solo ganancias
2. **Contacto humano** - No es un "gurú", es un guía real
3. **Multi-plataforma** - NinjaTrader, TradingView, MetaTrader
4. **Verificación sistemática** - Track record público (94% ROI en 16 meses)

### Buyer Personas

| Persona | Nombre | Servicio Ideal | Pain Point Principal |
|---------|--------|----------------|---------------------|
| El Trader Frustrado | Carlos M. | Señales VIP ($33/mes) | Perdió dinero con "gurús", desconfía |
| El Principiante Abrumado | Ana L. | Mentoría ($100/sesión) | No sabe por dónde empezar, abrumada |
| El Trader Técnico | Roberto S. | Desarrollo ($50-$3,000) | Tiene estrategia, quiere automatizar |
| El Trader Pasivo | Diego F. | Algoritmos (Próximamente) | Quiere automatización probada |

---

## 🗂️ Estructura de Leads en Supabase

| Tipo | Tabla Supabase | Campos Clave | Temperatura | Secuencia |
|------|----------------|--------------|-------------|-----------|
| Lead Frío | `email_leads` | email, source, utm_* | Curiosidad inicial | 7 emails nurturing |
| Lead Caliente | `contact_submissions` | name, email, interest, message | Interés específico | 3 emails seguimiento |

### Campos de `email_leads`
```typescript
interface EmailLead {
  id: string;
  email: string;
  source: string; // 'exit_popup', 'footer', 'blog'
  created_at: string;
  subscribed: boolean;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}
```

### Campos de `contact_submissions`
```typescript
interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  interest: string; // 'mentoria', 'senales', 'desarrollo'
  message: string;
  created_at: string;
  read: boolean;
  notes?: string;
}
```

---

## SECUENCIA 1: LEADS FRÍOS (`email_leads`)

> **Objetivo:** Nurturing de leads fríos hacia conversión
> **Trigger Brevo:** `email_leads.subscribed = true` AND nuevo registro
> **Frecuencia:** 7 emails en 21 días
> **Persona objetivo:** Carlos M. (Trader Frustrado) principalmente

### Email 1 - Día 0: Bienvenida + Entrega de Valor

**Asunto:** Tu acceso está listo 🎯

**Preview text:** Track record verificado con transparencia total

**Cuerpo:**

```
Hola,

Soy Louis Calderon.

Gracias por unirte. Te prometí algo real, así que aquí está:

**Mi track record verificado:** https://www.myfxbook.com/members/InteligenciaCol/cartera-888/10524558
- 94% ROI en 16 meses
- -48% drawdown máximo (sí, también muestro eso)
- 100% algorítmico

La mayoría de "gurús" te muestran solo las ganancias. Yo te muestro todo.

¿Por qué? Porque si vas a confiar en alguien con tu dinero, mereces ver la realidad completa.

En los próximos días te voy a compartir cómo dejé de perder dinero operando con emociones, y cómo puedes hacerlo tú también.

Hablamos pronto,

**Louis Calderon**  
*"No opino, valido con datos"*

---
P.D. Si tienes preguntas, responde este email. Lo leo personalmente.
```

**Psicología aplicada:**
- **Authority Bias** → Track record verificado científicamente
- **Reciprocity** → Doy valor primero sin pedir nada
- **Pratfall Effect** → Muestro drawdown para generar confianza
- **Unity Principle** → "Hablamos pronto" (somos iguales)

---

### Email 2 - Día 2: Pain Point (PAS - Problem)

**Framework:** PAS - Identificar el dolor
**Objetivo:** Hacer que el lector se vea reflejado en el problema

**Asunto:** El error que te está costando dinero 💸

**Asunto alternativo A/B:** "¿Por qué sigues perdiendo si ya sabes lo que haces?"

**Preview text:** El 90% de traders pierde. No es coincidencia.

**Cuerpo:**

```
Hola,

Déjame adivinar cómo fue tu último trade:

1. Viste una señal que parecía "perfecta"
2. Entraste con convicción
3. El mercado se movió en tu contra
4. Cerraste por miedo... y 5 minutos después el precio volvió a tu favor
5. Te frustraste. Juraste que mañana sería diferente.

**¿Suena familiar?**

No eres tú. Es tu cerebro.

Estamos programados para evitar pérdidas (se llama loss aversion). Es instintivo. Nos mantuvo vivos en la sabana hace 50,000 años.

Pero en trading, ese mismo instinto te destruye.

La solución no es "controlar tus emociones". Eso es como pedirle a tu estómago que no tenga hambre.

La solución es **eliminar las emociones de la ecuación por completo**.

¿Cómo? Te lo cuento mañana.

**Louis**

---
P.D. El 90% de traders pierde dinero. El 90% opera con emociones. ¿Coincidencia?
```

**Psicología aplicada (Marketing Psychology Skill):**
- **Loss Aversion** → El dolor de perder activa respuesta emocional
- **Fundamental Attribution Error** → "No eres tú, es tu cerebro" elimina la culpa
- **Zeigarnik Effect (Open Loop)** → "Te lo cuento mañana" crea tensión que obliga a abrir el siguiente email
- **Availability Heuristic** → Escenario vivido hace el problema tangible

---

### Email 3 - Día 4: Diferenciación (PAS - Agitate)

**Framework:** PAS - Amplificar las consecuencias del problema
**Objetivo:** Contrastar con "gurús" y posicionar la transparencia como diferenciador

**Asunto:** Por qué muestro mi peor drawdown (-48%) 📉

**Asunto alternativo A/B:** "Lo que los 'gurús' nunca te muestran"

**Preview text:** Mi peor pérdida está en internet. ¿Y la de ellos?

**Cuerpo:**

```
Hola,

¿Has notado algo raro en los "gurús" de trading?

Todos muestran:
✅ Screenshots de cuentas verdes
✅ Lamborghinis alquilados
✅ Relojes que probablemente son prestados

Pero nadie te muestra **cuando pierden**.

¿Por qué?

Porque si te mostraran la realidad, dejarías de seguirlos.

**Yo hago lo contrario.**

Mi peor drawdown fue **-48%**. 

Está en mi track record público. En mi web. Cualquiera puede verlo. No lo escondo.

¿Por qué lo muestro?

1. Porque la volatilidad es parte del trading real
2. Porque si alguien te promete ganancias sin riesgo, te está mintiendo
3. Porque la confianza se construye con verdad, no con filtros de Instagram

**La diferencia entre un sistema real y humo:**

| Gurú de Instagram | Sistema Real |
|-------------------|---------------|
| Solo muestra ganancias | Muestra TODO |
| "Confía en mí" | Datos verificables |
| Vende sueños | Vende proceso |
| Drawdown: ??? | Drawdown: -48% |

Hazle esta pregunta al "gurú" que sigues:

**"¿Cuál fue tu peor drawdown?"**

Si no te puede responder con datos, corre.

**Louis**

---
*"No vendo sueños, vendo sistemas"*
```

**Psicología aplicada (Marketing Psychology Skill):**
- **Pratfall Effect** → Mostrar vulnerabilidad genera más confianza que parecer perfecto
- **Contrast Effect** → Tabla comparativa hace la diferencia visual e innegable
- **Authority Bias** → Transparencia radical = credibilidad instantánea
- **Inversion** → "¿Qué haría un estafador? Lo contrario de lo que yo hago"

---

### Email 4 - Día 7: Prueba Social (PAS - Solution)

**Framework:** PAS - Presentar la solución con prueba social
**Objetivo:** Demostrar resultados reales con datos verificables

**Asunto:** 94% ROI en 16 meses - los datos 📊

**Asunto alternativo A/B:** "Mi track record completo (incluyendo las pérdidas)"

**Preview text:** Cada trade registrado. Sin editar. Sin filtros.

**Cuerpo:**

```
Hola,

Números. Sin humo. Sin excusas.

**Mi track record real (verificable en mi web):**

┌─────────────────────────────────────────┐
│  MÉTRICAS VERIFICADAS                   │
├─────────────────────────────────────────┤
│  ROI Total:           94%               │
│  Período:             16 meses          │
│  Drawdown Máximo:     -48%              │
│  Tipo:                100% Algorítmico  │
│  Trades registrados:  Todos             │
│  Pérdidas ocultas:    Ninguna           │
└─────────────────────────────────────────┘

Cada trade está registrado. 
Cada pérdida documentada. 
Cada ganancia verificable.

**¿Cómo funciona mi proceso?**

1️⃣ **Validación** → Cada estrategia pasa por miles de trades simulados antes de usar dinero real

2️⃣ **Edge estadístico** → Solo opero sistemas donde los números demuestran ventaja a largo plazo

3️⃣ **Ejecución algorítmica** → El sistema ejecuta. Yo superviso. Cero emociones.

No hay magia. No hay "intuición de mercado". No hay "sentir el gráfico".

**Hay proceso. Hay datos. Hay disciplina.**

→ Ver track record completo: https://www.myfxbook.com/members/InteligenciaCol/cartera-888/10524558

**Louis**

---
*"No opino, valido con datos"*
```

**Psicología aplicada (Marketing Psychology Skill):**
- **Social Proof** → Datos verificables crean confianza inmediata
- **Authority Bias** → Proceso científico posiciona como experto
- **Availability Heuristic** → Tabla visual hace los resultados tangibles y memorables
- **Commitment & Consistency** → CTA a ver el track record es un micro-compromiso

---

### Email 5 - Día 10: Presentar Servicios (AIDA Framework)

**Framework:** AIDA - Attention, Interest, Desire, Action
**Objetivo:** Presentar opciones sin abrumar, anclar precios estratégicamente

**Asunto:** ¿Mentoría, señales o desarrollo? 🎯

**Asunto alternativo A/B:** "3 formas de dejar de operar con emociones"

**Preview text:** Elige la que mejor se ajuste a donde estás ahora.

**Cuerpo:**

```
Hola,

Ya sabes mi filosofía: **datos sobre emociones, siempre.**

Si resuena contigo, tengo 3 formas de ayudarte (dependiendo de dónde estés en tu camino):

────────────────────────────────────────

**🎯 OPCIÓN 1: Mentoría 1-on-1**
**$100 por sesión**

Para ti si:
• Quieres desarrollar TU propia estrategia
• Necesitas orientación personalizada
• Estás abrumado y no sabes por dónde empezar
• Quieres trabajar la psicología del trading

*Es una inversión en ti, no un gasto.*

────────────────────────────────────────

**📊 OPCIÓN 2: Señales VIP** ⭐ Más popular
**$33/mes** → Solo $1/día

Para ti si:
• Quieres copiar mis trades en tiempo real
• Prefieres seguir un sistema probado
• No tienes tiempo para analizar gráficos
• Quieres ver cómo opera un sistema rentable

*Menos de lo que cuesta un café al día.*

────────────────────────────────────────

**💻 OPCIÓN 3: Desarrollo Personalizado**
**$50 - $3,000** (depende del proyecto)

Para ti si:
• Ya tienes una estrategia y quieres automatizarla
• Necesitas indicadores personalizados
• Usas NinjaTrader, TradingView, MetaTrader u otra plataforma

*Tu idea + mi código = tu sistema.*

────────────────────────────────────────

**¿Cuál te interesa?**

Responde este email con:
- **"1"** si te interesa mentoría
- **"2"** si te interesan las señales
- **"3"** si quieres cotizar un desarrollo

Te respondo personalmente.

**Louis**

---
*"No opino, valido con datos"*
```

**Psicología aplicada (Marketing Psychology Skill):**
- **Anchoring Effect** → Mentoría $100 primero ancla expectativas de precio
- **Mental Accounting** → "$1/día" reencuadra el precio mensual
- **Paradox of Choice** → Solo 3 opciones claras evita parálisis
- **Social Proof** → "⭐ Más popular" guía la elección
- **Commitment & Consistency** → Pedir respuesta simple crea micro-compromiso
- **Door-in-the-Face** → Opción de $3,000 hace que $33 parezca insignificante

---

### Email 6 - Día 14: Oferta Específica - Señales VIP

**Framework:** AIDA con énfasis en Desire + Action
**Objetivo:** Convertir leads interesados en Señales VIP

**Asunto:** Solo $1/día para copiar mis trades 💰

**Asunto alternativo A/B:** "$33/mes. Cancela cuando quieras. Sin trucos."

**Preview text:** Por menos de un café, acceso a mi operativa real.

**Cuerpo:**

```
Hola,

Voy directo al grano:

**Señales VIP = $33/mes**

Eso es **$1.10 por día**.

Por menos de lo que cuesta un café, recibes:

✅ Mis señales en tiempo real (Telegram)
✅ Entrada, stop y objetivo exactos
✅ Acceso a mi track record en vivo
✅ Lives de operativa cuando opero
✅ Sin teoría, solo práctica

**Lo que NO recibes (y nunca recibirás de mí):**

❌ Promesas de hacerte rico
❌ "Métodos secretos" de millonarios
❌ Humo de Instagram

──────────────────────────────

**Transparencia total:**

Si pierdo, lo ves.
Si gano, lo ves.
Si tengo un día malo, lo ves.

Esa es la diferencia.

→ **[SUSCRIBIRME A SEÑALES VIP]** ←
https://whop.com/louiscalderon/senales

──────────────────────────────

**Garantía Louis:**

• Cancela cuando quieras (literalmente un clic)
• Sin permanencia mínima
• Sin letra pequeña
• Sin trucos

**Louis**

---
P.D. Si no estás listo, no hay problema. Este email no va a desaparecer. Pero si quieres empezar a ver cómo opera un sistema real, el link está arriba.
```

**Psicología aplicada (Marketing Psychology Skill):**
- **Mental Accounting** → "$1.10/día" activa cuenta mental de gastos pequeños
- **Contrast Effect** → "Menos que un café" hace el precio trivial
- **Regret Aversion** → "Sin permanencia" elimina miedo a arrepentirse
- **Pratfall Effect** → Decir lo que NO doy genera más confianza
- **Loss Aversion (invertida)** → "Este email no va a desaparecer" quita presión artificial
- **Status-Quo Bias** → "Un clic para cancelar" reduce fricción percibida

---

### Email 7 - Día 21: Re-engagement (Último de la Secuencia)

**Framework:** Commitment & Consistency + Reciprocity
**Objetivo:** Reactivar leads fríos o limpiar lista de inactivos

**Asunto:** Pregunta rápida 🤔

**Asunto alternativo A/B:** "¿Sigo enviándote emails?"

**Preview text:** Solo necesito una respuesta de una palabra.

**Cuerpo:**

```
Hola,

Pregunta directa:

**¿Sigues interesado en mejorar tu trading?**

He estado enviando emails, pero no sé si:
a) Te están llegando
b) No es el momento adecuado
c) Ya no te interesa

Cualquiera de las tres está bien. Solo quiero saber.

──────────────────────────────

**Si ya no te interesa:**
→ Responde "NO" y te quito de la lista inmediatamente
→ Sin resentimientos, sin drama
→ Tu bandeja de entrada te lo agradecerá

**Si todavía quieres mejorar:**
→ Responde con tu **mayor obstáculo** en trading ahora mismo
→ Te leo personalmente
→ Y quizás pueda ayudarte

──────────────────────────────

Respeto tu tiempo. Si no respondo de ti en 7 días, asumiré que ya no te interesa y dejaré de enviarte emails.

Te leo,

**Louis**

---
*"No opino, valido con datos"*
```

**Psicología aplicada (Marketing Psychology Skill):**
- **Commitment & Consistency** → Pedir acción simple (responder una palabra)
- **Reciprocity** → Respetar su tiempo genera obligación de responder
- **Loss Aversion** → "Dejaré de enviarte" implica que perderá algo
- **Scarcity (temporal)** → "7 días" crea ventana de acción
- **Status-Quo Bias** → Hacer que NO responder tenga consecuencia cambia el default

---

## SECUENCIA 2: LEADS CALIENTES - MENTORÍA (`contact_submissions.interest = 'mentoria'`)

> **Framework principal:** StoryBrand (Cliente = Héroe, Louis = Guía)
> **Trigger Brevo:** Nuevo registro en `contact_submissions` con `interest = 'mentoria'`
> **Persona objetivo:** Ana L. (La Principiante Abrumada)
> **Frecuencia:** 3 emails en 5 días

### Email 1 - Día 0: Respuesta Inmediata + Pregunta de Diagnóstico

**Asunto:** Louis aquí - vi tu solicitud de mentoría 👋

**Preview text:** Antes de agendar, una pregunta rápida...

**Cuerpo:**

```
Hola {{name}},

Vi que te interesa la mentoría. Me alegra.

Antes de agendar, tengo una pregunta importante:

**¿Cuál es tu mayor frustración con tu trading ahora mismo?**

No es curiosidad. Es que quiero entender tu situación real para que la sesión sea lo más útil posible.

Algunas respuestas que he recibido:

• "No sé por dónde empezar, hay demasiada información"
• "Gano un día, pierdo tres. No entiendo qué hago mal"
• "Tengo miedo de perder más dinero"
• "Sigo a varios 'gurús' pero ninguno me ha funcionado"

¿Cuál es la tuya?

Responde este email y te cuento cómo funciona la sesión.

**Louis**

---
*Mentoría 1-on-1: $100/sesión | Inversión en TU éxito*
```

**Psicología aplicada:**
- **Liking/Similarity Bias** → Ejemplos de frustraciones muestran que entiendo su situación
- **Commitment & Consistency** → Responder crea micro-compromiso hacia la compra
- **Unity Principle** → "Me alegra" humaniza la interacción

---

### Email 2 - Día 2: Valor Tangible + CTA Claro

**Asunto:** 3 cosas que cambian en una sesión 🎯

**Preview text:** Diagnóstico real + Plan concreto + Accountability

**Cuerpo:**

```
Hola {{name}},

No sé si viste mi email anterior (las bandejas de entrada son un caos).

Te cuento qué pasa en una sesión típica de mentoría:

──────────────────────────────

**1️⃣ DIAGNÓSTICO REAL**
Entendemos qué está fallando realmente:
• ¿Es tu estrategia?
• ¿Es tu psicología?
• ¿Es tu ejecución?
• ¿O es que todavía no tienes un sistema?

**2️⃣ PLAN CONCRETO**
Salimos con los próximos 3 pasos específicos para TU caso.
No teoría genérica. Acción personalizada.

**3️⃣ ACCOUNTABILITY**
Alguien que te diga la verdad, no lo que quieres escuchar.
Si lo que haces no tiene sentido, te lo digo.

──────────────────────────────

**Lo que NO hago:**

❌ Venderte más cursos
❌ Prometerte que serás millonario
❌ Darte palmaditas en la espalda si estás haciendo algo mal

Te voy a decir lo que **necesitas oír**, no lo que quieres oír.

→ **[AGENDAR SESIÓN]**
https://whop.com/louiscalderon/mentoria

**$100/sesión** → Inversión en TU éxito, no un gasto.

**Louis**

---
*"No opino, valido con datos"*
```

**Psicología aplicada:**
- **Rule of 3** → Tres beneficios claros son fáciles de recordar
- **Pratfall Effect** → "Lo que NO hago" genera más confianza
- **Framing Effect** → "Inversión, no gasto" reencuadra el precio
- **Authority Bias** → "Te digo la verdad" posiciona como experto honesto

---

### Email 3 - Día 5: Último Seguimiento (Soft Close)

**Asunto:** ¿Cuál es tu mayor obstáculo? 🤔

**Preview text:** Si no es el momento, está bien. Aquí estoy cuando lo sea.

**Cuerpo:**

```
Hola {{name}},

No he tenido respuesta tuya.

Pueden ser dos cosas:

1. **Todavía no es el momento** → Completamente válido
2. **Mis emails se fueron a spam** → También pasa

Sea cual sea, está bien.

Pero si en algún momento cambias de idea y quieres hablar sobre tu trading, aquí estoy.

**Solo responde con tu mayor obstáculo y vemos cómo puedo ayudarte.**

Sin presión. Sin urgencia falsa. Sin "oferta que expira en 24 horas".

Cuando estés listo, aquí estaré.

**Louis**

---
→ Agendar cuando quieras: https://whop.com/louiscalderon/mentoria
```

**Psicología aplicada:**
- **Reciprocity** → No presionar genera obligación futura
- **Status-Quo Bias (inversión)** → "Cuando estés listo" respeta su tiempo
- **Contrast Effect** → "Sin urgencia falsa" contrasta con otros marketers
- **Open Loop** → La pregunta queda abierta para respuesta futura

---

## SECUENCIA 3: LEADS CALIENTES - SEÑALES (`contact_submissions.interest = 'senales'`)

> **Framework principal:** AIDA con énfasis en transparencia radical
> **Trigger Brevo:** Nuevo registro en `contact_submissions` con `interest = 'senales'`
> **Persona objetivo:** Carlos M. (El Trader Frustrado)
> **Frecuencia:** 3 emails en 5 días

### Email 1 - Día 0: Respuesta Inmediata + Expectativas Claras

**Asunto:** Tus señales VIP están a un paso 📊

**Preview text:** Esto es exactamente lo que recibes (y lo que NO)

**Cuerpo:**

```
Hola {{name}},

Vi que te interesan las Señales VIP. Antes de suscribirte, quiero que tengas claro exactamente qué recibes:

**✅ LO QUE SÍ RECIBES:**

• Señales en tiempo real (Telegram)
• Entrada, stop y objetivo exactos
• Track record actualizado diariamente
• Lives cuando opero en vivo
• Transparencia total (ves mis pérdidas también)

**❌ LO QUE NO RECIBES (ni recibirás):**

• Promesas de % de ganancia
• Garantía de resultados
• "Señales secretas de millonarios"
• Indicaciones de cuánto arriesgar (eso depende de TI)

──────────────────────────────

**¿Por qué te digo lo que NO doy?**

Porque la mayoría de servicios de señales te prometen la luna y te entregan polvo.

Yo prefiero que sepas exactamente qué esperar ANTES de pagar.

→ **[VER SEÑALES VIP]**
https://whop.com/louiscalderon/senales

**$33/mes** → Cancela cuando quieras

**Louis**

---
*"No opino, valido con datos"*
```

**Psicología aplicada:**
- **Pratfall Effect** → Decir lo que NO doy genera más confianza que solo lo positivo
- **Contrast Effect** → Comparación implícita con otros servicios de señales
- **Regret Aversion** → "Cancela cuando quieras" elimina miedo a comprometerse
- **Authority Bias** → Transparencia radical = credibilidad

---

### Email 2 - Día 2: Ejemplo Concreto + Social Proof

**Asunto:** Así se ve un día con mis señales 📱

**Preview text:** Sin humo. Solo entrada, stop, objetivo.

**Cuerpo:**

```
Hola {{name}},

Te muestro exactamente lo que recibirías en un día típico:

──────────────────────────────
🎯 EJEMPLO DE SEÑAL REAL
──────────────────────────────

📊 **SEÑAL: LONG NQ**

┌─────────────────────────────┐
│ Entrada:    18,450          │
│ Stop:       18,380 (-70 pts)│
│ Target 1:   18,520 (+70 pts)│
│ Target 2:   18,600 (+150 pts)│
│ Risk/Reward: 1:2            │
│ Confianza:  Alta            │
└─────────────────────────────┘

**Basado en:** Confluencia técnica + niveles algorítmicos

──────────────────────────────

**Eso es todo.**

Sin "🚀🚀🚀 COMPRA AHORA QUE SE VIENE LA LUNA 🚀🚀🚀"
Sin emojis de cohetes ni predicciones mágicas.

Solo datos. Niveles. Gestión de riesgo.

**El algoritmo calcula. Tú decides si entrar o no.**

──────────────────────────────

**$33/mes = $1.10/día**

Por menos de lo que cuesta un café, acceso a mi operativa real.

→ **[SUSCRIBIRME A SEÑALES VIP]**
https://whop.com/louiscalderon/senales

**Louis**

---
*"No opino, valido con datos"*
```

**Psicología aplicada:**
- **Availability Heuristic** → Ejemplo concreto hace el servicio tangible
- **Contrast Effect** → Comparación con señales de "cohetes" típicas
- **Mental Accounting** → "$1.10/día" activa cuenta de gastos pequeños
- **Show, Don't Tell** → Mostrar ejemplo real es más persuasivo que describir

---

### Email 3 - Día 5: Último Recordatorio (Soft Close)

**Asunto:** Último recordatorio: $1/día 💰

**Preview text:** Si no te interesa, solo dime "no" y no te molesto más.

**Cuerpo:**

```
Hola {{name}},

Último email sobre las señales (promesa).

**Resumen rápido:**

• Señales VIP = $33/mes
• Cancela cuando quieras (un clic)
• Track record público y verificable
• Mis pérdidas también las ves

**Si no te interesa:** Solo responde "no" y te quito de la lista. Sin resentimientos.

**Si sí te interesa:** El link está aquí abajo.

→ **[VER SEÑALES VIP]**
https://whop.com/louiscalderon/senales

Eso es todo. No voy a seguir insistiendo.

**Louis**

---
*"No opino, valido con datos"*
```

**Psicología aplicada:**
- **Commitment & Consistency** → Pedir respuesta simple ("no")
- **Scarcity (temporal)** → "Último email" crea urgencia legítima
- **Reciprocity** → Respetar su bandeja de entrada genera aprecio
- **Regret Aversion** → Última oportunidad sin presión agresiva

---

## SECUENCIA 4: LEADS CALIENTES - DESARROLLO (`contact_submissions.interest = 'desarrollo'`)

> **Framework principal:** Consultative Selling + Authority
> **Trigger Brevo:** Nuevo registro en `contact_submissions` con `interest = 'desarrollo'`
> **Persona objetivo:** Roberto S. (El Trader Técnico)
> **Frecuencia:** 2 emails en 3 días

### Email 1 - Día 0: Respuesta Inmediata + Discovery Questions

**Asunto:** Louis aquí - vi tu solicitud de desarrollo 💻

**Preview text:** Antes de cotizar, 3 preguntas rápidas...

**Cuerpo:**

```
Hola {{name}},

Vi que te interesa sistematizar tu estrategia. Perfecto, eso es lo que hago.

Antes de darte una cotización, necesito entender tu proyecto:

**3 preguntas rápidas:**

1️⃣ **¿Qué plataforma usas?**
   □ NinjaTrader
   □ TradingView  
   □ MetaTrader (MT4/MT5)
   □ Otra: _______

2️⃣ **¿Qué tipo de herramienta necesitas?**
   □ Indicador personalizado
   □ Estrategia automatizada (bot)
   □ Sistema de alertas
   □ Panel/Dashboard
   □ Otro: _______

3️⃣ **¿Ya tienes las reglas definidas?**
   □ Sí, tengo reglas claras que quiero codificar
   □ Tengo una idea pero necesito ayuda para definirlas
   □ No estoy seguro de por dónde empezar

──────────────────────────────

**Cómo funciona:**

1. Me cuentas qué necesitas (responde este email)
2. Te doy una cotización gratuita y sin compromiso
3. Si te parece bien, empezamos

**Rango de precios típico:**
• Indicador simple: $50-200
• Indicador avanzado: $200-800
• Estrategia completa: $800-1,500
• Sistema automatizado: $1,500-3,000

Tu idea + mi código = tu sistema.

Responde cuando puedas,

**Louis**

---
*Desarrollo en NinjaTrader, TradingView, MetaTrader y más*
```

**Psicología aplicada:**
- **Commitment & Consistency** → Checkboxes facilitan respuesta y crean compromiso
- **Authority Bias** → Mostrar rangos de precios demuestra experiencia
- **Anchoring Effect** → Rango $50-3,000 ancla expectativas
- **Reciprocity** → "Cotización gratuita" genera obligación

---

### Email 2 - Día 3: Seguimiento (Soft Close)

**Asunto:** ¿Tienes un minuto para contarme tu idea? 🤔

**Preview text:** Cotización gratuita, sin compromiso.

**Cuerpo:**

```
Hola {{name}},

No he recibido respuesta sobre tu proyecto de desarrollo.

Entiendo que a veces las prioridades cambian. Sin problema.

**Si todavía te interesa**, solo necesito saber:

• Qué plataforma usas
• Qué quieres automatizar (aunque sea una idea vaga)

Con eso te doy una **cotización gratuita** en menos de 24 horas.

**Si ya no es el momento**, responde "más adelante" y te contacto en unos meses.

Sea cual sea, está bien.

**Louis**

---
→ Más info sobre desarrollo: https://louiscalderon.co/#services
```

**Psicología aplicada:**
- **Reciprocity** → Ofrecer alternativa ("más adelante") respeta su tiempo
- **Commitment & Consistency** → Respuesta simple facilita acción
- **Status-Quo Bias** → "24 horas" reduce fricción temporal
- **Open Loop** → "Unos meses" mantiene la puerta abierta

---

## 📊 Variables para Brevo

| Variable | Descripción | Tabla Supabase | Ejemplo |
|----------|-------------|----------------|---------|
| `{{name}}` | Nombre del lead | contact_submissions.name | "Carlos" |
| `{{email}}` | Email del lead | ambas tablas | "carlos@email.com" |
| `{{interest}}` | Servicio de interés | contact_submissions.interest | "senales" |
| `{{source}}` | Fuente del lead | email_leads.source | "exit_popup" |
| `{{utm_source}}` | UTM source | email_leads.utm_source | "instagram" |
| `{{utm_campaign}}` | UTM campaign | email_leads.utm_campaign | "launch_2026" |

---

## ⚙️ Configuración de Automatización en Brevo

### Triggers por Secuencia:

| Secuencia | Trigger en Brevo | Condición |
|-----------|------------------|-----------|
| **Leads Fríos** | Nuevo contacto en lista | `lista = leads-frios` |
| **Mentoría** | Nuevo contacto en lista | `lista = leads-mentoria` |
| **Señales** | Nuevo contacto en lista | `lista = leads-senales` |
| **Desarrollo** | Nuevo contacto en lista | `lista = leads-desarrollo` |

### Tiempos de Espera (Wait Steps):

| Secuencia | Email 1 | Email 2 | Email 3 | Email 4 | Email 5 | Email 6 | Email 7 |
|-----------|---------|---------|---------|---------|---------|---------|---------|
| **Fríos** | Día 0 | +2 días | +2 días | +3 días | +3 días | +4 días | +7 días |
| **Mentoría** | Día 0 | +2 días | +3 días | — | — | — | — |
| **Señales** | Día 0 | +2 días | +3 días | — | — | — | — |
| **Desarrollo** | Día 0 | +3 días | — | — | — | — | — |

### Condiciones de Salida (Exit Conditions):

- **Leads Fríos:** Si el lead responde cualquier email O si hace clic en CTA de compra
- **Leads Calientes:** Si el lead convierte (compra) O si responde "no"
- **Todos:** Si se da de baja (unsubscribe)

---

## 📈 Métricas a Trackear

| Métrica | Benchmark | Objetivo Louis | Acción si bajo |
|---------|-----------|----------------|----------------|
| **Open Rate** | 20-25% | >35% | Mejorar asuntos con A/B testing |
| **Click Rate** | 2-3% | >5% | Mejorar CTAs y posición de links |
| **Reply Rate** | 1% | >3% | Más preguntas abiertas, personalización |
| **Unsubscribe** | <0.5% | <0.3% | Revisar frecuencia y relevancia |
| **Conversión a pago** | 1-2% | >5% | Revisar oferta y objeciones |
| **Spam Rate** | <0.1% | <0.05% | Verificar dominio y contenido |

---

## 🧪 Ideas de A/B Testing

### Asuntos a probar:

| Email | Versión A (actual) | Versión B (alternativa) |
|-------|-------------------|-------------------------|
| Email 1 Fríos | "Tu acceso está listo 🎯" | "Bienvenido - tu track record está aquí" |
| Email 2 Fríos | "El error que te está costando dinero 💸" | "¿Por qué sigues perdiendo si ya sabes lo que haces?" |
| Email 3 Fríos | "Por qué muestro mi peor drawdown (-48%) 📉" | "Lo que los 'gurús' nunca te muestran" |
| Email 6 Fríos | "Solo $1/día para copiar mis trades 💰" | "$33/mes. Cancela cuando quieras. Sin trucos." |

### Elementos a probar:

1. **Emojis vs. Sin emojis** en asuntos
2. **Preguntas vs. Afirmaciones** en asuntos
3. **CTAs en texto vs. CTAs en botón** (si usas HTML)
4. **Largo del email** (actual vs. 50% más corto)
5. **Hora de envío** (9am vs. 2pm vs. 7pm)

---

## 📝 Checklist Pre-Lanzamiento

- [ ] Crear listas en Brevo (leads-frios, leads-mentoria, leads-senales, leads-desarrollo)
- [ ] Crear atributos de contacto (PIPELINE_STAGE, LEAD_SCORE, SOURCE, INTEREST, SUPABASE_ID)
- [ ] Configurar Edge Function de sincronización Supabase → Brevo
- [ ] Configurar triggers de database en Supabase
- [ ] Crear templates de email en Brevo
- [ ] Configurar automations con tiempos de espera
- [ ] Verificar dominio de envío para mejor deliverability
- [ ] Configurar tracking de opens y clicks
- [ ] Probar flujo completo con email de prueba
- [ ] Verificar que los links de Whop funcionan correctamente

---

## 📚 Frameworks y Skills Aplicados

Este documento fue creado aplicando los siguientes frameworks y skills:

### Copywriting Frameworks
- **PAS (Problem-Agitate-Solution)** → Secuencia de leads fríos
- **AIDA (Attention-Interest-Desire-Action)** → Emails de oferta
- **StoryBrand** → Posicionamiento (Cliente = Héroe, Louis = Guía)

### Marketing Psychology (70+ Mental Models)
- Authority Bias, Pratfall Effect, Loss Aversion
- Mental Accounting, Anchoring Effect, Contrast Effect
- Reciprocity, Commitment & Consistency, Scarcity
- Zeigarnik Effect (Open Loops), Social Proof
- Regret Aversion, Status-Quo Bias

### Skills de Referencia
- `landing-page-copywriter` → Estructuras de copy de alta conversión
- `marketing-psychology` → Modelos mentales aplicados a marketing
- `business-strategy-planning` → Contexto de marca y personas

---

*Última actualización: Febrero 2026*
*Versión: 2.0 - Aplicando Skills de Copywriting y Marketing Psychology*
