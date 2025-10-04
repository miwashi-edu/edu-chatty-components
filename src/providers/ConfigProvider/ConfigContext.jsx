import { createContext, useContext } from 'react';

const ConfigContext = createContext(null);

export const useConfig = () => {
    const ctx = useContext(ConfigContext);
    if (ctx == null) {
        throw new Error('useConfig must be used within <ConfigProvider>');
    }
    return ctx;
};

export default ConfigContext;