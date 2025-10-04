import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import AuthContext from './AuthContext.jsx';
import * as cfg from '@/config/config.js'; // fallback if ConfigProvider not used
import { useConfig } from '@/providers/ConfigProvider/ConfigContext.jsx';

const STORAGE_KEY = 'auth.token';

const joinUrl = (base, path) => {
    if (!path) return base;
    if (/^https?:\/\//i.test(path)) return path;
    return `${base.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`;
};

export default function AuthProvider({ children }) {
    // If ConfigProvider is mounted, prefer it; else fall back to static config
    let baseUrlFromConfig = cfg.API_BASE_URL;
    try {
        const c = useConfig();
        if (c && c.API_BASE_URL) baseUrlFromConfig = c.API_BASE_URL;
    } catch (_) {
        /* not inside ConfigProvider – use cfg fallback */
    }

    const API_BASE_URL = baseUrlFromConfig;

    const [token, setToken] = useState(() => localStorage.getItem(STORAGE_KEY) || '');
    const [csrfToken, setCsrfToken] = useState('');
    const fetchingCsrf = useRef(false);

    const isAuthenticated = !!token;

    const saveToken = useCallback((t) => {
        setToken(t || '');
        if (t) localStorage.setItem(STORAGE_KEY, t);
        else localStorage.removeItem(STORAGE_KEY);
    }, []);

    const getCsrf = useCallback(async () => {
        if (csrfToken) return csrfToken;
        if (fetchingCsrf.current) {
            // simple wait loop until another call finishes
            await new Promise(r => setTimeout(r, 150));
            return csrfToken;
        }
        fetchingCsrf.current = true;
        try {
            const res = await fetch(joinUrl(API_BASE_URL, '/csrf'), {
                method: 'PATCH',
                credentials: 'include',
            });
            if (!res.ok) throw new Error(`CSRF failed: ${res.status}`);
            const data = await res.json().catch(() => ({}));
            if (data && data.csrfToken) {
                setCsrfToken(data.csrfToken);
                return data.csrfToken;
            }
            throw new Error('CSRF token missing in response');
        } finally {
            fetchingCsrf.current = false;
        }
    }, [API_BASE_URL, csrfToken]);

    const login = useCallback(async ({ username, password }) => {
        const csrf = await getCsrf();
        const res = await fetch(joinUrl(API_BASE_URL, '/auth/token'), {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, csrfToken: csrf }),
        });
        if (!res.ok) {
            const errText = await res.text().catch(() => '');
            throw new Error(`Login failed (${res.status}) ${errText}`);
        }
        const { token: t } = await res.json();
        if (!t) throw new Error('JWT token missing in response');
        saveToken(t);
        return t;
    }, [API_BASE_URL, getCsrf, saveToken]);

    const register = useCallback(async ({ username, password, email, avatar }) => {
        const csrf = await getCsrf();
        const res = await fetch(joinUrl(API_BASE_URL, '/auth/register'), {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, email, avatar, csrfToken: csrf }),
        });
        if (!res.ok && res.status !== 400) {
            const errText = await res.text().catch(() => '');
            throw new Error(`Register failed (${res.status}) ${errText}`);
        }
        // 201 or 400 (user exists) are both acceptable for manual flows
        return true;
    }, [API_BASE_URL, getCsrf]);

    const logout = useCallback(async () => {
        saveToken('');
        setCsrfToken('');
        // Best-effort: clear CSRF cookie on server
        try {
            await fetch(joinUrl(API_BASE_URL, '/csrf'), {
                method: 'DELETE',
                credentials: 'include',
            });
        } catch (_) {}
    }, [API_BASE_URL, saveToken]);

    const authFetch = useCallback(async (input, init = {}) => {
        const url = joinUrl(API_BASE_URL, input);
        const headers = new Headers(init.headers || {});
        if (token) headers.set('Authorization', `Bearer ${token}`);
        const res = await fetch(url, {
            ...init,
            headers,
            credentials: init.credentials ?? 'include',
        });
        if (res.status === 401 || res.status === 403) {
            // auto-logout on auth failure
            saveToken('');
        }
        return res;
    }, [API_BASE_URL, token, saveToken]);

    // Restore token on first mount (already in state via initializer). Optional sanity checks could go here.
    useEffect(() => {
        // no-op
    }, []);

    const value = useMemo(() => ({
        token,
        isAuthenticated,
        login,
        register,
        logout,
        authFetch,
        getCsrf, // exposed in case you need it elsewhere
    }), [token, isAuthenticated, login, register, logout, authFetch, getCsrf]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
