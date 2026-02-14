
import React from 'react';
import { TECHNOLOGIES_DATA } from '../constants';

const Technologies: React.FC = () => {
    return (
        <section id="tecnologia" className="py-20 lg:py-32 bg-brand-beige">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12 fade-up-on-scroll opacity-0">
                    <h2 className="font-serif text-4xl lg:text-5xl text-brand-brown mb-4">Ciencia y Tecnología de Vanguardia</h2>
                    <p className="font-sans text-brand-gray max-w-2xl mx-auto">Invertimos en las plataformas tecnológicas más avanzadas y seguras del mundo para ofrecer resultados precisos y superiores.</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8 items-center fade-up-on-scroll opacity-0" style={{ animationDelay: '0.2s' }}>
                    {TECHNOLOGIES_DATA.map(tech => (
                        <div key={tech.id} className="text-center group flex flex-col items-center">
                            <div className="h-32 w-32 md:h-40 md:w-40 p-4 bg-white shadow-lg rounded-full flex items-center justify-center transition-all duration-300 ease-custom-ease group-hover:shadow-xl group-hover:-translate-y-2">
                                <img src={tech.imageUrl} alt={tech.name} className="max-h-full max-w-full object-contain" />
                            </div>
                            <h3 className="mt-6 font-sans text-brand-brown font-semibold text-sm md:text-base tracking-wide">{tech.name}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Technologies;
