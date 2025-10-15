import React, {useMemo, useState} from 'react';
import {AuthContext, useAuth, useConfig} from '@/providers';

export const WithAuth = (Story, context) => {
    const {API_BASE_URL, STORAGE_KEYS, AUTH_ROUTES} = useConfig();

    const signIn = ({ username, password }) => {console.log(AUTH_ROUTES.SIGN_IN, username, password);};
    const signUp = ({ username, password, email, avatar }) => {console.log(AUTH_ROUTES.SIGN_UP, username, password, email, avatar);};
    const signOut = () => {console.log(AUTH_ROUTES.SIGN_OUT);};

    const value = useMemo(() => ({
        signIn,
        signUp,
        signOut,
    }), []);

    return (
        <AuthContext.Provider value={value}>
            <Story />
        </AuthContext.Provider>
    );
};
