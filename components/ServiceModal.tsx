
import React from 'react';
import { Service } from '../types';

const ServiceModal: React.FC<{ service: Service; onClose: () => void }> = ({ service, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
            <div className="bg-brand-beige w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-slide-in" onClick={e => e.stopPropagation()}>
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="relative">
                       <img src={service.imageUrl} alt={service.name} className="w-full h-full min-h-[400px] object-cover object-center"/>
                       <button onClick={onClose} className="absolute top-4 right-4 text-white bg-black/30 rounded-full w-8 h-8 flex items-center justify-center transition-opacity hover:opacity-80 text-xl">&times;</button>
                    </div>
                    <div className="p-8 md:p-12 flex flex-col justify-center">
                        <h2 className="font-serif text-3xl text-brand-brown">{service.name}</h2>
                        <div className="w-16 h-px bg-brand-brown/20 my-4"></div>
                        <p className="font-sans text-brand-gray leading-relaxed whitespace-pre-line">{service.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceModal;
