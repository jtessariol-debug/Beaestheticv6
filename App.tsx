import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
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
import ServiceDetailPage from './components/ServiceDetailPage';
import AdminLogin from './components/AdminLogin';
import SupabaseProductDashboard from './components/SupabaseProductDashboard';
import { hasDemoAdminSession } from './adminAuth';
import AdminDashboard from './components/AdminDashboard';
import {
    ensureContentShape,
    loadSiteContent,
    resetSiteContent,
    saveSiteContent as saveLocalSiteContent,
} from './content';
import { supabase } from './supabase';
import { getSiteContent, saveSiteContent as saveRemoteSiteContent } from './siteContentService';

type AppView = 'site' | 'admin' | 'admin-content' | 'login';
type SaveStatus = 'saving' | 'saved' | 'error';

const getViewFromHash = (): AppView => {
    if (window.location.hash === '#admin') return 'admin';
    if (window.location.hash === '#admin-contenido') return 'admin-content';
    if (window.location.hash === '#login') return 'login';
    return 'site';
};

const App: React.FC = () => {
    const [siteContent, setSiteContent] = useState(loadSiteContent());
    const [serviceIdFromHash, setServiceIdFromHash] = useState<number | null>(null);
    const [view, setView] = useState<AppView>(getViewFromHash());
    const [session, setSession] = useState<Session | null>(null);
    const [authLoading, setAuthLoading] = useState<boolean>(true);
    const [demoSession, setDemoSession] = useState<boolean>(hasDemoAdminSession());
    const [saveStatus, setSaveStatus] = useState<SaveStatus>('saved');
    const isMountedRef = useRef(true);

    // Cleanup
    useEffect(() => {
        return () => {
            isMountedRef.current = false;
        };
    }, []);

    // Función para obtener y aplicar contenido remoto
    const fetchAndApplyRemoteContent = useCallback(async (source: string) => {
        const { data, error } = await getSiteContent('home');

        if (error || !data?.content) {
            console.error(`[Supabase] Error cargando desde ${source}:`, error);
            return;
        }

        const remoteContent = ensureContentShape(data.content);
        setSiteContent(remoteContent);
        saveLocalSiteContent(remoteContent);
        console.log(`[Supabase] Contenido sincronizado con éxito (${source})`);
    }, []);

    // Carga inicial
    useEffect(() => {
        fetchAndApplyRemoteContent("bootstrap");
    }, [fetchAndApplyRemoteContent]);

    // Listener Realtime - Mantiene la web actualizada al instante
    useEffect(() => {
        if (!supabase) return;

        const channel = supabase
            .channel("site_content_realtime")
            .on(
                "postgres_changes",
                {
                    event: "UPDATE",
                    schema: "public",
                    table: "site_content",
                    filter: "id=eq.home",
                },
                (payload) => {
                    if (payload.new && payload.new.content) {
                        const remoteContent = ensureContentShape(payload.new.content);
                        setSiteContent(remoteContent);
                        saveLocalSiteContent(remoteContent);
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    // PERSISTENCIA: Guarda en Supabase cuando se edita en el Admin Dashboard
    useEffect(() => {
        if (view !== 'admin-content' || !session) return;

        const timer = setTimeout(async () => {
            setSaveStatus('saving');
            const { error } = await saveRemoteSiteContent('home', siteContent);
            if (error) {
                setSaveStatus('error');
            } else {
                setSaveStatus('saved');
            }
        }, 1500); // Debounce de 1.5s para no saturar la DB mientras escriben

        return () => clearTimeout(timer);
    }, [siteContent, view, session]);

    // Manejo de sesión
    useEffect(() => {
        if (!supabase) {
            setAuthLoading(false);
            return;
        }

        supabase.auth.getSession().then(({ data }) => {
            setSession(data.session);
            setAuthLoading(false);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, currentSession) => {
            setSession(currentSession);
        });

        return () => subscription.unsubscribe();
    }, []);

    // Navegación por Hash
    useEffect(() => {
        const syncFromHash = () => {
            setView(getViewFromHash());
            setDemoSession(hasDemoAdminSession());
            const match = window.location.hash.match(/^#servicio\/(\d+)$/);
            setServiceIdFromHash(match ? Number(match[1]) : null);
        };

        syncFromHash();
        window.addEventListener('hashchange', syncFromHash);
        return () => window.removeEventListener('hashchange', syncFromHash);
    }, []);

    // Guardas de acceso
    useEffect(() => {
        const hasAccess = Boolean(session || demoSession);
        if ((view === 'admin' || view === 'admin-content') && !authLoading && !hasAccess) {
            window.location.hash = '#login';
            return;
        }
        if (view === 'login' && hasAccess) {
            window.location.hash = '#admin';
        }
    }, [view, authLoading, session, demoSession]);

    const selectedService = useMemo(
        () => (serviceIdFromHash == null ? null : siteContent.services.find((s) => s.id === serviceIdFromHash) || null),
        [serviceIdFromHash, siteContent.services]
    );

    const handleForceRefreshFromSupabase = useCallback(() => {
        void fetchAndApplyRemoteContent('manual-force-refresh');
    }, [fetchAndApplyRemoteContent]);

    // Animaciones
    useEffect(() => {
        if (selectedService || view !== 'site') return;
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
    }, [selectedService, view]);

    if (view === 'login') return <AdminLogin />;

    if (view === 'admin' || view === 'admin-content') {
        if (authLoading && !demoSession) {
            return (
                <main className="min-h-screen bg-brand-beige-dark p-6 flex items-center justify-center">
                    <p className="text-brand-brown">Verificando sesión...</p>
                </main>
            );
        }
        if (!session && !demoSession) return null;
        
        if (view === 'admin') return <SupabaseProductDashboard />;

        return (
            <>
                <div className="fixed bottom-4 right-4 z-50">
                    <button
                        type="button"
                        onClick={handleForceRefreshFromSupabase}
                        className="rounded-md border border-brand-brown/30 bg-white px-3 py-2 text-xs font-medium text-brand-brown shadow-sm hover:bg-brand-beige"
                    >
                        Refrescar desde la Nube
                    </button>
                </div>
                <AdminDashboard
                    content={siteContent}
                    onChange={setSiteContent}
                    onReset={() => setSiteContent(resetSiteContent())}
                    saveStatus={saveStatus}
                />
            </>
        );
    }

    if (selectedService) return <ServiceDetailPage service={selectedService} />;

    return (
        <div className="bg-brand-beige">
            <Header navItems={siteContent.headerNav} />
            <main>
                <Hero content={siteContent.hero} />
                <Philosophy content={siteContent.philosophy} />
                <Services services={siteContent.services} />
                <Technologies technologies={siteContent.technologies} />
                <Team team={siteContent.team} />
                <Testimonials testimonials={siteContent.testimonials} />
                <CTA content={siteContent.cta} whatsappPhone={siteContent.whatsappPhone} />
            </main>
            <Footer locations={siteContent.locations} content={siteContent.footer} />
            <WhatsAppButton phone={siteContent.whatsappPhone} />
        </div>
    );
};

export default App;
