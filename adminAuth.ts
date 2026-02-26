export const DEMO_ADMIN_USERNAME = 'Beaesthetic';
export const DEMO_ADMIN_PASSWORD = '12345';
export const DEMO_ADMIN_SESSION_KEY = 'be-admin-demo-session';

export const hasDemoAdminSession = (): boolean => {
    if (typeof window === 'undefined') return false;
    return window.localStorage.getItem(DEMO_ADMIN_SESSION_KEY) === '1';
};

export const setDemoAdminSession = (): void => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(DEMO_ADMIN_SESSION_KEY, '1');
};

export const clearDemoAdminSession = (): void => {
    if (typeof window === 'undefined') return;
    window.localStorage.removeItem(DEMO_ADMIN_SESSION_KEY);
};
