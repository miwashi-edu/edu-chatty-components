import { useCallback, useEffect, useMemo, useState } from 'react';
import AuthContext from './AuthContext.jsx';
import { useConfig } from '@/providers';
import { getCsrfToken } from './csrf.js';
import { authSignIn } from './signIn.js';
import { AUTH_STATUS } from '@/config/constants.js';

const AuthProvider = ({ children }) => {
    const { API_BASE_URL, STORAGE_KEYS, AUTH_ROUTES, AUTH_STATUS: _CONFIG_AUTH_STATUS } = useConfig();
    const [status, setStatus] = useState(AUTH_STATUS.IDLE);
    const [csrfToken, setCsrfToken] = useState('');
    const [authToken, setAuthToken] = useState('');
    const AUTH_TOKEN_KEY = STORAGE_KEYS?.AUTH_TOKEN || 'authToken';

    useEffect(() => {
        const CSRF_KEY = STORAGE_KEYS?.CSRF_TOKEN || 'csrfToken';
        const url = new URL(AUTH_ROUTES.CSRF_TOKEN, API_BASE_URL);
        const ac = new AbortController();
        let alive = true;

        (async () => {
            try {
                const token = await getCsrfToken(CSRF_KEY, url, ac.signal);
                if (alive) setCsrfToken(token || '');
            } catch (err) {
                if (err?.name !== 'AbortError') console.error(err);
            }
        })();

        return () => {
            alive = false;
            ac.abort();
        };
    }, [API_BASE_URL, AUTH_ROUTES.CSRF_TOKEN, STORAGE_KEYS?.CSRF_TOKEN]);

    useEffect(() => {
        try {
            const t = sessionStorage.getItem(AUTH_TOKEN_KEY);
            if (t) {
                setAuthToken(t);
                setStatus(AUTH_STATUS.AUTHORISED);
            }
        } catch {}
    }, [AUTH_TOKEN_KEY]);

    const signIn = useCallback(
        async ({ username, password }) => {
            setStatus(AUTH_STATUS.AUTHORIZING ?? AUTH_STATUS.LOADING ?? AUTH_STATUS.IDLE);
            try {
                const url = new URL(AUTH_ROUTES.SIGN_IN, API_BASE_URL);
                const data = await authSignIn(username, password, url, csrfToken, {
                    storageKey: AUTH_TOKEN_KEY,
                });
                // persist read-back and update status
                const stored = sessionStorage.getItem(AUTH_TOKEN_KEY) || data?.token || '';
                setAuthToken(stored);
                setStatus(AUTH_STATUS.AUTHORISED);
                return data;
            } catch (e) {
                setStatus(AUTH_STATUS.UNAUTHORISED ?? AUTH_STATUS.ERROR ?? AUTH_STATUS.IDLE);
                throw e;
            }
        },
        [API_BASE_URL, AUTH_ROUTES.SIGN_IN, csrfToken, AUTH_TOKEN_KEY]
    );

    const signUp = useCallback(
        async ({ username, password, email, avatar }) => {
            console.log(AUTH_ROUTES.SIGN_UP, username, password, email, avatar);
        },
        [AUTH_ROUTES.SIGN_UP]
    );

    const signOut = useCallback(async () => {
        try { sessionStorage.removeItem(AUTH_TOKEN_KEY); } catch {}
        setAuthToken('');
        setStatus(AUTH_STATUS.UNAUTHORISED);
        console.log(AUTH_ROUTES.SIGN_OUT);
    }, [AUTH_ROUTES.SIGN_OUT, AUTH_TOKEN_KEY]);

    const value = useMemo(
        () => ({ signIn, signUp, signOut, status, authToken, csrfToken }),
        [signIn, signUp, signOut, status, authToken, csrfToken]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;