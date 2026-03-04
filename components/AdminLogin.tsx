import React, { useState } from 'react';
import { DEMO_ADMIN_PASSWORD, DEMO_ADMIN_USERNAME, setDemoAdminSession } from '../adminAuth';

const AdminLogin: React.FC = () => {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        setLoading(true);
        if (user !== DEMO_ADMIN_USERNAME || password !== DEMO_ADMIN_PASSWORD) {
            setLoading(false);
            setError('Credenciales invalidas.');
            return;
        }
        setDemoAdminSession();
        setLoading(false);
        window.location.hash = '#admin';
    };

    return (
        <main className="min-h-screen bg-brand-beige-dark flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-white rounded-xl border border-brand-brown/10 shadow-sm p-6">
                <h1 className="font-serif text-3xl text-brand-brown">Admin Login</h1>
                <p className="text-sm text-brand-gray mt-2">Acceso solo para administradores.</p>

                <form className="mt-6 space-y-4" onSubmit={onSubmit}>
                    <div>
                        <label className="block text-xs uppercase tracking-wide text-brand-gray mb-1">Correo</label>
                        <input
                            type="email"
                            required
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                            className="w-full rounded-md border border-brand-brown/20 px-3 py-2 text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-xs uppercase tracking-wide text-brand-gray mb-1">Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-md border border-brand-brown/20 px-3 py-2 text-sm"
                        />
                    </div>
                    {error && <p className="text-sm text-red-700">{error}</p>}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-md bg-brand-brown text-brand-white py-2 text-sm font-medium disabled:opacity-60"
                    >
                        {loading ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>
            </div>
        </main>
    );
};

export default AdminLogin;
