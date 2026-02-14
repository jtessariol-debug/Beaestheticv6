
export enum ServiceCategory {
    ArmonizacionFacial = 'Armonización Facial',
    Rejuvenecimiento = 'Rejuvenecimiento',
    EsteticaCorporal = 'Estética Corporal',
    NutricionClinica = 'Nutrición Clínica',
    Ginecoestetica = 'Ginecoestética',
    MedicinaCapilar = 'Medicina Capilar',
    Microcirugias = 'Microcirugías',
    Cosmiatria = 'Cosmiatría',
    Sueroterapia = 'Sueroterapia',
}

export interface Service {
    id: number;
    name: string;
    category: ServiceCategory;
    imageUrl: string;
    description: string;
}

export interface Technology {
    id: number;
    name: string;
    imageUrl: string;
}

export interface TeamMember {
    id: number;
    name: string;
    specialty: string;
    shortSpecialty: string;
    imageUrl: string;
    bio: string;
}

export interface Testimonial {
    id: number;
    quote: string;
    author: string;
}

export interface Location {
    id: string;
    name: string;
    address: string;
    phone: string;
    mapsLink: string;
}
