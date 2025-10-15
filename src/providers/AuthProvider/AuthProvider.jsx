import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import AuthContext from './AuthContext.jsx';
import { useConfig } from '@/providers';
import {getCsrfToken} from './getCsrf.js';

const AuthProvider = ({ children }) => {
    const {API_BASE_URL, STORAGE_KEYS, AUTH_ROUTES} = useConfig();
    const [csrfToken, setCsrfToken] = useState('');
    const fetchingCsrf = useRef(false);
    console.log(STORAGE_KEYS.AUTH_TOKEN);

    // --- CSRF state only ---
    useEffect(() => {
        let alive = true;
        const KEY = STORAGE_KEYS?.CSRF_TOKEN || 'csrfToken';
        getCsrfToken(fetchingCsrf, setCsrfToken, KEY, API_BASE_URL)
        return () => { alive = false; };
    }, [API_BASE_URL, STORAGE_KEYS]);
    // --- end CSRF state only ---

    const signIn = useCallback(
        async ({ username, password }) => {
            console.log(AUTH_ROUTES.SIGN_IN, username, password);
        },
    );

    const signUp = useCallback(
        async ({ username, password, email, avatar }) => {
            console.log(AUTH_ROUTES.SIGN_UP, username, password, email, avatar);
        }
    );

    const signOut = useCallback(
        async () => {
            console.log(AUTH_ROUTES.SIGN_OUT);
        }
    );

    useEffect(() => {
        // no-op
    }, []);

    const value = useMemo(() => ({
        signIn,
        signUp,
        signOut,
    }), []);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
