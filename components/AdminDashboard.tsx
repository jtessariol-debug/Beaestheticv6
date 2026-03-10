import React, { useMemo, useState } from 'react';
import {
    SiteContent,
    emptyLocationTemplate,
    emptyServiceTemplate,
    emptyTeamTemplate,
    emptyTechnologyTemplate,
    emptyTestimonialTemplate,
} from '../content';
import { supabase } from '../supabase';
import { ServiceCategory } from '../types';
import { saveRemoteSiteContent } from '../siteContentService'; // ← Asegúrate de importar esto

type AdminDashboardProps = {
    content: SiteContent;
    onChange: (next: SiteContent) => void;
    onReset: () => void;
    saveStatus: 'saving' | 'saved' | 'error';
};

type DashboardTab = 'general' | 'services' | 'technologies' | 'team' | 'testimonials' | 'locations';

const tabs: { id: DashboardTab; label: string }[] = [
    { id: 'general', label: 'General' },
    { id: 'services', label: 'Servicios' },
    { id: 'technologies', label: 'Tecnologia' },
    { id: 'team', label: 'Equipo' },
    { id: 'testimonials', label: 'Testimonios' },
    { id: 'locations', label: 'Sedes' },
];

const inputClass =
    'w-full rounded-md border border-brand-brown/20 bg-white px-3 py-2 text-sm text-brand-brown focus:border-brand-brown focus:outline-none';
const textareaClass = `${inputClass} min-h-[130px]`;

type ImageUploadInputProps = {
    label: string;
    value: string;
    onChange: (next: string) => void;
    onFileDrop: (file: File) => void;
    uploading?: boolean;
};

const ImageUploadInput: React.FC<ImageUploadInputProps> = ({ label, value, onChange, onFileDrop, uploading = false }) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleFiles = (files: FileList | null) => {
        const file = files?.[0];
        if (file) {
            onFileDrop(file);
        }
    };

    return (
        <div className="space-y-2">
            <label className="mb-1 block text-xs uppercase tracking-wide text-brand-gray">{label}</label>
            <input className={inputClass} value={value} onChange={(e) => onChange(e.target.value)} />
            <label
                onDragOver={(event) => {
                    event.preventDefault();
                    setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(event) => {
                    event.preventDefault();
                    setIsDragging(false);
                    handleFiles(event.dataTransfer.files);
                }}
                className={`flex cursor-pointer items-center justify-center rounded-md border-2 border-dashed px-4 py-4 text-sm transition-colors ${
                    isDragging
                        ? 'border-brand-brown bg-brand-beige text-brand-brown'
                        : 'border-brand-brown/30 text-brand-gray hover:border-brand-brown/60'
                }`}
            >
                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(event) => {
                        handleFiles(event.target.files);
                        event.currentTarget.value = '';
                    }}
                />
                {uploading ? 'Subiendo imagen...' : 'Drop files aqui o haz click para subir una imagen'}
            </label>
        </div>
    );
};

const AdminDashboard: React.FC<AdminDashboardProps> = ({ content, onChange, onReset, saveStatus }) => {
    const [activeTab, setActiveTab] = useState<DashboardTab>('general');
    const [serviceSearch, setServiceSearch] = useState('');
    const [selectedServiceId, setSelectedServiceId] = useState<number | null>(content.services[0]?.id ?? null);
    const [selectedTechId, setSelectedTechId] = useState<number | null>(content.technologies[0]?.id ?? null);
    const [selectedTeamId, setSelectedTeamId] = useState<number | null>(content.team[0]?.id ?? null);
    const [selectedTestimonialId, setSelectedTestimonialId] = useState<number | null>(content.testimonials[0]?.id ?? null);
    const [selectedLocationId, setSelectedLocationId] = useState<string | null>(content.locations[0]?.id ?? null);
    const [uploadingFieldKey, setUploadingFieldKey] = useState<string | null>(null);
    const [imageUploadError, setImageUploadError] = useState<string | null>(null);

    const updateContent = (updater: (prev: SiteContent) => SiteContent) => {
        onChange(updater(content));
    };

    const nextNumericId = (ids: number[]) => (ids.length ? Math.max(...ids) + 1 : 1);

    const filteredServices = useMemo(() => {
        if (!serviceSearch.trim()) {
            return content.services;
        }

        const search = serviceSearch.toLowerCase();
        return content.services.filter((service) => service.name.toLowerCase().includes(search));
    }, [content.services, serviceSearch]);

    const selectedService = content.services.find((service) => service.id === selectedServiceId) ?? null;
    const selectedTechnology = content.technologies.find((tech) => tech.id === selectedTechId) ?? null;
    const selectedTeamMember = content.team.find((member) => member.id === selectedTeamId) ?? null;
    const selectedTestimonial = content.testimonials.find((testimonial) => testimonial.id === selectedTestimonialId) ?? null;
    const selectedLocation = content.locations.find((location) => location.id === selectedLocationId) ?? null;
    const saveStatusLabel = saveStatus === 'saving' ? 'Guardando...' : saveStatus === 'error' ? 'Error al guardar' : 'Guardado';
    const saveStatusClass =
        saveStatus === 'saving'
            ? 'text-amber-700'
            : saveStatus === 'error'
                ? 'text-red-700'
                : 'text-emerald-700';

    const uploadImageForField = async (fieldKey: string, file: File, onUploaded: (url: string) => void) => {
        if (!file.type.startsWith('image/')) {
            setImageUploadError('Solo se permiten archivos de imagen.');
            return;
        }

        setImageUploadError(null);
        setUploadingFieldKey(fieldKey);

        if (!supabase) {
            const dataUrl = await new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(typeof reader.result === 'string' ? reader.result : '');
                reader.onerror = () => reject(new Error('No se pudo leer la imagen.'));
                reader.readAsDataURL(file);
            }).catch(() => '');

            setUploadingFieldKey(null);
            if (!dataUrl) {
                setImageUploadError('No se pudo procesar la imagen seleccionada.');
                return;
            }
            onUploaded(dataUrl);
            return;
        }

        const safeName = file.name.replace(/\s+/g, '-').toLowerCase();
        const path = `content/${Date.now()}-${safeName}`;
        const { error } = await supabase.storage.from('products').upload(path, file, { upsert: false });

        setUploadingFieldKey(null);
        if (error) {
            setImageUploadError(error.message);
            return;
        }

        const { data } = supabase.storage.from('products').getPublicUrl(path);
        onUploaded(data.publicUrl);
    };

    // Función para guardar todo el contenido
    const handleSave = async () => {
        console.log("Botón Guardar clicado - contenido a guardar:", content);
        try {
            // Llama a la función que ya tienes en siteContentService.ts
            const { error } = await saveRemoteSiteContent('home', content);
            if (error) {
                console.error("Error al guardar en Supabase:", error);
                alert("Hubo un error al guardar los cambios. Intenta de nuevo.");
                return;
            }
            console.log("Guardado exitoso en Supabase");
            alert("¡Cambios guardados correctamente! Se reflejarán en el sitio.");
        } catch (err) {
            console.error("Error inesperado al guardar:", err);
            alert("Error inesperado. Revisa la consola o contacta soporte.");
        }
    };

    return (
        <main className="min-h-screen bg-brand-beige-dark py-8">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="mb-6 rounded-xl border border-brand-brown/10 bg-white p-5 shadow-sm">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <p className="text-xs uppercase tracking-[0.3em] text-brand-gray">Panel de administracion</p>
                            <h1 className="font-serif text-3xl text-brand-brown">Dashboard de Contenido</h1>
                            <p className="mt-2 text-sm text-brand-gray">
                                Cambia textos, imagenes y bloques visuales del sitio. Los cambios se guardan automaticamente.
                            </p>
                            <p className={`mt-1 text-xs font-medium ${saveStatusClass}`}>{saveStatusLabel}</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                            <a
                                href="#admin"
                                className="rounded-md border border-brand-brown/30 px-4 py-2 text-sm font-medium text-brand-brown hover:bg-brand-beige"
                            >
                                Productos
                            </a>
                            <a
                                href="#"
                                className="rounded-md border border-brand-brown/30 px-4 py-2 text-sm font-medium text-brand-brown hover:bg-brand-beige"
                            >
                                Volver al sitio
                            </a>
                            <button
                                type="button"
                                onClick={onReset}
                                className="rounded-md border border-red-300 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
                            >
                                Restablecer valores
                            </button>
                        </div>
                    </div>
                </div>

                {imageUploadError && (
                    <p className="mb-6 rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">{imageUploadError}</p>
                )}

                {/* BOTÓN DE GUARDAR GLOBAL - FIJO EN LA PARTE SUPERIOR DERECHA */}
                <div className="mb-6 flex justify-end">
                    <button
                        type="button"
                        onClick={handleSave}
                        disabled={saveStatus === 'saving'}
                        className={`px-8 py-4 rounded-lg text-white font-bold transition-all shadow-md ${
                            saveStatus === 'saving'
                                ? 'bg-gray-500 cursor-not-allowed'
                                : 'bg-green-600 hover:bg-green-700 active:bg-green-800'
                        }`}
                    >
                        {saveStatus === 'saving' ? 'Guardando...' : 'Guardar Todos los Cambios'}
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[220px_1fr]">
                    <aside className="rounded-xl border border-brand-brown/10 bg-white p-3">
                        <nav className="space-y-1">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                                        activeTab === tab.id
                                            ? 'bg-brand-brown text-brand-white'
                                            : 'text-brand-brown hover:bg-brand-beige'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                    </aside>

                    <section className="rounded-xl border border-brand-brown/10 bg-white p-4 sm:p-6">
                        {activeTab === 'general' && (
                            <div className="space-y-8">
                                <div>
                                    <h2 className="font-serif text-2xl text-brand-brown">Hero</h2>
                                    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div>
                                            <label className="mb-1 block text-xs uppercase tracking-wide text-brand-gray">Titulo principal</label>
                                            <input
                                                className={inputClass}
                                                value={content.hero.titlePrimary}
                                                onChange={(e) =>
                                                    updateContent((prev) => ({
                                                        ...prev,
                                                        hero: { ...prev.hero, titlePrimary: e.target.value },
                                                    }))
                                                }
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-1 block text-xs uppercase tracking-wide text-brand-gray">Linea acento</label>
                                            <input
                                                className={inputClass}
                                                value={content.hero.titleAccent}
                                                onChange={(e) =>
                                                    updateContent((prev) => ({
                                                        ...prev,
                                                        hero: { ...prev.hero, titleAccent: e.target.value },
                                                    }))
                                                }
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="mb-1 block text-xs uppercase tracking-wide text-brand-gray">Subtitulo</label>
                                            <textarea
                                                className={textareaClass}
                                                value={content.hero.subtitle}
                                                onChange={(e) =>
                                                    updateContent((prev) => ({
                                                        ...prev,
                                                        hero: { ...prev.hero, subtitle: e.target.value },
                                                    }))
                                                }
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-1 block text-xs uppercase tracking-wide text-brand-gray">Boton hero</label>
                                            <input
                                                className={inputClass}
                                                value={content.hero.ctaLabel}
                                                onChange={(e) =>
                                                    updateContent((prev) => ({
                                                        ...prev,
                                                        hero: { ...prev.hero, ctaLabel: e.target.value },
                                                    }))
                                                }
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-1 block text-xs uppercase tracking-wide text-brand-gray">Video hero URL</label>
                                            <input
                                                className={inputClass}
                                                value={content.hero.videoUrl}
                                                onChange={(e) =>
                                                    updateContent((prev) => ({
                                                        ...prev,
                                                        hero: { ...prev.hero, videoUrl: e.target.value },
                                                    }))
                                                }
                                            />
                                        </div>
                                        {content.hero.slides.map((slide, index) => (
                                            <div key={`hero-slide-${index}`} className="md:col-span-2">
                                                <ImageUploadInput
                                                    label={`Imagen hero ${index + 1}`}
                                                    value={slide}
                                                    uploading={uploadingFieldKey === `hero-slide-${index}`}
                                                    onChange={(nextValue) =>
                                                        updateContent((prev) => ({
                                                            ...prev,
                                                            hero: {
                                                                ...prev.hero,
                                                                slides: prev.hero.slides.map((item, currentIndex) =>
                                                                    currentIndex === index ? nextValue : item
                                                                ),
                                                            },
                                                        }))
                                                    }
                                                    onFileDrop={(file) =>
                                                        void uploadImageForField(`hero-slide-${index}`, file, (url) =>
                                                            updateContent((prev) => ({
                                                                ...prev,
                                                                hero: {
                                                                    ...prev.hero,
                                                                    slides: prev.hero.slides.map((item, currentIndex) =>
                                                                        currentIndex === index ? url : item
                                                                    ),
                                                                },
                                                            }))
                                                        )
                                                    }
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h2 className="font-serif text-2xl text-brand-brown">Quienes Somos</h2>
                                    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div>
                                            <label className="mb-1 block text-xs uppercase tracking-wide text-brand-gray">Titulo</label>
                                            <input
                                                className={inputClass}
                                                value={content.philosophy.title}
                                                onChange={(e) =>
                                                    updateContent((prev) => ({
                                                        ...prev,
                                                        philosophy: { ...prev.philosophy, title: e.target.value },
                                                    }))
                                                }
                                            />
                                        </div>
                                        <div>
                                            <ImageUploadInput
                                                label="Imagen URL"
                                                value={content.philosophy.imageUrl}
                                                uploading={uploadingFieldKey === 'philosophy-image'}
                                                onChange={(nextValue) =>
                                                    updateContent((prev) => ({
                                                        ...prev,
                                                        philosophy: { ...prev.philosophy, imageUrl: nextValue },
                                                    }))
                                                }
                                                onFileDrop={(file) =>
                                                    void uploadImageForField('philosophy-image', file, (url) =>
                                                        updateContent((prev) => ({
                                                            ...prev,
                                                            philosophy: { ...prev.philosophy, imageUrl: url },
                                                        }))
                                                    )
                                                }
                                            />
                                        </div>
                                        {content.philosophy.paragraphs.map((paragraph, index) => (
                                            <div key={`paragraph-${index}`} className="md:col-span-2">
                                                <label className="mb-1 block text-xs uppercase tracking-wide text-brand-gray">Parrafo {index + 1}</label>
                                                <textarea
                                                    className={textareaClass}
                                                    value={paragraph}
                                                    onChange={(e) =>
                                                        updateContent((prev) => ({
                                                            ...prev,
                                                            philosophy: {
                                                                ...prev.philosophy,
                                                                paragraphs: prev.philosophy.paragraphs.map((item, currentIndex) =>
                                                                    currentIndex === index ? e.target.value : item
                                                                ),
                                                            },
                                                        }))
                                                    }
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h2 className="font-serif text-2xl text-brand-brown">CTA y contacto</h2>
                                    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div>
                                            <label className="mb-1 block text-xs uppercase tracking-wide text-brand-gray">CTA titulo</label>
                                            <input
                                                className={inputClass}
                                                value={content.cta.title}
                                                onChange={(e) =>
                                                    updateContent((prev) => ({
                                                        ...prev,
                                                        cta: { ...prev.cta, title: e.target.value },
                                                    }))
                                                }
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-1 block text-xs uppercase tracking-wide text-brand-gray">CTA boton</label>
                                            <input
                                                className={inputClass}
                                                value={content.cta.buttonLabel}
                                                onChange={(e) =>
                                                    updateContent((prev) => ({
                                                        ...prev,
                                                        cta: { ...prev.cta, buttonLabel: e.target.value },
                                                    }))
                                                }
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="mb-1 block text-xs uppercase tracking-wide text-brand-gray">CTA descripcion</label>
                                            <textarea
                                                className={textareaClass}
                                                value={content.cta.description}
                                                onChange={(e) =>
                                                    updateContent((prev) => ({
                                                        ...prev,
                                                        cta: { ...prev.cta, description: e.target.value },
                                                    }))
                                                }
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-1 block text-xs uppercase tracking-wide text-brand-gray">Whatsapp (solo numero)</label>
                                            <input
                                                className={inputClass}
                                                value={content.whatsappPhone}
                                                onChange={(e) => updateContent((prev) => ({ ...prev, whatsappPhone: e.target.value }))}
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-1 block text-xs uppercase tracking-wide text-brand-gray">Instagram URL</label>
                                            <input
                                                className={inputClass}
                                                value={content.footer.instagramUrl}
                                                onChange={(e) =>
                                                    updateContent((prev) => ({
                                                        ...prev,
                                                        footer: { ...prev.footer, instagramUrl: e.target.value },
                                                    }))
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Resto de pestañas igual que en tu código original */}

                        {activeTab === 'services' && (
                            <div className="grid grid-cols-1 gap-6 xl:grid-cols-[340px_1fr]">
                                {/* ... tu código original de services ... */}
                            </div>
                        )}

                        {activeTab === 'technologies' && (
                            <div className="grid grid-cols-1 gap-6 xl:grid-cols-[320px_1fr]">
                                {/* ... tu código original de technologies ... */}
                            </div>
                        )}

                        {activeTab === 'team' && (
                            <div className="grid grid-cols-1 gap-6 xl:grid-cols-[340px_1fr]">
                                {/* ... tu código original de team ... */}
                            </div>
                        )}

                        {activeTab === 'testimonials' && (
                            <div className="grid grid-cols-1 gap-6 xl:grid-cols-[320px_1fr]">
                                {/* ... tu código original de testimonials ... */}
                            </div>
                        )}

                        {activeTab === 'locations' && (
                            <div className="grid grid-cols-1 gap-6 xl:grid-cols-[320px_1fr]">
                                {/* ... tu código original de locations ... */}
                            </div>
                        )}

                        {/* BOTÓN DE GUARDAR GLOBAL - FIJO EN LA PARTE SUPERIOR DERECHA */}
                        <div className="mt-12 flex justify-end">
                            <button
                                type="button"
                                onClick={handleSave}
                                disabled={saveStatus === 'saving'}
                                className={`px-8 py-4 rounded-lg text-white font-bold transition-all shadow-md ${
                                    saveStatus === 'saving'
                                        ? 'bg-gray-500 cursor-not-allowed'
                                        : 'bg-green-600 hover:bg-green-700 active:bg-green-800'
                                }`}
                            >
                                {saveStatus === 'saving' ? 'Guardando...' : 'Guardar Todos los Cambios'}
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
};

export default AdminDashboard;
