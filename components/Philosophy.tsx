
import React from 'react';

const Philosophy: React.FC = () => {
    return (
        <section id="quienes-somos" className="py-20 lg:py-32 bg-brand-beige">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <div className="w-full h-96 lg:h-full overflow-hidden fade-up-on-scroll opacity-0">
                        <img 
                            src="https://i.postimg.cc/cd3NzjmC/IMG-7534-JPG.jpg" 
                            alt="Interior de la clínica Be Aesthetic" 
                            className="w-full h-full object-cover object-center transition-transform duration-500 ease-custom-ease hover:scale-105"
                        />
                    </div>
                    <div className="fade-up-on-scroll opacity-0" style={{ animationDelay: '0.2s' }}>
                        <h2 className="font-serif text-4xl lg:text-5xl text-brand-brown mb-6">
                            Quienes Somos
                        </h2>
                        <p className="font-sans text-brand-gray text-lg leading-relaxed mb-4 text-justify">
                            Be Aesthetic República Dominicana es un centro líder en Medicina Estética, armonización facial, Dermatología, Ginecología estética y nutrición clínica, comprometido con la promoción de la salud y el bienestar a través de un enfoque integral. Nuestro objetivo es ayudar a nuestros pacientes a mantener y mejorar su bienestar físico y emocional.
                        </p>
                        <p className="font-sans text-brand-gray text-lg leading-relaxed text-justify">
                            Con sucursales en Santo Domingo, Santiago, Puerto Plata y Punta Cana, nos enorgullece ser la primera clínica estética en el país con presencia en las principales regiones. A lo largo de los años, hemos transformado la vida de hombres y mujeres, potenciando su confianza y autoestima mediante tratamientos mínimamente invasivos, utilizando las tecnologías y técnicas más avanzadas disponibles en el mercado.
                        </p>
                         <p className="font-sans text-brand-gray text-lg leading-relaxed mt-4 text-justify">
                            Nuestro equipo de profesionales altamente capacitados evalúa y trata a cada paciente de manera personalizada, adaptando los tratamientos a las necesidades específicas de su cuerpo, rostro y salud. Con cientos de casos exitosos, nuestra experiencia y dedicación nos respaldan.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Philosophy;

