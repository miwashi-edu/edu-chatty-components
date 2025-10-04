import { createContext, useContext } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (ctx == null) {
        throw new Error('useAuth must be used within <AuthProvider>');
    }
    return ctx;
};

export default AuthContext;
