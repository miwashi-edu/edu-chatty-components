import React, { useState } from 'react';
import styles from './Login.module.css';
import UserAtom from "./UserAtom";
import PasswordAtom from "./PasswordAtom";
import LoginButton from "./LoginButtonAtom";
import { useLogin } from '../Providers';

const Login = ({ defaultUser = '', defaultPassword = '' }) => {
    const { login } = useLogin(); // Get login function, loading state, and error message from LoginProvider
    const [user, setUser] = useState(defaultUser); // Initialize user state with defaultUser
    const [password, setPassword] = useState(defaultPassword); // Initialize password state with defaultPassword

    const handleLogin = async () => {
        await login(user, password); // Call the login function from LoginProvider with user and password
    };

    return (
        <div className={styles.container}>
            <div className={styles.login}>
                <UserAtom onUserChange={setUser} defaultValue={defaultUser} />
                <PasswordAtom onPasswordChange={setPassword} defaultValue={defaultPassword} />
                <LoginButton onClick={handleLogin} disabled={loading} />

                {/* Display a loading indicator when login is in progress */}
                {loading && <div className={styles.loading}>Logging in...</div>}

                {/* Display error message if an error occurs during login */}
                {error && (
                    <div className={styles.error}>
                        <b>{error}</b>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;
