/// <reference types="astro/client" />
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Supabase client initialization
// For SSR/build time
let supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
let supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

// For client-side, read from meta tags if env vars are empty
if (typeof window !== 'undefined' && (!supabaseUrl || !supabaseAnonKey)) {
  const urlMeta = document.querySelector('meta[name="supabase-url"]');
  const keyMeta = document.querySelector('meta[name="supabase-anon-key"]');
  supabaseUrl = urlMeta?.getAttribute('content') || '';
  supabaseAnonKey = keyMeta?.getAttribute('content') || '';
}

export const supabase: SupabaseClient = createClient(supabaseUrl || '', supabaseAnonKey || '');

// Types for our tables
export interface ContactSubmission {
  id?: string;
  name: string;
  email: string;
  interest: string;
  message: string;
  created_at?: string;
  read?: boolean;
  notes?: string;
}

export interface EmailLead {
  id?: string;
  email: string;
  source?: string;
  created_at?: string;
  subscribed?: boolean;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

// Helper functions
export async function submitContactForm(data: ContactSubmission) {
  const { error } = await supabase
    .from('contact_submissions')
    .insert([data]);
  
  if (error) throw error;
  return { success: true };
}

export async function submitEmailLead(data: EmailLead) {
  const { error } = await supabase
    .from('email_leads')
    .upsert([data], { onConflict: 'email' }); // Upsert to avoid duplicates
  
  if (error) throw error;
  return { success: true };
}
