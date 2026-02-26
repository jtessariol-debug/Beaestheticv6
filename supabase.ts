import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

const hasValidUrl = Boolean(
    supabaseUrl &&
        /^https?:\/\//i.test(supabaseUrl) &&
        !supabaseUrl.includes('YOUR_SUPABASE_URL')
);
const hasValidAnonKey = Boolean(
    supabaseAnonKey &&
        !supabaseAnonKey.includes('YOUR_SUPABASE_ANON_KEY')
);

export const isSupabaseConfigured = Boolean(hasValidUrl && hasValidAnonKey);

let client = null;
if (isSupabaseConfigured) {
    try {
        client = createClient(supabaseUrl as string, supabaseAnonKey as string);
    } catch (error) {
        console.error('Supabase client init failed:', error);
        client = null;
    }
}

export const supabase = client;

export type Product = {
    id: string;
    name: string;
    price: number;
    description: string;
    image_url: string;
    stock: number;
    created_at: string;
};
