import React, { createContext, useContext, useState } from 'react';
import { login, logout, secureGet, securePost } from './auth';

export const ChatifyLoginContext = createContext({
    isLoggedIn: false,
    isLoading: false,
    error: null,
    login: () => {},
    logout: () => {},
    secureGet: () => {},
    securePost: () => {}
});

export const ChatifyLoginProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [bearerToken, setBearerToken] = useState('');

    const handleLogin = async (username, password) => {
        console.log(`attempting to login ${username}: ${password}`);
        setIsLoading(true);
        try {
            await login(username, password, setIsLoggedIn, setBearerToken);
        } catch (error) {
            setError(error);
            console.error('Error during login:', error);
        }
        setIsLoading(false);
    };

    const handleLogout = () => {
        logout(setIsLoggedIn);
        setIsLoading(false);
    };

    const handleGet = (apiUrl, path, options) => secureGet(apiUrl, path, options);
    const handlePost = (apiUrl, path, body, options) => securePost(apiUrl, path, body, options);

    const contextValue = {
        isLoggedIn,
        isLoading,
        error,
        login: handleLogin,
        logout: handleLogout,
        secureGet: handleGet,
        securePost: handlePost
    };

    return (
        <ChatifyLoginContext.Provider value={contextValue}>
            {children}
        </ChatifyLoginContext.Provider>
    );
};

export const useChatifyLogin = () => useContext(ChatifyLoginContext);
