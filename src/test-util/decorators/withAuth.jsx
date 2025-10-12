import React from 'react';
import { AuthContext, useAuth } from '@/providers';

const signIn = () => {

}

const signOut = () => {

}

const register = () => {

}

export const withAuth = (Story, context) => {
    const auth = {
        signIn,
        signOut,
        register
    };

    return (
        <AuthContext.Provider value={auth}>
            <Story />
        </AuthContext.Provider>
    );
};
