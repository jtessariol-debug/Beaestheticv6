import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Service, ServiceCategory } from './types';

// 1. Configuración de Variables de Entorno
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// 2. Validación Robusta de Configuración
export const isSupabaseConfigured = Boolean(
    supabaseUrl && 
    supabaseAnonKey && 
    supabaseUrl.startsWith('https://') &&
    !supabaseUrl.includes('YOUR_SUPABASE_URL')
);

// 3. Inicialización del Cliente (Singleton)
export const supabase = isSupabaseConfigured 
    ? createClient(supabaseUrl, supabaseAnonKey) 
    : null;

// Log preventivo solo en desarrollo
if (!supabase && import.meta.env.DEV) {
    console.warn("⚠️ Supabase no está configurado correctamente. Verifica el archivo .env");
}

// --- Constantes de Almacenamiento ---
const ONE_MB = 1024 * 1024;
export const PRODUCT_IMAGE_BUCKET = 'products';
export const MAX_ORIGINAL_IMAGE_BYTES = 12 * ONE_MB;
export const MAX_PROCESSED_IMAGE_BYTES = 2 * ONE_MB;
export const DEFAULT_MAX_IMAGE_DIMENSION = 1600;

const ALLOWED_IMAGE_TYPES = new Set(['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/avif']);

// --- Utilidades de Error y Formateo ---
const getErrorMessage = (error: unknown): string =>
    error instanceof Error ? error.message : 'Ocurrio un error inesperado.';

const sanitizeFileName = (name: string): string => {
    const withoutExt = name.replace(/\.[^.]+$/, '');
    return withoutExt
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z0-9_-]+/g, '-')
        .replace(/-{2,}/g, '-')
        .replace(/^-|-$/g, '')
        .toLowerCase() || 'imagen';
};

// --- Lógica de Procesamiento de Imágenes ---
const loadImageElement = (file: Blob): Promise<{ image: HTMLImageElement; revoke: () => void }> =>
    new Promise((resolve, reject) => {
        const objectUrl = URL.createObjectURL(file);
        const image = new Image();
        image.onload = () => resolve({ image, revoke: () => URL.revokeObjectURL(objectUrl) });
        image.onerror = () => {
            URL.revokeObjectURL(objectUrl);
            reject(new Error('No se pudo leer la imagen seleccionada.'));
        };
        image.src = objectUrl;
    });

const canvasToBlob = (canvas: HTMLCanvasElement, type: string, quality: number): Promise<Blob> =>
    new Promise((resolve, reject) => {
        canvas.toBlob(
            (blob) => {
                if (!blob) {
                    reject(new Error('No se pudo procesar la imagen.'));
                    return;
                }
                resolve(blob);
            },
            type,
            quality
        );
    });

export const optimizeImageForUpload = async (
    file: File,
    options?: {
        maxOriginalBytes?: number;
        maxProcessedBytes?: number;
        maxDimension?: number;
    }
): Promise<File> => {
    const maxOriginalBytes = options?.maxOriginalBytes ?? MAX_ORIGINAL_IMAGE_BYTES;
    const maxProcessedBytes = options?.maxProcessedBytes ?? MAX_PROCESSED_IMAGE_BYTES;
    const maxDimension = options?.maxDimension ?? DEFAULT_MAX_IMAGE_DIMENSION;

    if (!ALLOWED_IMAGE_TYPES.has(file.type.toLowerCase())) {
        throw new Error('Formato no soportado. Usa JPG, PNG, WEBP o AVIF.');
    }

    if (file.size > maxOriginalBytes) {
        throw new Error(`La imagen es demasiado grande. Máximo permitido: ${Math.round(maxOriginalBytes / ONE_MB)}MB.`);
    }

    if (typeof document === 'undefined') return file;

    const { image, revoke } = await loadImageElement(file);
    try {
        let width = image.naturalWidth;
        let height = image.naturalHeight;
        const largerSide = Math.max(width, height);

        if (largerSide > maxDimension) {
            const ratio = maxDimension / largerSide;
            width = Math.max(1, Math.round(width * ratio));
            height = Math.max(1, Math.round(height * ratio));
        }

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (!context) throw new Error('No se pudo preparar el compresor de imagen.');

        let quality = 0.88;
        let attempts = 0;
        let nextWidth = width;
        let nextHeight = height;
        let output: Blob | null = null;

        while (attempts < 7) {
            canvas.width = nextWidth;
            canvas.height = nextHeight;
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(image, 0, 0, canvas.width, canvas.height);

            output = await canvasToBlob(canvas, 'image/jpeg', quality);
            if (output.size <= maxProcessedBytes) break;

            if (quality > 0.62) {
                quality -= 0.1;
            } else {
                nextWidth = Math.max(640, Math.round(nextWidth * 0.85));
                nextHeight = Math.max(640, Math.round(nextHeight * 0.85));
            }
            attempts += 1;
        }

        if (!output || output.size > maxProcessedBytes) {
            throw new Error(`No se pudo reducir lo suficiente. Intenta una imagen más ligera.`);
        }

        const safeName = sanitizeFileName(file.name);
        return new File([output], `${safeName}.jpg`, {
            type: 'image/jpeg',
            lastModified: Date.now(),
        });
    } finally {
        revoke();
    }
};

// --- Funciones de Storage ---
const normalizeStorageObjectPath = (rawPath: string, bucket: string): string => {
    let next = decodeURIComponent(rawPath).trim();
    next = next.replace(/^https?:\/\/[^/]+\/storage\/v1\/object\/public\/[^/]+\//i, '');
    if (next.startsWith(`${bucket}/`)) {
        next = next.slice(bucket.length + 1);
    }
    return next.replace(/^\/+/, '').split('?')[0];
};

export const normalizeProductImageUrl = (rawUrl: string): string => {
    const trimmed = (rawUrl ?? '').trim();
    if (!trimmed || /^data:image\//i.test(trimmed) || /^blob:/i.test(trimmed) || /^https?:\/\//i.test(trimmed)) {
        return trimmed;
    }

    if (!supabase) return trimmed;

    const objectPath = normalizeStorageObjectPath(trimmed, PRODUCT_IMAGE_BUCKET);
    const { data } = supabase.storage.from(PRODUCT_IMAGE_BUCKET).getPublicUrl(objectPath);
    return data.publicUrl;
};

export const uploadImageToProductStorage = async (
    file: File,
    options?: { folder?: string; upsert?: boolean }
): Promise<{ publicUrl: string; path: string; uploadedFile: File }> => {
    if (!supabase) throw new Error('Supabase no está configurado.');

    const processed = await optimizeImageForUpload(file);
    const folder = options?.folder?.trim() || 'public';
    const uid = crypto.randomUUID();
    const safeName = sanitizeFileName(processed.name);
    const path = `${folder}/${uid}-${safeName}.jpg`;

    const { error: uploadError } = await supabase.storage.from(PRODUCT_IMAGE_BUCKET).upload(path, processed, {
        upsert: options?.upsert ?? false,
        cacheControl: '3600',
        contentType: processed.type,
    });

    if (uploadError) throw new Error(uploadError.message);

    const { data } = supabase.storage.from(PRODUCT_IMAGE_BUCKET).getPublicUrl(path);
    return { publicUrl: data.publicUrl, path, uploadedFile: processed };
};

// --- Helpers de Mapeo y Tipos ---
const stableStringHash = (value: string): number => {
    let hash = 0;
    for (let i = 0; i < value.length; i++) {
        hash = (hash << 5) - hash + value.charCodeAt(i);
        hash |= 0;
    }
    return hash;
};

export type RealtimeService = Service & { sourceId: string; isRealtime: true };
export type Product = { id: string; name: string; price: number; description: string; image_url: string; stock: number; created_at: string };

export const mapProductToRealtimeService = (product: Partial<Product>): RealtimeService => {
    const sourceId = String(product.id ?? '');
    const hashedId = Math.abs(stableStringHash(sourceId || `${product.name}-${product.created_at}`)) || 1;

    return {
        id: -hashedId,
        sourceId,
        isRealtime: true,
        name: String(product.name ?? 'Servicio'),
        category: ServiceCategory.ArmonizacionFacial,
        imageUrl: normalizeProductImageUrl(String(product.image_url ?? '')),
        description: String(product.description ?? ''),
    };
};

export { getErrorMessage };
