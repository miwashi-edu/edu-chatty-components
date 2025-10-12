import ConfigContext from '@/providers/ConfigProvider/ConfigContext';
import { configuration } from '@/config';

const ConfigProvider = ({ children, value }) => {
    const cfg = value ?? configuration;
    return (
        <ConfigContext.Provider value={cfg}>
            {children}
        </ConfigContext.Provider>
    );
}

export default ConfigProvider;