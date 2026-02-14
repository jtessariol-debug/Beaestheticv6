
import React, { useState } from 'react';
import { TEAM_DATA } from '../constants';
import { TeamMember } from '../types';

const TeamModal: React.FC<{ member: TeamMember; onClose: () => void }> = ({ member, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
            <div className="bg-brand-beige w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-slide-in" onClick={e => e.stopPropagation()}>
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="relative">
                       <img src={member.imageUrl} alt={member.name} className="w-full h-full min-h-[400px] object-cover object-top"/>
                       <button onClick={onClose} className="absolute top-4 right-4 text-white bg-black/30 rounded-full w-8 h-8 flex items-center justify-center transition-opacity hover:opacity-80 text-xl">&times;</button>
                    </div>
                    <div className="p-8 md:p-12 flex flex-col justify-center">
                        <h2 className="font-serif text-3xl text-brand-brown">{member.name}</h2>
                        <p className="font-sans text-brand-gray font-semibold tracking-wider my-2">{member.specialty}</p>
                        <div className="w-16 h-px bg-brand-brown/20 my-4"></div>
                        <p className="font-sans text-brand-gray leading-relaxed">{member.bio}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};


const Team: React.FC = () => {
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

    const openModal = (member: TeamMember) => {
        setSelectedMember(member);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setSelectedMember(null);
        document.body.style.overflow = '';
    };

    return (
        <section id="equipo" className="py-20 lg:py-32 bg-brand-beige-dark">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12 fade-up-on-scroll opacity-0">
                    <h2 className="font-serif text-4xl lg:text-5xl text-brand-brown mb-4">Equipo Médico de Excelencia</h2>
                    <p className="font-sans text-brand-gray max-w-2xl mx-auto">Un colectivo de especialistas de renombre internacional, unidos por una pasión compartida por la precisión, el arte y el cuidado del paciente.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 fade-up-on-scroll opacity-0" style={{ animationDelay: '0.2s' }}>
                    {TEAM_DATA.map(member => (
                        <div key={member.id} className="text-center group cursor-pointer" onClick={() => openModal(member)}>
                            <div className="relative overflow-hidden aspect-[3/4]">
                                <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover object-top grayscale transition-all duration-500 ease-custom-ease group-hover:grayscale-0" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            <div className="mt-4">
                                <h3 className="font-serif text-xl text-brand-brown">{member.name}</h3>
                                <p className="font-sans text-sm text-brand-gray">{member.shortSpecialty}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {selectedMember && <TeamModal member={selectedMember} onClose={closeModal} />}
        </section>
    );
};

export default Team;
