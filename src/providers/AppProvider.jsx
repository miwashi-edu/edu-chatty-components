import {ConfigProvider, AuthProvider, ApiProvider} from '.';

const AppProvider = ({children}) => {
    return (
        <ConfigProvider>
            <AuthProvider>
                <ApiProvider>{children}</ApiProvider>
            </AuthProvider>
        </ConfigProvider>
    )
}

export default AppProvider;