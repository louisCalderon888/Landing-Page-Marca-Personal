/// <reference types="astro/client" />
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
