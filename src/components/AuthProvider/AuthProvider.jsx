import React, { createContext, useState, useEffect } from 'react';
import LoginModal from './LoginModal';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(null);
    const [showLoginModal, setShowLoginModal] = useState(false);

    // On app load, check if the token exists
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setAuthToken(token);
        } else {
            setShowLoginModal(true); // Show login modal if no token
        }
    }, []);

    // Save token both in Context and localStorage
    const saveToken = (token) => {
        setAuthToken(token);
        localStorage.setItem('authToken', token);
        setShowLoginModal(false); // Close modal on successful login
    };

    const logout = () => {
        setAuthToken(null);
        localStorage.removeItem('authToken');
        setShowLoginModal(true); // Show login modal again on logout
    };

    return (
        <AuthContext.Provider value={{ authToken, saveToken, logout }}>
            {children}
            {showLoginModal && <LoginModal onLogin={saveToken} />}
        </AuthContext.Provider>
    );
};

export const useAuth = () => React.useContext(AuthContext);
