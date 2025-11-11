import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error("ERRO: As chaves do Supabase não foram carregadas do .env!");
  throw new Error("Chaves do Supabase não encontradas. Verifique seu arquivo .env");
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const auth = supabase.auth;
export const db = supabase.from; 