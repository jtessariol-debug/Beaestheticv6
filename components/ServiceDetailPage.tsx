import React, { useEffect, useState } from 'react';
import { Service } from '../types';

const ServiceDetailPage: React.FC<{ service: Service }> = ({ service }) => {
    const [showImage, setShowImage] = useState(Boolean(service.imageUrl));

    useEffect(() => {
        setShowImage(Boolean(service.imageUrl));
    }, [service.imageUrl]);

    return (
        <main className="min-h-screen bg-brand-beige">
            <section className="container mx-auto px-6 py-10 lg:py-16">
                <a href="/" className="inline-block mb-6 text-sm font-medium text-brand-brown hover:underline">
                    Volver al inicio
                </a>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white/70 border border-brand-brown/10 p-6 lg:p-10">
                    <div>
                        {showImage ? (
                            <img
                                src={service.imageUrl}
                                alt={service.name}
                                className="w-full h-full min-h-[340px] object-cover"
                                onError={() => setShowImage(false)}
                            />
                        ) : (
                            <div className="w-full h-full min-h-[340px] bg-brand-beige border border-brand-brown/20 flex items-center justify-center">
                                <span className="text-brand-brown text-sm tracking-wide">Imagen proximamente</span>
                            </div>
                        )}
                    </div>
                    <div>
                        <h1 className="font-serif text-3xl lg:text-4xl text-brand-brown">{service.name}</h1>
                        <div className="w-20 h-px bg-brand-brown/30 my-4"></div>
                        <p className="font-sans text-brand-gray leading-relaxed whitespace-pre-line">{service.description}</p>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default ServiceDetailPage;
