import React, { createContext, useContext, useState } from 'react';

export const ChatifyLoginContext = createContext({
    isLoggedIn: false,
    loading: false,
    error: null,
    login: () => {},
    logout: () => {}
});

export const ChatifyLoginProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [bearerToken, setBearerToken] = useState('');

    const getCsrfToken = async () => {
        try {
            const response = await fetch('https://chatify-api.up.railway.app/csrf', {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                }
            });
            const data = await response.json();
            return data.csrfToken;
        } catch (error) {
            console.error('Failed to fetch CSRF token:', error);
            return null;
        }
    };

    const login = async (username, password) => {
        const csrfToken = await getCsrfToken();
        if (!csrfToken) {
            console.log("CSRF token retrieval failed.");
            return;
        }
        try {
            const response = await fetch('https://chatify-api.up.railway.app/auth/token', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    csrfToken: csrfToken
                })
            });
            const data = await response.json();
            sessionStorage.setItem('csrfToken', csrfToken);
            sessionStorage.setItem('bearerToken', data.token);
            setBearerToken(data.bearerToken);
            setIsLoggedIn(true);
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const logout = () => {
        console.log("Logging out.");
        sessionStorage.removeItem('csrfToken');
        sessionStorage.removeItem('bearerToken');
        setIsLoggedIn(false);
    };

    const secureCall = async (apiUrl, path, options = {}) => {
        console.log(apiUrl);
        console.log(path);

        const token = sessionStorage.getItem('bearerToken');
        console.log(token);
        const headers = new Headers(options.headers || {});
        headers.append('Authorization', `Bearer ${token}`);

        try {
            const response = await fetch(`${apiUrl}${path}`, {
                ...options,
                headers: headers
            });
            return response.json();
        } catch (error) {
            console.error(`Failed to make secure call to ${apiUrl}${path}:`, error);
            return {error: error.message};
        }
    };

    const contextValue = {
        isLoggedIn: isLoggedIn,
        loading: false,
        error: null,
        login: login,
        logout: logout,
        secureCall: secureCall
    };

    return (
        <ChatifyLoginContext.Provider value={contextValue}>
            {children}
        </ChatifyLoginContext.Provider>
    );
};

export const useChatifyLogin = () => useContext(ChatifyLoginContext);