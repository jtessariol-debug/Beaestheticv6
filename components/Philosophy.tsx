import React from 'react';
import { PhilosophyContent } from '../content';

const Philosophy: React.FC<{ content: PhilosophyContent }> = ({ content }) => {
    return (
        <section id="quienes-somos" className="py-20 lg:py-32 bg-brand-beige">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <div className="w-full h-96 lg:h-full overflow-hidden fade-up-on-scroll opacity-0">
                        <img
                            src={content.imageUrl}
                            alt="Interior de la clinica Be Aesthetic"
                            className="w-full h-full object-cover object-center transition-transform duration-500 ease-custom-ease hover:scale-105"
                        />
                    </div>
                    <div className="fade-up-on-scroll opacity-0" style={{ animationDelay: '0.2s' }}>
                        <h2 className="font-serif text-4xl lg:text-5xl text-brand-brown mb-6">{content.title}</h2>
                        {content.paragraphs.map((paragraph, index) => (
                            <p
                                key={index}
                                className={`font-sans text-brand-gray text-lg leading-relaxed text-justify ${index < content.paragraphs.length - 1 ? 'mb-4' : ''}`}
                            >
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Philosophy;
