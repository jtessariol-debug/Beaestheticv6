import React, { useEffect, useMemo, useState } from 'react';
import { clearDemoAdminSession } from '../adminAuth';
import { Product, supabase } from '../supabase';

const emptyDraft = {
    name: '',
    price: 0,
    description: '',
    image_url: '',
    stock: 0,
};

const LOCAL_PRODUCTS_KEY = 'be-products-local:v1';

const SupabaseProductDashboard: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [draft, setDraft] = useState(emptyDraft);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isLocalMode, setIsLocalMode] = useState<boolean>(!supabase);

    const selectedProduct = useMemo(
        () => products.find((product) => product.id === selectedId) ?? null,
        [products, selectedId]
    );

    const persistLocalProducts = (next: Product[]) => {
        window.localStorage.setItem(LOCAL_PRODUCTS_KEY, JSON.stringify(next));
    };

    const loadProducts = async () => {
        if (!supabase) {
            setLoading(false);
            setIsLocalMode(true);
            try {
                const saved = window.localStorage.getItem(LOCAL_PRODUCTS_KEY);
                const parsed = saved ? (JSON.parse(saved) as Product[]) : [];
                setProducts(parsed);
            } catch {
                setProducts([]);
            }
            return;
        }
        setLoading(true);
        setIsLocalMode(false);
        setError(null);
        const { data, error: queryError } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });
        setLoading(false);
        if (queryError) {
            setError(queryError.message);
            return;
        }
        const rows = (data ?? []) as Product[];
        setProducts(rows);
        if (!selectedId && rows[0]) {
            setSelectedId(rows[0].id);
            setDraft({
                name: rows[0].name,
                price: rows[0].price,
                description: rows[0].description ?? '',
                image_url: rows[0].image_url ?? '',
                stock: rows[0].stock ?? 0,
            });
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
            image_url: selectedProduct.image_url ?? '',
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
        setSaving(false);
        if (insertError) {
            setError(insertError.message);
            return;
        }
        const newProduct = data as Product;
        setProducts((prev) => [newProduct, ...prev]);
        setSelectedId(newProduct.id);
    };

    const saveProduct = async () => {
        if (!selectedId) return;
        if (!supabase) {
            const next = products.map((item) =>
                item.id === selectedId
                    ? {
                          ...item,
                          name: draft.name,
                          price: draft.price,
                          description: draft.description,
                          image_url: draft.image_url,
                          stock: draft.stock,
                      }
                    : item
            );
            setProducts(next);
            persistLocalProducts(next);
            return;
        }
        setSaving(true);
        setError(null);
        const { data, error: updateError } = await supabase
            .from('products')
            .update({
                name: draft.name,
                price: draft.price,
                description: draft.description,
                image_url: draft.image_url,
                stock: draft.stock,
            })
            .eq('id', selectedId)
            .select('*')
            .single();
        setSaving(false);
        if (updateError) {
            setError(updateError.message);
            return;
        }
        const updated = data as Product;
        setProducts((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
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
        const { error: deleteError } = await supabase.from('products').delete().eq('id', selectedId);
        setSaving(false);
        if (deleteError) {
            setError(deleteError.message);
            return;
        }
        setProducts((prev) => prev.filter((item) => item.id !== selectedId));
        setSelectedId(null);
        setDraft(emptyDraft);
    };

    const uploadImage = async (file: File) => {
        if (!selectedId) return;
        if (!supabase) {
            const reader = new FileReader();
            reader.onload = () => {
                const dataUrl = typeof reader.result === 'string' ? reader.result : '';
                setDraft((prev) => ({ ...prev, image_url: dataUrl }));
            };
            reader.readAsDataURL(file);
            return;
        }
        setSaving(true);
        setError(null);
        const safeName = file.name.replace(/\s+/g, '-').toLowerCase();
        const path = `public/${Date.now()}-${safeName}`;
        const { error: uploadError } = await supabase.storage.from('products').upload(path, file, {
            upsert: false,
        });
        if (uploadError) {
            setSaving(false);
            setError(uploadError.message);
            return;
        }
        const { data } = supabase.storage.from('products').getPublicUrl(path);
        setDraft((prev) => ({ ...prev, image_url: data.publicUrl }));
        setSaving(false);
    };

    const signOut = async () => {
        clearDemoAdminSession();
        if (supabase) {
            await supabase.auth.signOut();
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
                                            onChange={(e) => setDraft((prev) => ({ ...prev, price: Number(e.target.value) }))}
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-1 block text-xs uppercase tracking-wide text-brand-gray">Stock</label>
                                        <input
                                            type="number"
                                            className="w-full rounded-md border border-brand-brown/20 px-3 py-2 text-sm"
                                            value={draft.stock}
                                            onChange={(e) => setDraft((prev) => ({ ...prev, stock: Number(e.target.value) }))}
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-1 block text-xs uppercase tracking-wide text-brand-gray">Subir imagen</label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="w-full rounded-md border border-brand-brown/20 px-3 py-2 text-sm"
                                            onChange={(event) => {
                                                const file = event.target.files?.[0];
                                                if (file) void uploadImage(file);
                                            }}
                                        />
                                    </div>
                                    {draft.image_url && (
                                        <div className="md:col-span-2">
                                            <img
                                                src={draft.image_url}
                                                alt={draft.name}
                                                className="h-56 w-full rounded-lg border border-brand-brown/10 object-cover"
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
                                        disabled={saving}
                                        className="rounded-md bg-brand-brown text-brand-white px-4 py-2 text-sm font-medium disabled:opacity-60"
                                    >
                                        {saving ? 'Guardando...' : 'Guardar cambios'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={deleteProduct}
                                        disabled={saving}
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
