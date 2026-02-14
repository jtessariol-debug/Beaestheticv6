
import React, { useState, useMemo } from 'react';
import { SERVICES_DATA } from '../constants';
import { Service, ServiceCategory } from '../types';
import ServiceModal from './ServiceModal';

const ServiceCard: React.FC<{ service: Service; onClick: () => void }> = ({ service, onClick }) => (
    <div className="relative overflow-hidden group animate-fade-in cursor-pointer" onClick={onClick}>
        <img src={service.imageUrl} alt={service.name} className="w-full h-80 object-cover transition-transform duration-500 ease-custom-ease group-hover:scale-110" />
        <div className="absolute inset-0 bg-black/40 transition-opacity duration-300 opacity-0 group-hover:opacity-100"></div>
        <div className="absolute bottom-0 left-0 p-6">
            <h3 className="text-brand-white text-xl font-serif transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-custom-ease">{service.name}</h3>
        </div>
    </div>
);


const Services: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<ServiceCategory | 'all'>('all');
    const [selectedService, setSelectedService] = useState<Service | null>(null);

    const openModal = (service: Service) => {
        setSelectedService(service);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setSelectedService(null);
        document.body.style.overflow = '';
    };

    const categories: (ServiceCategory | 'all')[] = ['all', ...Object.values(ServiceCategory)];
    const categoryNames: { [key in ServiceCategory | 'all']: string } = {
        all: 'Todos',
        [ServiceCategory.ArmonizacionFacial]: 'Armonización Facial',
        [ServiceCategory.Rejuvenecimiento]: 'Rejuvenecimiento',
        [ServiceCategory.EsteticaCorporal]: 'Estética Corporal',
        [ServiceCategory.NutricionClinica]: 'Nutrición',
        [ServiceCategory.Ginecoestetica]: 'Ginecoestética',
        [ServiceCategory.MedicinaCapilar]: 'Medicina Capilar',
        [ServiceCategory.Microcirugias]: 'Microcirugías',
        [ServiceCategory.Cosmiatria]: 'Cosmiatría',
        [ServiceCategory.Sueroterapia]: 'Sueroterapia',
    };

    const filteredServices = useMemo(() => {
        if (activeCategory === 'all') {
            return SERVICES_DATA;
        }
        return SERVICES_DATA.filter(service => service.category === activeCategory);
    }, [activeCategory]);

    return (
        <>
            <section id="servicios" className="py-20 lg:py-32 bg-brand-beige-dark">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12 fade-up-on-scroll opacity-0">
                        <h2 className="font-serif text-4xl lg:text-5xl text-brand-brown mb-4">Servicios Exclusivos</h2>
                        <p className="font-sans text-brand-gray max-w-2xl mx-auto">Un portafolio de tratamientos curados para satisfacer las más altas exigencias, desde el rejuvenecimiento facial hasta el bienestar integral.</p>
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 fade-up-on-scroll opacity-0" style={{ animationDelay: '0.4s' }}>
                        {filteredServices.map((service) => (
                            <ServiceCard key={service.id} service={service} onClick={() => openModal(service)} />
                        ))}
                    </div>
                </div>
            </section>
            {selectedService && <ServiceModal service={selectedService} onClose={closeModal} />}
        </>
    );
};

export default Services;
