import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nocyxgaotsirkvbnciox.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vY3l4Z2FvdHNpcmt2Ym5jaW94Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ4ODk5NzcsImV4cCI6MjA1MDQ2NTk3N30.hIRybJ3qUWEOF5JLUN6svRJzDiYPfC9k694jUnGiuJA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
  }
});