import React from 'react';
import { CtaContent } from '../content';

const CTA: React.FC<{ content: CtaContent; whatsappPhone: string }> = ({ content, whatsappPhone }) => {
    return (
        <section id="cta" className="py-20 lg:py-32 bg-brand-beige-dark">
            <div className="container mx-auto px-6 text-center fade-up-on-scroll opacity-0">
                <h2 className="font-serif text-4xl lg:text-5xl text-brand-brown mb-6">
                    {content.title}
                </h2>
                <p className="font-sans text-brand-gray max-w-3xl mx-auto mb-8 text-lg">
                    {content.description}
                </p>
                <a
                    href={`https://api.whatsapp.com/send?phone=${whatsappPhone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block font-sans text-sm font-semibold tracking-widest uppercase border border-brand-brown text-brand-brown px-10 py-4 transition-all duration-300 ease-custom-ease hover:bg-brand-brown hover:text-brand-white"
                >
                    {content.buttonLabel}
                </a>
            </div>
        </section>
    );
};

export default CTA;
