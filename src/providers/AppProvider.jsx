import {ConfigProvider, AuthProvider} from '.';

const AppProvider = ({children}) => {
    return (
        <ConfigProvider>
            <AuthProvider>
                {children}
            </AuthProvider>
        </ConfigProvider>
    )
}

export default AppProvider;