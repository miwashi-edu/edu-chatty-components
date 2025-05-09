import React, { createContext, useContext, useState } from 'react';
import jwt from 'jsonwebtoken';

export const FakeLoginContext = createContext({
    isLoggedIn: false,
    isLoading: false,
    error: null,
    login: () => {},
    logout: () => {},
    handleGet: () => {},
    handlePost: () => {}
});

export const FakeLoginProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = (username, password) => {
        setIsLoading(true);
        setTimeout(() => {  // Simulating asynchronous operation
            try {
                const fakeToken = jwt.sign({ username }, 'fake-secret', { expiresIn: '1h' });
                sessionStorage.setItem('fakeToken', fakeToken);
                setIsLoggedIn(true);
                setIsLoading(false);
            } catch (e) {
                setError("Failed to generate token");
                setIsLoading(false);
            }
        }, 1000);
    };

    const logout = () => {
        sessionStorage.removeItem('fakeToken');
        setIsLoggedIn(false);
    };

    // Common method to handle token verification and response
    const verifyTokenAndGetResponse = () => {
        const token = sessionStorage.getItem('fakeToken');
        if (token) {
            try {
                const decoded = jwt.verify(token, 'fake-secret');
                console.log("Request made with token data:", decoded);
                return { data: `This is fake data from a request. User: ${decoded.username}` };
            } catch (e) {
                console.error("Token verification failed:", e);
                return { error: "Invalid or expired token" };
            }
        } else {
            console.error("No token found.");
            return { error: "Authentication required" };
        }
    };

    const handleGet = () => {
        console.log("Fake GET request made.");
        return verifyTokenAndGetResponse();
    };

    const handlePost = () => {
        console.log("Fake POST request made.");
        return verifyTokenAndGetResponse();
    };

    const contextValue = {
        isLoggedIn,
        isLoading,
        error,
        login,
        logout,
        handleGet,
        handlePost
    };

    return (
        <FakeLoginContext.Provider value={contextValue}>
            {children}
        </FakeLoginContext.Provider>
    );
};

export const useFakeLogin = () => useContext(FakeLoginContext);
