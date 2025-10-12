import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import AuthContext from './AuthContext.jsx';
import { useConfig } from '@/providers';
import {joinUrl} from './auth.js';
import {getCsrf} from './getSrf.js';

const STORAGE_KEY = 'auth.token';

const AuthProvider = ({ children }) => {
    const config = useConfig();
    const API_BASE_URL = config.API_BASE_URL;

    const [token, setToken] = useState(() => localStorage.getItem(STORAGE_KEY) || '');
    const [csrfToken, setCsrfToken] = useState('');
    const fetchingCsrf = useRef(false);
    const isAuthenticated = !!token;

    const saveToken = useCallback((t) => {
        setToken(t || '');
        if (t) {
            localStorage.setItem(STORAGE_KEY, t);
        }
        else {
            localStorage.removeItem(STORAGE_KEY);
        }
    }, []);
    const getLocalCsrf = useCallback(() => getCsrf({ apiBaseUrl: API_BASE_URL }), [API_BASE_URL, csrfToken]);

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

export default AuthProvider;