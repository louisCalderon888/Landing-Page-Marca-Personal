# 📚 Documentación Técnica Completa - Louis Calderon Landing Page

> **Última actualización:** 4 de Febrero, 2026  
> **Versión:** 1.0.0  
> **Estado:** Producción

---

## 📋 Índice

1. [Resumen del Proyecto](#resumen-del-proyecto)
2. [Stack Tecnológico](#stack-tecnológico)
3. [Arquitectura del Sistema](#arquitectura-del-sistema)
4. [Base de Datos (Supabase)](#base-de-datos-supabase)
5. [Edge Functions](#edge-functions)
6. [Integración con Brevo](#integración-con-brevo)
7. [Flujos de Datos](#flujos-de-datos)
8. [Variables de Entorno](#variables-de-entorno)
9. [Despliegue](#despliegue)
10. [Mantenimiento](#mantenimiento)
11. [Troubleshooting](#troubleshooting)

---

## Resumen del Proyecto

### Descripción
Landing page profesional para **Louis Calderon** - marca personal enfocada en trading algorítmico, señales de trading y mentoría.

### Propósito
- Capturar leads (exit popup, formulario de contacto)
- Nutrir leads con email marketing automatizado
- Convertir leads en clientes para servicios de trading

### URLs de Producción

| Servicio | URL |
|----------|-----|
| Landing Page | `https://louiscalderon.co` (pendiente configurar) |
| Supabase Dashboard | `https://supabase.com/dashboard/project/rxnbcalyoinzghlgjjtz` |
| Brevo Dashboard | `https://app.brevo.com` |

---

## Stack Tecnológico

### Frontend
| Tecnología | Versión | Uso |
|------------|---------|-----|
| Astro | 4.x | Framework SSG |
| Tailwind CSS | 3.x | Estilos |
| TypeScript | 5.x | Type safety |

### Backend & Database
| Tecnología | Versión | Uso |
|------------|---------|-----|
| Supabase | - | BaaS (Postgres + Edge Functions) |
| PostgreSQL | 17.6.1 | Base de datos |
| Deno | - | Runtime para Edge Functions |

### Email Marketing
| Tecnología | Uso |
|------------|-----|
| Brevo (ex-Sendinblue) | Email automation, CRM |

### Infraestructura
| Servicio | Uso |
|----------|-----|
| Vercel | Hosting frontend |
| Supabase Cloud | Backend (us-east-1) |

---

## Arquitectura del Sistema

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              FRONTEND                                    │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                    Astro Landing Page                            │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │   │
│  │  │ Exit Popup   │  │ Contact Form │  │ Newsletter Form      │  │   │
│  │  │ (email only) │  │ (full data)  │  │ (footer subscription)│  │   │
│  │  └──────┬───────┘  └──────┬───────┘  └──────────┬───────────┘  │   │
│  └─────────┼─────────────────┼──────────────────────┼──────────────┘   │
│            │                 │                      │                   │
└────────────┼─────────────────┼──────────────────────┼───────────────────┘
             │                 │                      │
             ▼                 ▼                      ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                            SUPABASE                                      │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                     PostgreSQL Database                          │   │
│  │  ┌───────────────────┐  ┌────────────────────────┐              │   │
│  │  │   email_leads     │  │  contact_submissions   │              │   │
│  │  │ (leads fríos)     │  │  (leads calientes)     │              │   │
│  │  └────────┬──────────┘  └────────────┬───────────┘              │   │
│  │           │                          │                           │   │
│  │           └──────────┬───────────────┘                           │   │
│  │                      │                                           │   │
│  │                      ▼                                           │   │
│  │           ┌──────────────────────┐                               │   │
│  │           │ TRIGGER: on_insert   │                               │   │
│  │           │ sync_lead_to_brevo() │                               │   │
│  │           └──────────┬───────────┘                               │   │
│  │                      │                                           │   │
│  └──────────────────────┼───────────────────────────────────────────┘   │
│                         │                                               │
│  ┌──────────────────────▼───────────────────────────────────────────┐   │
│  │                    Edge Functions                                 │   │
│  │  ┌─────────────────────┐      ┌─────────────────────┐           │   │
│  │  │   sync-to-brevo     │      │   brevo-webhook     │◄──────────┼───┐
│  │  │ (Supabase → Brevo)  │      │ (Brevo → Supabase)  │           │   │
│  │  └─────────┬───────────┘      └─────────────────────┘           │   │
│  │            │                                                     │   │
│  └────────────┼─────────────────────────────────────────────────────┘   │
│               │                                                         │
└───────────────┼─────────────────────────────────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                              BREVO                                       │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                        Contacts                                   │   │
│  │  ┌────────────────┐ ┌────────────────┐ ┌────────────────┐       │   │
│  │  │ leads-frios    │ │ leads-mentoria │ │ leads-senales  │       │   │
│  │  │    (ID: 8)     │ │    (ID: 9)     │ │    (ID: 10)    │       │   │
│  │  └────────────────┘ └────────────────┘ └────────────────┘       │   │
│  │  ┌────────────────┐ ┌────────────────┐                          │   │
│  │  │leads-desarrollo│ │   clientes     │                          │   │
│  │  │    (ID: 11)    │ │    (ID: 12)    │                          │   │
│  │  └────────────────┘ └────────────────┘                          │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                      Automations                                  │   │
│  │  • Secuencia Leads Fríos (7 emails, 21 días)                    │   │
│  │  • Secuencia Leads Mentoría (3 emails)                          │   │
│  │  • Secuencia Leads Señales (3 emails)                           │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                       Webhooks                                    │   │
│  │  URL: https://rxnbcalyoinzghlgjjtz.supabase.co/functions/v1/    │   │
│  │       brevo-webhook                                               │   │
│  │  Events: sent, opened, clicked, unsubscribe, bounce              │───┘
│  └─────────────────────────────────────────────────────────────────┘
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Base de Datos (Supabase)

### Información del Proyecto

| Campo | Valor |
|-------|-------|
| Project ID | `rxnbcalyoinzghlgjjtz` |
| Project Name | LandingPageLouisCalderon |
| Region | us-east-1 |
| Database Version | PostgreSQL 17.6.1 |
| Status | ACTIVE_HEALTHY |

### Tablas

#### `email_leads`
> Leads capturados desde el exit popup y otros lead magnets

| Columna | Tipo | Default | Descripción |
|---------|------|---------|-------------|
| `id` | uuid | gen_random_uuid() | Primary key |
| `email` | text | - | Email del lead (unique) |
| `source` | text | 'exit_popup' | Fuente: exit_popup, newsletter, blog |
| `created_at` | timestamptz | now() | Fecha de creación |
| `subscribed` | boolean | true | Suscrito a emails |
| `utm_source` | text | null | UTM source |
| `utm_medium` | text | null | UTM medium |
| `utm_campaign` | text | null | UTM campaign |
| `pipeline_stage` | enum | 'new' | Etapa del funnel |
| `pipeline_updated_at` | timestamptz | now() | Última actualización de etapa |
| `emails_sent` | integer | 0 | Emails enviados |
| `emails_opened` | integer | 0 | Emails abiertos |
| `emails_clicked` | integer | 0 | Emails con clicks |
| `last_email_sent_at` | timestamptz | null | Último email enviado |
| `last_email_opened_at` | timestamptz | null | Último email abierto |
| `last_email_clicked_at` | timestamptz | null | Último click |
| `brevo_contact_id` | text | null | ID en Brevo |
| `brevo_list_ids` | integer[] | null | IDs de listas en Brevo |
| `converted_at` | timestamptz | null | Fecha de conversión |
| `converted_to` | text | null | Servicio convertido |
| `revenue_generated` | numeric | 0 | Ingresos generados |
| `lead_score` | integer | 0 | Score 0-100 |
| `last_activity_at` | timestamptz | now() | Última actividad |

**Pipeline Stages (enum `lead_pipeline_stage`):**
- `new` - Nuevo lead
- `nurturing` - En proceso de nurturing
- `engaged` - Enganchado (abrió emails)
- `interested` - Interesado (hizo click)
- `converted` - Convertido a cliente
- `unsubscribed` - Desuscrito
- `inactive` - Inactivo

#### `contact_submissions`
> Formularios de contacto con interés específico en servicios

| Columna | Tipo | Default | Descripción |
|---------|------|---------|-------------|
| `id` | uuid | gen_random_uuid() | Primary key |
| `name` | text | - | Nombre del contacto |
| `email` | text | - | Email del contacto |
| `interest` | text | - | Servicio: mentoria, senales, desarrollo, otro |
| `message` | text | - | Mensaje del formulario |
| `created_at` | timestamptz | now() | Fecha de creación |
| `read` | boolean | false | Leído por el equipo |
| `notes` | text | null | Notas internas |
| `pipeline_stage` | enum | 'new' | Etapa del pipeline |
| `pipeline_updated_at` | timestamptz | now() | Última actualización |
| `emails_sent` | integer | 0 | Emails enviados |
| `emails_opened` | integer | 0 | Emails abiertos |
| `emails_clicked` | integer | 0 | Emails con clicks |
| `last_email_sent_at` | timestamptz | null | Último email enviado |
| `last_email_opened_at` | timestamptz | null | Último email abierto |
| `last_response_at` | timestamptz | null | Última respuesta |
| `brevo_contact_id` | text | null | ID en Brevo |
| `brevo_list_ids` | integer[] | null | IDs de listas en Brevo |
| `assigned_to` | text | null | Asignado a |
| `next_followup_at` | timestamptz | null | Próximo seguimiento |
| `followup_count` | integer | 0 | Seguimientos realizados |
| `converted_at` | timestamptz | null | Fecha de conversión |
| `revenue_generated` | numeric | 0 | Ingresos generados |
| `lost_reason` | text | null | Razón de pérdida |
| `lead_score` | integer | 0 | Score 0-100 |
| `priority` | text | 'normal' | low, normal, high, urgent |
| `last_activity_at` | timestamptz | now() | Última actividad |

**Pipeline Stages (enum `contact_pipeline_stage`):**
- `new` - Nuevo contacto
- `contacted` - Contactado
- `responded` - Respondió
- `qualified` - Calificado
- `negotiating` - Negociando
- `converted` - Convertido
- `lost` - Perdido
- `inactive` - Inactivo

### Triggers

#### `on_email_lead_created`
```sql
CREATE TRIGGER on_email_lead_created
  AFTER INSERT ON email_leads
  FOR EACH ROW
  EXECUTE FUNCTION sync_lead_to_brevo();
```

#### `on_contact_created`
```sql
CREATE TRIGGER on_contact_created
  AFTER INSERT ON contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION sync_lead_to_brevo();
```

### Función del Trigger

```sql
CREATE OR REPLACE FUNCTION public.sync_lead_to_brevo()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
DECLARE
  payload JSONB;
  edge_function_url TEXT;
BEGIN
  edge_function_url := 'https://rxnbcalyoinzghlgjjtz.supabase.co/functions/v1/sync-to-brevo';
  
  IF TG_TABLE_NAME = 'email_leads' THEN
    payload := jsonb_build_object(
      'email', NEW.email,
      'source', COALESCE(NEW.source, 'website'),
      'supabase_id', NEW.id::text,
      'table', 'email_leads'
    );
  ELSIF TG_TABLE_NAME = 'contact_submissions' THEN
    payload := jsonb_build_object(
      'email', NEW.email,
      'name', NEW.name,
      'interest', NEW.interest,
      'supabase_id', NEW.id::text,
      'table', 'contact_submissions'
    );
  END IF;
  
  PERFORM net.http_post(
    url := edge_function_url,
    headers := '{"Content-Type": "application/json"}'::jsonb,
    body := payload
  );
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    RAISE WARNING 'Error en sync_lead_to_brevo: %', SQLERRM;
    RETURN NEW;
END;
$function$
```

### Migraciones Aplicadas

| Versión | Nombre | Descripción |
|---------|--------|-------------|
| 20260203132947 | create_contact_submissions_table | Tabla de contactos |
| 20260203132949 | create_email_leads_table | Tabla de leads |
| 20260203135444 | fix_email_leads_upsert_policy | RLS policies |
| 20260203142700 | add_pipeline_tracking_fields_v2 | Campos de pipeline |
| 20260204121126 | enable_pg_net_extension | Extensión pg_net |
| 20260204121810 | enable_pg_net_extension | (duplicado) |
| 20260204122043 | create_brevo_sync_triggers | Triggers iniciales |
| 20260204123952 | fix_brevo_sync_trigger | Corrección de sintaxis |
| 20260204124108 | fix_brevo_trigger_no_auth | Sin Authorization header |

### Extensiones Habilitadas

- **pg_net** - Para hacer HTTP requests desde PostgreSQL

---

## Edge Functions

### 1. sync-to-brevo

> Sincroniza nuevos leads de Supabase a Brevo

| Propiedad | Valor |
|-----------|-------|
| Slug | `sync-to-brevo` |
| Versión | 7 |
| Estado | ACTIVE |
| JWT Verification | **Deshabilitado** |
| URL | `https://rxnbcalyoinzghlgjjtz.supabase.co/functions/v1/sync-to-brevo` |

**Código Fuente:**

```typescript
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const BREVO_API_KEY = Deno.env.get('BREVO_API_KEY')!;
const BREVO_API_URL = 'https://api.brevo.com/v3';

const BREVO_LISTS = {
  leads_frios: 8,
  leads_mentoria: 9,
  leads_senales: 10,
  leads_desarrollo: 11,
  clientes: 12,
};

interface ContactPayload {
  email: string;
  name?: string;
  source?: string;
  interest?: string;
  supabase_id: string;
  table: 'email_leads' | 'contact_submissions';
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }

  try {
    const payload: ContactPayload = await req.json();
    
    if (!payload.email || !payload.supabase_id || !payload.table) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    let listIds: number[] = [];
    
    if (payload.table === 'email_leads') {
      listIds = [BREVO_LISTS.leads_frios];
    } else if (payload.table === 'contact_submissions') {
      switch (payload.interest) {
        case 'mentoria':
          listIds = [BREVO_LISTS.leads_mentoria];
          break;
        case 'senales':
          listIds = [BREVO_LISTS.leads_senales];
          break;
        case 'desarrollo':
          listIds = [BREVO_LISTS.leads_desarrollo];
          break;
        default:
          listIds = [BREVO_LISTS.leads_frios];
      }
    }
    
    const brevoBody = {
      email: payload.email,
      attributes: {
        NOMBRE: payload.name || '',
        SOURCE: payload.source || 'website',
        INTEREST: payload.interest || '',
        SUPABASE_ID: payload.supabase_id,
        PIPELINE_STAGE: 'new',
        LEAD_SCORE: 0,
      },
      listIds: listIds,
      updateEnabled: true,
    };
    
    const brevoResponse = await fetch(`${BREVO_API_URL}/contacts`, {
      method: 'POST',
      headers: {
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(brevoBody),
    });
    
    const responseText = await brevoResponse.text();
    let brevoData: any = {};
    try {
      brevoData = JSON.parse(responseText);
    } catch (e) {}
    
    // Actualizar Supabase con el ID de Brevo
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    const brevoId = brevoData.id || (brevoResponse.ok ? 'created' : 'error');
    
    await supabase
      .from(payload.table)
      .update({
        brevo_contact_id: brevoId.toString(),
        brevo_list_ids: listIds,
      })
      .eq('id', payload.supabase_id);
    
    return new Response(
      JSON.stringify({ 
        success: brevoResponse.ok, 
        status: brevoResponse.status,
        brevo_id: brevoId,
        brevo_message: brevoData.message || brevoData.code || 'ok'
      }),
      { headers: { 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
});
```

### 2. brevo-webhook

> Recibe eventos de Brevo y actualiza métricas en Supabase

| Propiedad | Valor |
|-----------|-------|
| Slug | `brevo-webhook` |
| Versión | 3 |
| Estado | ACTIVE |
| JWT Verification | **Deshabilitado** |
| URL | `https://rxnbcalyoinzghlgjjtz.supabase.co/functions/v1/brevo-webhook` |

**Eventos Soportados:**
- `sent` / `delivered` → Incrementa `emails_sent`
- `opened` / `open` → Incrementa `emails_opened`, actualiza `pipeline_stage` a 'engaged', suma 5 puntos a `lead_score`
- `click` → Incrementa `emails_clicked`, actualiza `pipeline_stage` a 'interested', suma 15 puntos a `lead_score`
- `unsubscribe` → Marca `subscribed = false`, actualiza `pipeline_stage` a 'unsubscribed'
- `hard_bounce` / `soft_bounce` → Marca `subscribed = false`, actualiza `pipeline_stage` a 'inactive'

---

## Integración con Brevo

### Configuración de la Cuenta

| Configuración | Valor |
|---------------|-------|
| API Key | `xkeysib-b06f4993...` (almacenada en Supabase secrets) |
| Restricción IP | **Deshabilitada** (importante para Edge Functions) |
| Región API | `https://api.brevo.com/v3` |

### Listas de Contactos

| Lista | ID | Descripción | Trigger |
|-------|-----|-------------|---------|
| leads-frios | 8 | Leads del exit popup | INSERT en `email_leads` |
| leads-mentoria | 9 | Interesados en mentoría | `interest = 'mentoria'` |
| leads-senales | 10 | Interesados en señales | `interest = 'senales'` |
| leads-desarrollo | 11 | Interesados en desarrollo | `interest = 'desarrollo'` |
| clientes | 12 | Clientes que pagaron | Manual o conversión |

### Atributos de Contacto

| Atributo | Tipo | Descripción |
|----------|------|-------------|
| NOMBRE | Text | Nombre del contacto |
| SOURCE | Text | Fuente del lead (website, exit_popup, etc.) |
| INTEREST | Text | Servicio de interés |
| SUPABASE_ID | Text | UUID del registro en Supabase |
| PIPELINE_STAGE | Text | Etapa actual del pipeline |
| LEAD_SCORE | Number | Score de engagement (0-100) |

### Webhook Configurado

| Campo | Valor |
|-------|-------|
| URL | `https://rxnbcalyoinzghlgjjtz.supabase.co/functions/v1/brevo-webhook` |
| Autenticación | Sin autenticación |
| Categoría | Marketing emails |
| Eventos | Todos habilitados |

---

## Flujos de Datos

### Flujo 1: Nuevo Lead (Exit Popup)

```
1. Usuario cierra página
         ↓
2. Exit Popup muestra formulario
         ↓
3. Usuario ingresa email
         ↓
4. Frontend POST a Supabase (email_leads)
         ↓
5. Trigger se dispara automáticamente
         ↓
6. pg_net llama a Edge Function sync-to-brevo
         ↓
7. Edge Function:
   - Crea contacto en Brevo
   - Asigna a lista "leads-frios" (ID: 8)
   - Actualiza Supabase con brevo_contact_id
         ↓
8. Brevo Automation inicia secuencia de nurturing
```

### Flujo 2: Formulario de Contacto

```
1. Usuario llena formulario de contacto
         ↓
2. Selecciona interés: mentoría, señales, o desarrollo
         ↓
3. Frontend POST a Supabase (contact_submissions)
         ↓
4. Trigger se dispara automáticamente
         ↓
5. pg_net llama a Edge Function sync-to-brevo
         ↓
6. Edge Function:
   - Crea contacto en Brevo
   - Asigna a lista según interés:
     • mentoria → lista 9
     • senales → lista 10
     • desarrollo → lista 11
   - Actualiza Supabase con brevo_contact_id
         ↓
7. Brevo Automation inicia secuencia específica
```

### Flujo 3: Evento de Email (Brevo → Supabase)

```
1. Brevo envía email de la secuencia
         ↓
2. Usuario abre email o hace click
         ↓
3. Brevo dispara webhook
         ↓
4. Edge Function brevo-webhook recibe evento
         ↓
5. Busca contacto por email en ambas tablas
         ↓
6. Actualiza métricas:
   - emails_opened / emails_clicked
   - pipeline_stage
   - lead_score
   - last_activity_at
         ↓
7. Datos disponibles para análisis y seguimiento
```

---

## Variables de Entorno

### Supabase Edge Functions

```bash
# Configurar con:
supabase secrets set BREVO_API_KEY=tu_api_key

# Variables automáticas (ya disponibles):
# SUPABASE_URL
# SUPABASE_SERVICE_ROLE_KEY
```

### Frontend (si aplica)

```env
PUBLIC_SUPABASE_URL=https://rxnbcalyoinzghlgjjtz.supabase.co
PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
```

---

## Despliegue

### Frontend (Vercel)

1. Push a GitHub repository
2. Vercel auto-deploy desde `main`
3. Build command: `npm run build`
4. Output directory: `dist`

### Edge Functions (Supabase)

Las Edge Functions se despliegan via Supabase Dashboard o CLI:

```bash
# Instalar CLI
npm install -g supabase

# Login
supabase login

# Link proyecto
supabase link --project-ref rxnbcalyoinzghlgjjtz

# Deploy función
supabase functions deploy sync-to-brevo --no-verify-jwt
supabase functions deploy brevo-webhook --no-verify-jwt
```

### Database Migrations

```bash
# Crear migración
supabase migration new nombre_migracion

# Aplicar migraciones
supabase db push
```

---

## Mantenimiento

### Queries Útiles

#### Ver pipeline completo de leads
```sql
SELECT 
  pipeline_stage,
  COUNT(*) as total,
  AVG(lead_score) as avg_score
FROM email_leads
GROUP BY pipeline_stage
ORDER BY total DESC;
```

#### Leads más engaged
```sql
SELECT 
  email,
  lead_score,
  emails_opened,
  emails_clicked,
  pipeline_stage,
  last_activity_at
FROM email_leads
WHERE lead_score > 50
ORDER BY lead_score DESC
LIMIT 20;
```

#### Contactos pendientes de seguimiento
```sql
SELECT * FROM contact_submissions
WHERE pipeline_stage IN ('new', 'contacted')
  AND (next_followup_at IS NULL OR next_followup_at <= NOW())
ORDER BY lead_score DESC, priority DESC;
```

#### Tasa de conversión por fuente
```sql
SELECT 
  source,
  COUNT(*) as total_leads,
  COUNT(*) FILTER (WHERE pipeline_stage = 'converted') as converted,
  ROUND(100.0 * COUNT(*) FILTER (WHERE pipeline_stage = 'converted') / COUNT(*), 2) as conversion_rate
FROM email_leads
GROUP BY source;
```

#### Verificar sincronización con Brevo
```sql
SELECT 
  email,
  brevo_contact_id,
  brevo_list_ids,
  created_at
FROM email_leads
WHERE brevo_contact_id IS NULL
  AND created_at > NOW() - INTERVAL '1 hour';
```

### Monitoreo

1. **Logs de Edge Functions**: Supabase Dashboard → Edge Functions → Logs
2. **Errores de Brevo**: Brevo Dashboard → Logs
3. **Webhook events**: Brevo Dashboard → Settings → Webhooks → Logs

---

## Troubleshooting

### Problema: Lead no aparece en Brevo

**Causas posibles:**
1. Edge Function no se ejecutó
2. API Key de Brevo inválida
3. Error en el payload

**Solución:**
```sql
-- Verificar si el trigger se ejecutó
SELECT * FROM email_leads 
WHERE email = 'correo@ejemplo.com';

-- Si brevo_contact_id es NULL, reintentar manualmente:
-- Usar Supabase Dashboard → Edge Functions → sync-to-brevo → Test
```

### Problema: Error 401 en Edge Function

**Causa:** API Key de Brevo incorrecta o expirada

**Solución:**
```bash
# Actualizar secret
supabase secrets set BREVO_API_KEY=nueva_api_key
```

### Problema: Error de IP no reconocida

**Causa:** Restricción de IP activa en Brevo

**Solución:**
1. Ir a Brevo → Settings → Security
2. Desactivar "Restrict API access by IP address"

### Problema: Webhook de Brevo no actualiza Supabase

**Diagnóstico:**
```sql
-- Ver últimas actualizaciones
SELECT email, emails_opened, emails_clicked, last_activity_at
FROM email_leads
ORDER BY last_activity_at DESC
LIMIT 10;
```

**Verificar:**
1. URL del webhook correcta en Brevo
2. Eventos habilitados en Brevo
3. Logs de Edge Function en Supabase

### Problema: Trigger no se dispara

**Verificar:**
```sql
-- Ver triggers activos
SELECT trigger_name, event_manipulation, action_statement
FROM information_schema.triggers
WHERE trigger_schema = 'public';
```

---

## Checklist de Verificación Post-Deploy

- [ ] Edge Functions activas y sin errores
- [ ] Triggers creados en ambas tablas
- [ ] API Key de Brevo configurada
- [ ] Listas de Brevo con IDs correctos
- [ ] Webhook de Brevo apuntando a URL correcta
- [ ] Restricción de IP deshabilitada en Brevo
- [ ] Test de inserción exitoso
- [ ] Contacto aparece en Brevo
- [ ] brevo_contact_id actualizado en Supabase

---

## Contactos y Recursos

| Recurso | URL |
|---------|-----|
| Supabase Docs | https://supabase.com/docs |
| Brevo API Docs | https://developers.brevo.com |
| Astro Docs | https://docs.astro.build |
| Proyecto Supabase | https://supabase.com/dashboard/project/rxnbcalyoinzghlgjjtz |

---

*Documentación generada el 4 de Febrero, 2026*
