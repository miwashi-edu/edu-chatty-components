import React, { useState } from 'react';
import {authenticateUser} from "./auth.js"; // Assume you have a LoginModal component

const LoginModal = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        // Simulate an API call for authentication
        const token = await authenticateUser(username, password); // Replace with real API call
        if (token) {
            onLogin(token);  // Pass the token back to the AuthProvider
        } else {
            alert('Login failed');  // Show error message if authentication fails
        }
    };

    return (
        <div className="modal">
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};



export default LoginModal;
