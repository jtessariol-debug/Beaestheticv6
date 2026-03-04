import React, { useEffect, useMemo, useState } from 'react';
import { Service, ServiceCategory } from '../types';
import { Product, RealtimeService, mapProductToRealtimeService, supabase } from '../supabase';
import ServiceModal from './ServiceModal';

const ServiceCard: React.FC<{ service: Service; onClick: () => void; onOpenDetails: () => void }> = ({ service, onClick, onOpenDetails }) => {
    const [showImage, setShowImage] = useState(Boolean(service.imageUrl));

    useEffect(() => {
        setShowImage(Boolean(service.imageUrl));
    }, [service.imageUrl]);

    return (
        <div className="relative w-full min-w-0 overflow-hidden group animate-fade-in cursor-pointer" onClick={onClick}>
            {showImage ? (
                <img
                    src={service.imageUrl}
                    alt={service.name}
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                    sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                    className="w-full h-72 sm:h-80 object-cover transition-transform duration-500 ease-custom-ease group-hover:scale-110"
                    onError={() => setShowImage(false)}
                />
            ) : (
                <div className="w-full h-72 sm:h-80 bg-brand-beige border border-brand-brown/20 flex items-center justify-center">
                    <span className="text-brand-brown text-sm tracking-wide">Imagen proximamente</span>
                </div>
            )}
            <div className="absolute inset-0 bg-black/40 transition-opacity duration-300 opacity-40 md:opacity-0 md:group-hover:opacity-100"></div>
            <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-brand-white text-xl font-serif transform translate-y-0 opacity-100 md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-500 ease-custom-ease">{service.name}</h3>
            </div>
            <div className="absolute bottom-4 right-4 z-10">
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        onOpenDetails();
                    }}
                    className="px-3 py-2 text-xs font-semibold tracking-wide bg-brand-brown text-brand-white border border-brand-white/40 hover:bg-brand-white hover:text-brand-brown transition-colors"
                >
                    Ver mas detalles
                </button>
            </div>
        </div>
    );
};

const Services: React.FC<{ services: Service[] }> = ({ services }) => {
    const [activeCategory, setActiveCategory] = useState<ServiceCategory | 'all'>('all');
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [liveServices, setLiveServices] = useState<RealtimeService[] | null>(null);

    useEffect(() => {
        if (!supabase) {
            setLiveServices(null);
            return;
        }

        let active = true;
        const loadProducts = async () => {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .order('created_at', { ascending: false });
            if (!active || error) {
                return;
            }
            const mapped = (data ?? []).map((item) => mapProductToRealtimeService(item as Product));
            setLiveServices(mapped);
        };

        void loadProducts();

        const channel = supabase
            .channel('services-products-realtime')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, (payload) => {
                if (payload.eventType === 'DELETE') {
                    const deletedId = String((payload.old as { id?: string } | null)?.id ?? '');
                    if (!deletedId) {
                        return;
                    }
                    setLiveServices((prev) => (prev ?? []).filter((item) => item.sourceId !== deletedId));
                    return;
                }

                const mapped = mapProductToRealtimeService(payload.new as Partial<Product>);
                setLiveServices((prev) => {
                    const base = prev ?? [];
                    if (payload.eventType === 'INSERT') {
                        return [mapped, ...base.filter((item) => item.sourceId !== mapped.sourceId)];
                    }
                    const exists = base.some((item) => item.sourceId === mapped.sourceId);
                    if (!exists) {
                        return [mapped, ...base];
                    }
                    return base.map((item) => (item.sourceId === mapped.sourceId ? mapped : item));
                });
            })
            .subscribe();

        return () => {
            active = false;
            void supabase.removeChannel(channel);
        };
    }, []);

    const servicesForView = liveServices && liveServices.length > 0 ? liveServices : services;

    const openModal = (service: Service) => {
        setSelectedService(service);
        document.body.style.overflow = 'hidden';
    };

    const openDetailsTab = (service: Service) => {
        if ((service as RealtimeService).isRealtime) {
            openModal(service);
            return;
        }
        const baseUrl = `${window.location.origin}${window.location.pathname}`;
        const detailsUrl = `${baseUrl}#servicio/${service.id}`;
        window.open(detailsUrl, '_blank', 'noopener,noreferrer');
    };

    const closeModal = () => {
        setSelectedService(null);
        document.body.style.overflow = '';
    };

    const categories: (ServiceCategory | 'all')[] = ['all', ...Object.values(ServiceCategory)];
    const categoryNames: { [key in ServiceCategory | 'all']: string } = {
        all: 'Todos',
        [ServiceCategory.ArmonizacionFacial]: 'Armonizacion Facial',
        [ServiceCategory.Rejuvenecimiento]: 'Rejuvenecimiento',
        [ServiceCategory.EsteticaCorporal]: 'Estetica Corporal',
        [ServiceCategory.NutricionClinica]: 'Nutricion',
        [ServiceCategory.Ginecoestetica]: 'Ginecoestetica',
        [ServiceCategory.MedicinaCapilar]: 'Medicina Capilar',
        [ServiceCategory.Microcirugias]: 'Microcirugias',
        [ServiceCategory.Cosmiatria]: 'Cosmiatria',
        [ServiceCategory.Sueroterapia]: 'Sueroterapia',
    };

    const filteredServices = useMemo(() => {
        if (activeCategory === 'all') {
            return servicesForView;
        }
        return servicesForView.filter(service => service.category === activeCategory);
    }, [activeCategory, servicesForView]);

    return (
        <>
            <section id="servicios" className="py-20 lg:py-32 bg-brand-beige-dark">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="text-center mb-12 fade-up-on-scroll opacity-0">
                        <h2 className="font-serif text-4xl lg:text-5xl text-brand-brown mb-4">Servicios Exclusivos</h2>
                        <p className="font-sans text-brand-gray max-w-2xl mx-auto">Un portafolio de tratamientos curados para satisfacer las mas altas exigencias, desde el rejuvenecimiento facial hasta el bienestar integral.</p>
                    </div>

                    <div className="flex justify-center flex-wrap gap-2 md:gap-4 mb-12 fade-up-on-scroll opacity-0" style={{ animationDelay: '0.2s' }}>
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-3 py-2 text-xs md:px-5 md:py-2 md:text-sm font-medium tracking-wider border transition-colors duration-300 ease-custom-ease
                                    ${activeCategory === category
                                        ? 'bg-brand-brown text-brand-white border-brand-brown'
                                        : 'bg-transparent text-brand-brown border-brand-brown/30 hover:bg-brand-brown/5'}`
                                }
                            >
                                {categoryNames[category]}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 fade-up-on-scroll opacity-0" style={{ animationDelay: '0.4s' }}>
                        {filteredServices.map((service) => (
                            <ServiceCard
                                key={service.id}
                                service={service}
                                onClick={() => openModal(service)}
                                onOpenDetails={() => openDetailsTab(service)}
                            />
                        ))}
                    </div>
                </div>
            </section>
            {selectedService && <ServiceModal service={selectedService} onClose={closeModal} />}
        </>
    );
};

export default Services;
