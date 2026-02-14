
import React, { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import Services from './components/Services';
import Technologies from './components/Technologies';
import Team from './components/Team';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

const App: React.FC = () => {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-fade-in-up');
                        entry.target.classList.remove('opacity-0');
                    }
                });
            },
            { threshold: 0.1 }
        );

        const elements = document.querySelectorAll('.fade-up-on-scroll');
        elements.forEach((el) => observer.observe(el));

        return () => elements.forEach((el) => observer.unobserve(el));
    }, []);

    return (
        <div className="bg-brand-beige">
            <Header />
            <main>
                <Hero />
                <Philosophy />
                <Services />
                <Technologies />
                <Team />
                <Testimonials />
                <CTA />
            </main>
            <Footer />
            <WhatsAppButton />
        </div>
    );
};

export default App;
