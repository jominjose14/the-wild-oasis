import { createClient } from '@supabase/supabase-js';

export const TABLE_PREFIX = 'wild-oasis-';
export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
