
import React from 'react';
import { LOCATIONS_DATA } from '../constants';

const Footer: React.FC = () => {
    return (
        <footer id="contacto" className="bg-brand-brown text-brand-beige-dark py-16">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Column 1: Brand */}
                    <div>
                        <h3 className="text-2xl font-serif font-bold text-brand-white mb-4">Be<span className="font-light">Aesthetic</span></h3>
                        <p className="font-sans text-sm font-light leading-relaxed">
                            Elevando la estética médica a una forma de arte. Lujo, ciencia y resultados excepcionales.
                        </p>
                    </div>

                    {/* Column 2: Locations */}
                    <div>
                        <h4 className="font-sans font-semibold tracking-widest uppercase text-brand-white mb-4">Sedes</h4>
                        <ul className="space-y-4">
                            {LOCATIONS_DATA.map(loc => (
                                <li key={loc.id}>
                                    <p className="font-sans text-sm font-semibold">{loc.name}</p>
                                    <p className="font-sans text-sm font-light">{loc.address}</p>
                                    <a href={`tel:${loc.phone.replace(/\s/g, '')}`} className="font-sans text-sm font-light hover:text-brand-white transition-colors block">{loc.phone}</a>
                                    <a href={loc.mapsLink} target="_blank" rel="noopener noreferrer" className="font-sans text-sm font-light hover:text-brand-white transition-colors underline decoration-dotted">Ver en mapa</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Quick Links */}
                    <div>
                        <h4 className="font-sans font-semibold tracking-widest uppercase text-brand-white mb-4">Explorar</h4>
                         <ul className="space-y-2">
                            <li><a href="#quienes-somos" className="font-sans text-sm font-light hover:text-brand-white transition-colors">Quienes Somos</a></li>
                            <li><a href="#servicios" className="font-sans text-sm font-light hover:text-brand-white transition-colors">Servicios</a></li>
                            <li><a href="#tecnologia" className="font-sans text-sm font-light hover:text-brand-white transition-colors">Tecnología</a></li>
                            <li><a href="#equipo" className="font-sans text-sm font-light hover:text-brand-white transition-colors">Equipo Médico</a></li>
                        </ul>
                    </div>

                    {/* Column 4: Social */}
                    <div>
                        <h4 className="font-sans font-semibold tracking-widest uppercase text-brand-white mb-4">Síganos</h4>
                        <a href="https://www.instagram.com/beaestheticrd" target="_blank" rel="noopener noreferrer" className="inline-flex items-center font-sans text-sm font-light hover:text-brand-white transition-colors">
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                <path d="M17.5 6.5h.01" />
                            </svg>
                            Instagram
                        </a>
                    </div>
                </div>

                <div className="border-t border-brand-beige-dark/20 mt-12 pt-8 text-center">
                    <p className="font-sans text-xs text-brand-gray">&copy; {new Date().getFullYear()} Be Aesthetic RD. Todos los derechos reservados. Diseñado con elegancia.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
