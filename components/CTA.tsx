
import React from 'react';

const CTA: React.FC = () => {
    return (
        <section id="cta" className="py-20 lg:py-32 bg-brand-beige-dark">
            <div className="container mx-auto px-6 text-center fade-up-on-scroll opacity-0">
                <h2 className="font-serif text-4xl lg:text-5xl text-brand-brown mb-6">
                    Tu transformación comienza aquí.
                </h2>
                <p className="font-sans text-brand-gray max-w-3xl mx-auto mb-8 text-lg">
                    Agenda tu evaluación y recibe un plan integral en medicina estética, dermatología, salud capilar, ginecología y nutrición clínica, diseñado especialmente para ti.
                </p>
                <a 
                    href="https://api.whatsapp.com/send?phone=18096392490"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block font-sans text-sm font-semibold tracking-widest uppercase border border-brand-brown text-brand-brown px-10 py-4 transition-all duration-300 ease-custom-ease hover:bg-brand-brown hover:text-brand-white"
                >
                    Agendar Consulta
                </a>
            </div>
        </section>
    );
};

export default CTA;
