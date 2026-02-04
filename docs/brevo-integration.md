# 🔗 Integración Supabase + Brevo

> Guía para conectar tu base de datos de leads con Brevo para automatización de email marketing.

---

## Arquitectura

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Landing Page  │────▶│    Supabase     │────▶│     Brevo       │
│   (Astro)       │     │  (PostgreSQL)   │     │  (Email Mktg)   │
└─────────────────┘     └─────────────────┘     └─────────────────┘
         │                      │                       │
         │                      │                       │
    Formularios           Edge Functions           Automations
    Exit Popup            Webhooks                 Email Sequences
                          Triggers
```

---

## Paso 1: Configurar Brevo

### 1.1 Crear cuenta en Brevo
1. Ve a [brevo.com](https://brevo.com) y crea una cuenta
2. Verifica tu dominio para mejor deliverability
3. Obtén tu API Key en: **Settings → SMTP & API → API Keys**

### 1.2 Crear Listas de Contactos

| Lista | ID | Descripción | Estado |
|-------|-----|-------------|--------|
| `leads-frios` | **8** | Leads del exit popup | ✅ Creada |
| `leads-mentoria` | **9** | Interesados en mentoría | ✅ Creada |
| `leads-senales` | **10** | Interesados en señales | ✅ Creada |
| `leads-desarrollo` | **11** | Interesados en desarrollo | ✅ Creada |
| `clientes` | **12** | Clientes que ya pagaron | ✅ Creada |

### 1.3 Crear Atributos de Contacto

En **Contacts → Settings → Contact attributes**, crear:

| Atributo | Tipo | Descripción |
|----------|------|-------------|
| `PIPELINE_STAGE` | Text | Etapa del pipeline |
| `LEAD_SCORE` | Number | Score de 0-100 |
| `SOURCE` | Text | Fuente del lead |
| `INTEREST` | Text | Servicio de interés |
| `SUPABASE_ID` | Text | ID en Supabase |

---

## Paso 2: Crear Edge Function para Sincronización

### 2.1 Función para agregar contactos a Brevo

Crea esta Edge Function en Supabase:

```typescript
// supabase/functions/sync-to-brevo/index.ts

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const BREVO_API_KEY = Deno.env.get('BREVO_API_KEY')!
const BREVO_API_URL = 'https://api.brevo.com/v3'

// IDs de listas en Brevo (actualizar con tus IDs reales)
const BREVO_LISTS = {
  leads_frios: 1,        // Actualizar con ID real
  leads_mentoria: 2,     // Actualizar con ID real
  leads_senales: 3,      // Actualizar con ID real
  leads_desarrollo: 4,   // Actualizar con ID real
  clientes: 5,           // Actualizar con ID real
}

interface ContactPayload {
  email: string
  name?: string
  source?: string
  interest?: string
  supabase_id: string
  table: 'email_leads' | 'contact_submissions'
}

serve(async (req) => {
  try {
    const payload: ContactPayload = await req.json()
    
    // Determinar lista basada en origen
    let listIds: number[] = []
    
    if (payload.table === 'email_leads') {
      listIds = [BREVO_LISTS.leads_frios]
    } else if (payload.table === 'contact_submissions') {
      switch (payload.interest) {
        case 'mentoria':
          listIds = [BREVO_LISTS.leads_mentoria]
          break
        case 'senales':
          listIds = [BREVO_LISTS.leads_senales]
          break
        case 'desarrollo':
          listIds = [BREVO_LISTS.leads_desarrollo]
          break
        default:
          listIds = [BREVO_LISTS.leads_frios]
      }
    }
    
    // Crear/actualizar contacto en Brevo
    const brevoResponse = await fetch(`${BREVO_API_URL}/contacts`, {
      method: 'POST',
      headers: {
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: payload.email,
        attributes: {
          FIRSTNAME: payload.name || '',
          SOURCE: payload.source || 'website',
          INTEREST: payload.interest || '',
          SUPABASE_ID: payload.supabase_id,
          PIPELINE_STAGE: 'new',
          LEAD_SCORE: 0,
        },
        listIds: listIds,
        updateEnabled: true, // Actualizar si ya existe
      }),
    })
    
    const brevoData = await brevoResponse.json()
    
    // Actualizar Supabase con el ID de Brevo
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)
    
    const tableName = payload.table
    await supabase
      .from(tableName)
      .update({
        brevo_contact_id: brevoData.id?.toString() || payload.email,
        brevo_list_ids: listIds,
      })
      .eq('id', payload.supabase_id)
    
    return new Response(
      JSON.stringify({ success: true, brevo_id: brevoData.id }),
      { headers: { 'Content-Type': 'application/json' } }
    )
    
  } catch (error) {
    console.error('Error syncing to Brevo:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
})
```

### 2.2 Trigger para sincronización automática

Agrega este trigger en Supabase (SQL Editor):

```sql
-- Función para llamar a la Edge Function
CREATE OR REPLACE FUNCTION sync_lead_to_brevo()
RETURNS TRIGGER AS $$
DECLARE
  payload JSONB;
  edge_function_url TEXT;
BEGIN
  edge_function_url := current_setting('app.settings.supabase_url', true) || '/functions/v1/sync-to-brevo';
  
  IF TG_TABLE_NAME = 'email_leads' THEN
    payload := jsonb_build_object(
      'email', NEW.email,
      'source', NEW.source,
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
  
  -- Usar pg_net para llamar a la Edge Function
  PERFORM net.http_post(
    url := edge_function_url,
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key', true)
    ),
    body := payload
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers en las tablas
CREATE TRIGGER on_email_lead_created
  AFTER INSERT ON email_leads
  FOR EACH ROW
  EXECUTE FUNCTION sync_lead_to_brevo();

CREATE TRIGGER on_contact_created
  AFTER INSERT ON contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION sync_lead_to_brevo();
```

---

## Paso 3: Webhook de Brevo → Supabase

### 3.1 Edge Function para recibir eventos de Brevo

```typescript
// supabase/functions/brevo-webhook/index.ts

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  try {
    const event = await req.json()
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)
    
    const email = event.email
    const eventType = event.event // 'delivered', 'opened', 'click', 'unsubscribe', etc.
    
    // Buscar en ambas tablas
    const { data: emailLead } = await supabase
      .from('email_leads')
      .select('id, emails_sent, emails_opened, emails_clicked')
      .eq('email', email)
      .single()
    
    const { data: contact } = await supabase
      .from('contact_submissions')
      .select('id, emails_sent, emails_opened, emails_clicked')
      .eq('email', email)
      .single()
    
    // Actualizar según el evento
    const updateData: Record<string, any> = {}
    
    switch (eventType) {
      case 'delivered':
      case 'sent':
        updateData.emails_sent = (emailLead?.emails_sent || contact?.emails_sent || 0) + 1
        updateData.last_email_sent_at = new Date().toISOString()
        break
        
      case 'opened':
      case 'open':
        updateData.emails_opened = (emailLead?.emails_opened || contact?.emails_opened || 0) + 1
        updateData.last_email_opened_at = new Date().toISOString()
        updateData.pipeline_stage = 'engaged'
        break
        
      case 'click':
        updateData.emails_clicked = (emailLead?.emails_clicked || contact?.emails_clicked || 0) + 1
        updateData.last_email_clicked_at = new Date().toISOString()
        updateData.pipeline_stage = 'interested'
        break
        
      case 'unsubscribe':
        updateData.subscribed = false
        updateData.pipeline_stage = 'unsubscribed'
        break
        
      case 'hard_bounce':
      case 'soft_bounce':
        updateData.subscribed = false
        updateData.pipeline_stage = 'inactive'
        break
    }
    
    // Aplicar actualización
    if (emailLead) {
      await supabase
        .from('email_leads')
        .update(updateData)
        .eq('id', emailLead.id)
    }
    
    if (contact) {
      await supabase
        .from('contact_submissions')
        .update(updateData)
        .eq('id', contact.id)
    }
    
    return new Response(
      JSON.stringify({ success: true }),
      { headers: { 'Content-Type': 'application/json' } }
    )
    
  } catch (error) {
    console.error('Brevo webhook error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
})
```

### 3.2 Configurar Webhook en Brevo

1. Ve a **Settings → Webhooks** en Brevo
2. Crea un nuevo webhook con:
   - **URL:** `https://rxnbcalyoinzghlgjjtz.supabase.co/functions/v1/brevo-webhook`
   - **Events:** `sent`, `opened`, `clicked`, `unsubscribe`, `hard_bounce`

---

## Paso 4: Configurar Automaciones en Brevo

### 4.1 Secuencia Leads Fríos

En **Automation → Create an automation**:

**Trigger:** Contact added to list "leads-frios"

**Workflow:**
1. Email 1 (inmediato) - Bienvenida
2. Wait 2 days
3. Email 2 - Pain Point
4. Wait 2 days
5. Email 3 - Diferenciación
6. Wait 3 days
7. Email 4 - Prueba Social
8. Wait 3 days
9. Email 5 - Servicios
10. Wait 4 days
11. Email 6 - Oferta
12. Wait 7 days
13. Email 7 - Re-engagement
14. If no click → Move to list "inactive"
15. If click → Move to list based on clicked link

### 4.2 Secuencia Leads Mentoría

**Trigger:** Contact added to list "leads-mentoria"

**Workflow:**
1. Email 1 (inmediato) - Respuesta
2. Wait 2 days
3. Email 2 - Valor
4. Wait 3 days
5. Email 3 - Último seguimiento
6. If no response → Move to "nurture" for re-engagement later

### 4.3 Secuencia Leads Señales

**Trigger:** Contact added to list "leads-senales"

(Similar estructura a mentoría)

---

## Paso 5: Variables de Entorno

### En Supabase (Edge Functions):

```bash
supabase secrets set BREVO_API_KEY=your_brevo_api_key
```

### Listas de IDs de Brevo:

Después de crear las listas en Brevo, actualiza los IDs en la Edge Function.

---

## Queries Útiles

### Ver pipeline completo
```sql
SELECT 
  pipeline_stage,
  COUNT(*) as total,
  AVG(lead_score) as avg_score
FROM email_leads
GROUP BY pipeline_stage
ORDER BY total DESC;
```

### Leads listos para seguimiento
```sql
SELECT * FROM contact_submissions
WHERE pipeline_stage IN ('new', 'contacted')
  AND next_followup_at <= NOW()
ORDER BY lead_score DESC, priority DESC;
```

### Tasa de conversión por fuente
```sql
SELECT 
  source,
  COUNT(*) as total_leads,
  COUNT(*) FILTER (WHERE pipeline_stage = 'converted') as converted,
  ROUND(100.0 * COUNT(*) FILTER (WHERE pipeline_stage = 'converted') / COUNT(*), 2) as conversion_rate
FROM email_leads
GROUP BY source;
```

### Leads más engaged
```sql
SELECT 
  email,
  lead_score,
  emails_opened,
  emails_clicked,
  pipeline_stage
FROM email_leads
WHERE lead_score > 50
ORDER BY lead_score DESC
LIMIT 20;
```

---

## Checklist de Implementación

- [x] Crear cuenta en Brevo
- [x] Verificar dominio en Brevo
- [x] Obtener API Key de Brevo
- [x] Crear listas de contactos (IDs: 8, 9, 10, 11, 12)
- [x] Crear atributos personalizados (NOMBRE, SOURCE, INTEREST, SUPABASE_ID, PIPELINE_STAGE, LEAD_SCORE)
- [x] Desplegar Edge Function `sync-to-brevo` (v7, verify_jwt=false)
- [x] Desplegar Edge Function `brevo-webhook` (v3, verify_jwt=false)
- [x] Configurar webhook en Brevo (Marketing emails, todos los eventos)
- [x] Desactivar restricción de IP en Brevo
- [x] Probar flujo completo con email de prueba ✅
- [ ] Crear plantillas de email en Brevo
- [ ] Configurar automatizaciones (Paso 4)
- [ ] Monitorear primeros días

### URLs de Producción

| Servicio | URL |
|----------|-----|
| sync-to-brevo | `https://rxnbcalyoinzghlgjjtz.supabase.co/functions/v1/sync-to-brevo` |
| brevo-webhook | `https://rxnbcalyoinzghlgjjtz.supabase.co/functions/v1/brevo-webhook` |
| Supabase Dashboard | `https://supabase.com/dashboard/project/rxnbcalyoinzghlgjjtz` |

