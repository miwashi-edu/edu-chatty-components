import { createContext, useContext } from 'react';

const ApiContext = createContext(null);

export const useApi = () => {
    const ctx = useContext(ApiContext);
    if (ctx == null) {
        throw new Error('useAuth must be used within <ApiProvider>');
    }
    return ctx;
};

export default ApiContext;
