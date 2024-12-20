import { createClient } from '@supabase/supabase-js';
import { env } from './env';
import { SITE_URL } from './constants';

export const supabase = createClient(
  env.get('VITE_SUPABASE_URL'),
  env.get('VITE_SUPABASE_ANON_KEY'),
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      flowType: 'pkce',
      redirectTo: `${SITE_URL}/auth/callback`
    }
  }
);