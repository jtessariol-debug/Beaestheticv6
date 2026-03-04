import React, { useEffect, useMemo, useState } from 'react';
import { clearDemoAdminSession } from '../adminAuth';
import {
    MAX_ORIGINAL_IMAGE_BYTES,
    Product,
    fileToDataUrl,
    getErrorMessage,
    normalizeProductImageUrl,
    optimizeImageForUpload,
    supabase,
    uploadImageToProductStorage,
} from '../supabase';

const emptyDraft = {
    name: '',
    price: 0,
    description: '',
    image_url: '',
    stock: 0,
};

const LOCAL_PRODUCTS_KEY = 'be-products-local:v1';

const parseNumericInput = (value: string): number => {
    const next = Number(value);
    return Number.isFinite(next) ? next : 0;
};

const normalizeProduct = (raw: Partial<Product> | null | undefined): Product => ({
    id: String(raw?.id ?? crypto.randomUUID()),
    name: String(raw?.name ?? ''),
    price: Number(raw?.price ?? 0) || 0,
    description: String(raw?.description ?? ''),
    image_url: normalizeProductImageUrl(String(raw?.image_url ?? '')),
    stock: Number(raw?.stock ?? 0) || 0,
    created_at: String(raw?.created_at ?? new Date().toISOString()),
});

const SupabaseProductDashboard: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [draft, setDraft] = useState(emptyDraft);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isLocalMode, setIsLocalMode] = useState<boolean>(!supabase);

    const selectedProduct = useMemo(
        () => products.find((product) => product.id === selectedId) ?? null,
        [products, selectedId]
    );

    const persistLocalProducts = (next: Product[]) => {
        try {
            window.localStorage.setItem(LOCAL_PRODUCTS_KEY, JSON.stringify(next));
        } catch (persistError) {
            setError(
                `No se pudo guardar en modo local. Reduce el tamano de las imagenes y reintenta. (${getErrorMessage(
                    persistError
                )})`
            );
        }
    };

    const loadProducts = async () => {
        if (!supabase) {
            setIsLocalMode(true);
            try {
                const saved = window.localStorage.getItem(LOCAL_PRODUCTS_KEY);
                const parsed = saved ? (JSON.parse(saved) as Product[]) : [];
                const rows = parsed.map((product) => normalizeProduct(product));
                setProducts(rows);
                setSelectedId((prev) => prev ?? rows[0]?.id ?? null);
            } catch {
                setProducts([]);
                setSelectedId(null);
            } finally {
                setLoading(false);
            }
            return;
        }

        setLoading(true);
        setIsLocalMode(false);
        setError(null);
        try {
            const { data, error: queryError } = await supabase
                .from('products')
                .select('*')
                .order('created_at', { ascending: false });
            if (queryError) {
                setError(queryError.message);
                return;
            }

            const rows = (data ?? []).map((product) => normalizeProduct(product as Product));
            setProducts(rows);
            setSelectedId((prev) => {
                if (prev && rows.some((item) => item.id === prev)) return prev;
                return rows[0]?.id ?? null;
            });
        } catch (queryCrash) {
            setError(getErrorMessage(queryCrash));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    useEffect(() => {
        if (!selectedProduct) return;
        setDraft({
            name: selectedProduct.name,
            price: selectedProduct.price,
            description: selectedProduct.description ?? '',
            image_url: normalizeProductImageUrl(selectedProduct.image_url ?? ''),
            stock: selectedProduct.stock ?? 0,
        });
    }, [selectedProduct]);

    const createProduct = async () => {
        if (!supabase) {
            const newProduct: Product = {
                id: crypto.randomUUID(),
                name: 'Nuevo producto',
                price: 0,
                description: '',
                image_url: '',
                stock: 0,
                created_at: new Date().toISOString(),
            };
            const next = [newProduct, ...products];
            setProducts(next);
            persistLocalProducts(next);
            setSelectedId(newProduct.id);
            return;
        }
        setSaving(true);
        setError(null);
        try {
            const { data, error: insertError } = await supabase
                .from('products')
                .insert({
                    name: 'Nuevo producto',
                    price: 0,
                    description: '',
                    image_url: '',
                    stock: 0,
                })
                .select('*')
                .single();
            if (insertError) {
                setError(insertError.message);
                return;
            }
            const newProduct = normalizeProduct(data as Product);
            setProducts((prev) => [newProduct, ...prev]);
            setSelectedId(newProduct.id);
        } catch (insertCrash) {
            setError(getErrorMessage(insertCrash));
        } finally {
            setSaving(false);
        }
    };

    const saveProduct = async () => {
        if (!selectedId) return;
        const normalizedImageUrl = normalizeProductImageUrl(draft.image_url);

        if (!supabase) {
            const next = products.map((item) =>
                item.id === selectedId
                    ? {
                          ...item,
                          name: draft.name,
                          price: draft.price,
                          description: draft.description,
                          image_url: normalizedImageUrl,
                          stock: draft.stock,
                      }
                    : item
            );
            setProducts(next);
            persistLocalProducts(next);
            setDraft((prev) => ({ ...prev, image_url: normalizedImageUrl }));
            return;
        }

        setSaving(true);
        setError(null);
        try {
            const { data, error: updateError } = await supabase
                .from('products')
                .update({
                    name: draft.name,
                    price: draft.price,
                    description: draft.description,
                    image_url: normalizedImageUrl,
                    stock: draft.stock,
                })
                .eq('id', selectedId)
                .select('*')
                .single();
            if (updateError) {
                setError(updateError.message);
                return;
            }
            const updated = normalizeProduct(data as Product);
            setProducts((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
            setDraft({
                name: updated.name,
                price: updated.price,
                description: updated.description ?? '',
                image_url: updated.image_url ?? '',
                stock: updated.stock ?? 0,
            });
        } catch (updateCrash) {
            setError(getErrorMessage(updateCrash));
        } finally {
            setSaving(false);
        }
    };

    const deleteProduct = async () => {
        if (!selectedId) return;
        if (!supabase) {
            const next = products.filter((item) => item.id !== selectedId);
            setProducts(next);
            persistLocalProducts(next);
            setSelectedId(null);
            setDraft(emptyDraft);
            return;
        }
        setSaving(true);
        setError(null);
        try {
            const { error: deleteError } = await supabase.from('products').delete().eq('id', selectedId);
            if (deleteError) {
                setError(deleteError.message);
                return;
            }
            setProducts((prev) => prev.filter((item) => item.id !== selectedId));
            setSelectedId(null);
            setDraft(emptyDraft);
        } catch (deleteCrash) {
            setError(getErrorMessage(deleteCrash));
        } finally {
            setSaving(false);
        }
    };

    const uploadImage = async (file: File) => {
        if (!selectedId) {
            setError('Primero selecciona o crea un producto.');
            return;
        }

        setError(null);
        setSaving(true);
        setUploadingImage(true);

        try {
            if (!supabase) {
                const optimized = await optimizeImageForUpload(file);
                const dataUrl = await fileToDataUrl(optimized);
                const nextUrl = normalizeProductImageUrl(dataUrl);

                setDraft((prev) => ({ ...prev, image_url: nextUrl }));
                const next = products.map((item) => (item.id === selectedId ? { ...item, image_url: nextUrl } : item));
                setProducts(next);
                persistLocalProducts(next);
                return;
            }

            const { publicUrl } = await uploadImageToProductStorage(file);
            const nextUrl = normalizeProductImageUrl(publicUrl);

            setDraft((prev) => ({ ...prev, image_url: nextUrl }));

            const { data, error: updateError } = await supabase
                .from('products')
                .update({ image_url: nextUrl })
                .eq('id', selectedId)
                .select('*')
                .single();

            if (updateError) {
                setError(`Imagen subida, pero no se pudo guardar la URL: ${updateError.message}`);
                return;
            }

            const updated = normalizeProduct(data as Product);
            setProducts((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
            setDraft({
                name: updated.name,
                price: updated.price,
                description: updated.description ?? '',
                image_url: updated.image_url ?? '',
                stock: updated.stock ?? 0,
            });
        } catch (uploadCrash) {
            setError(getErrorMessage(uploadCrash));
        } finally {
            setSaving(false);
            setUploadingImage(false);
        }
    };

    const signOut = async () => {
        clearDemoAdminSession();
        if (supabase) {
            try {
                await supabase.auth.signOut();
            } catch {
                // noop: forzar salida visual aunque el signOut remoto falle.
            }
        }
        window.location.hash = '#login';
    };

    return (
        <main className="min-h-screen bg-brand-beige-dark py-8">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="mb-6 rounded-xl border border-brand-brown/10 bg-white p-5 shadow-sm flex items-center justify-between">
                    <div>
                        <h1 className="font-serif text-3xl text-brand-brown">Dashboard Productos</h1>
                        <p className="text-sm text-brand-gray mt-1">CRUD conectado a Supabase + Storage.</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <a
                            href="#admin-contenido"
                            className="rounded-md border border-brand-brown/30 px-4 py-2 text-sm text-brand-brown"
                        >
                            Contenido
                        </a>
                        <a href="#" className="rounded-md border border-brand-brown/30 px-4 py-2 text-sm text-brand-brown">
                            Ver sitio
                        </a>
                        <button
                            type="button"
                            onClick={signOut}
                            className="rounded-md border border-red-300 px-4 py-2 text-sm text-red-700"
                        >
                            Cerrar sesion
                        </button>
                    </div>
                </div>

                {isLocalMode && (
                    <p className="mb-4 rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-800">
                        Modo local activo: los cambios se guardan en este navegador.
                    </p>
                )}
                {error && <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr]">
                    <aside className="rounded-xl border border-brand-brown/10 bg-white p-3">
                        <button
                            type="button"
                            onClick={createProduct}
                            disabled={saving}
                            className="mb-3 w-full rounded-md border border-brand-brown/30 px-3 py-2 text-sm font-medium text-brand-brown"
                        >
                            + Nuevo producto
                        </button>
                        <div className="max-h-[560px] space-y-1 overflow-y-auto pr-1">
                            {loading ? (
                                <p className="text-sm text-brand-gray px-2 py-2">Cargando...</p>
                            ) : (
                                products.map((product) => (
                                    <button
                                        key={product.id}
                                        type="button"
                                        onClick={() => setSelectedId(product.id)}
                                        className={`w-full rounded-md px-3 py-2 text-left text-sm ${
                                            selectedId === product.id ? 'bg-brand-brown text-brand-white' : 'hover:bg-brand-beige'
                                        }`}
                                    >
                                        {product.name}
                                    </button>
                                ))
                            )}
                        </div>
                    </aside>

                    <section className="rounded-xl border border-brand-brown/10 bg-white p-4 sm:p-6">
                        {!selectedId ? (
                            <p className="text-sm text-brand-gray">Selecciona un producto para editarlo.</p>
                        ) : (
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <label className="mb-1 block text-xs uppercase tracking-wide text-brand-gray">Nombre</label>
                                        <input
                                            className="w-full rounded-md border border-brand-brown/20 px-3 py-2 text-sm"
                                            value={draft.name}
                                            onChange={(e) => setDraft((prev) => ({ ...prev, name: e.target.value }))}
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-1 block text-xs uppercase tracking-wide text-brand-gray">Precio</label>
                                        <input
                                            type="number"
                                            className="w-full rounded-md border border-brand-brown/20 px-3 py-2 text-sm"
                                            value={draft.price}
                                            onChange={(e) => setDraft((prev) => ({ ...prev, price: parseNumericInput(e.target.value) }))}
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-1 block text-xs uppercase tracking-wide text-brand-gray">Stock</label>
                                        <input
                                            type="number"
                                            className="w-full rounded-md border border-brand-brown/20 px-3 py-2 text-sm"
                                            value={draft.stock}
                                            onChange={(e) => setDraft((prev) => ({ ...prev, stock: parseNumericInput(e.target.value) }))}
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-1 block text-xs uppercase tracking-wide text-brand-gray">Subir imagen</label>
                                        <input
                                            type="file"
                                            accept="image/jpeg,image/jpg,image/png,image/webp,image/avif"
                                            className="w-full rounded-md border border-brand-brown/20 px-3 py-2 text-sm disabled:opacity-60"
                                            disabled={saving || uploadingImage}
                                            onChange={(event) => {
                                                const input = event.currentTarget;
                                                const file = input.files?.[0];
                                                input.value = '';
                                                if (file) void uploadImage(file);
                                            }}
                                        />
                                        <p className="mt-1 text-xs text-brand-gray">
                                            JPG, PNG, WEBP o AVIF. Maximo {Math.round(MAX_ORIGINAL_IMAGE_BYTES / (1024 * 1024))}MB
                                            (se optimiza automaticamente).
                                        </p>
                                    </div>
                                    {draft.image_url && (
                                        <div className="md:col-span-2">
                                            <img
                                                src={normalizeProductImageUrl(draft.image_url)}
                                                alt={draft.name}
                                                className="h-56 w-full rounded-lg border border-brand-brown/10 object-cover"
                                                onError={() => setError('La URL de la imagen no es valida o no es publica.')}
                                            />
                                        </div>
                                    )}
                                    <div className="md:col-span-2">
                                        <label className="mb-1 block text-xs uppercase tracking-wide text-brand-gray">Descripcion</label>
                                        <textarea
                                            className="w-full min-h-[140px] rounded-md border border-brand-brown/20 px-3 py-2 text-sm"
                                            value={draft.description}
                                            onChange={(e) => setDraft((prev) => ({ ...prev, description: e.target.value }))}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={saveProduct}
                                        disabled={saving || uploadingImage}
                                        className="rounded-md bg-brand-brown text-brand-white px-4 py-2 text-sm font-medium disabled:opacity-60"
                                    >
                                        {uploadingImage ? 'Subiendo imagen...' : saving ? 'Guardando...' : 'Guardar cambios'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={deleteProduct}
                                        disabled={saving || uploadingImage}
                                        className="rounded-md border border-red-300 px-4 py-2 text-sm text-red-700 disabled:opacity-60"
                                    >
                                        Eliminar producto
                                    </button>
                                </div>
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </main>
    );
};

export default SupabaseProductDashboard;
