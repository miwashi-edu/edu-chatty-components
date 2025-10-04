import ConfigContext from '@/providers/ConfigProvider/ConfigContext';
import { configuration } from '@/config';

export default function ConfigProvider({ children, value }) {
    const cfg = value ?? configuration;
    return (
        <ConfigContext.Provider value={cfg}>
            {children}
        </ConfigContext.Provider>
    );
}