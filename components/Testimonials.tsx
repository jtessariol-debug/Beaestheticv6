import React, { useState, useEffect, useCallback } from 'react';
import { Testimonial } from '../types';

const Testimonials: React.FC<{ testimonials: Testimonial[] }> = ({ testimonials }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextTestimonial = useCallback(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % testimonials.length);
    }, [testimonials.length]);

    useEffect(() => {
        if (testimonials.length === 0) {
            return;
        }

        const timer = setInterval(nextTestimonial, 5000);
        return () => clearInterval(timer);
    }, [nextTestimonial, testimonials.length]);

    if (testimonials.length === 0) {
        return null;
    }

    return (
        <section id="testimonios" className="py-20 lg:py-32 bg-brand-beige">
            <div className="container mx-auto px-6 fade-up-on-scroll opacity-0">
                <div className="text-center max-w-3xl mx-auto relative h-64 flex items-center">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={testimonial.id}
                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                        >
                            <div className="flex flex-col items-center justify-center h-full">
                                <p className="font-serif text-2xl lg:text-3xl text-brand-brown italic leading-relaxed">
                                    "{testimonial.quote}"
                                </p>
                                <p className="mt-6 font-sans text-brand-gray font-semibold tracking-widest uppercase text-sm">
                                    {testimonial.author}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mt-8 space-x-2">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-2 h-2 rounded-full transition-colors duration-300 ${index === currentIndex ? 'bg-brand-brown' : 'bg-brand-brown/20 hover:bg-brand-brown/40'}`}
                            aria-label={`Go to testimonial ${index + 1}`}
                        ></button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
