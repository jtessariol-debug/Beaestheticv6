import { supabase } from './supabase';

// Forzamos el ID que vimos en tu base de datos
const SITE_ID = 'home';

export async function getSiteContent() {
    if (!supabase) {
        return {
            data: null,
            error: new Error('Supabase no esta configurado.'),
        };
    }

    return supabase
        .from('site_content')
        .select('*')
        .eq('id', SITE_ID) // <--- Siempre busca 'home'
        .single();
}

export async function saveSiteContent(content: any) {
    if (!supabase) {
        return {
            data: null,
            error: new Error('Supabase no esta configurado.'),
        };
    }

    // Usamos upsert asegurando que el ID sea 'home'
    // Esto sobreescribirá la fila existente en lugar de crear una nueva
    return supabase
        .from('site_content')
        .upsert({
            id: SITE_ID, 
            content: content,
            updated_at: new Date().toISOString(),
        }, {
            onConflict: 'id' // Esto le dice a Supabase: "Si el ID 'home' ya existe, actualízalo"
        });
}
