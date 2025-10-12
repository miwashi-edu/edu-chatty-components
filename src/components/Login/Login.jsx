import React, { useState } from 'react';
import styles from './Login.module.css';
import User from "./User.atom";
import Password from "./Password.atom";
import LoginButton from "./LoginButton.atom";
import { useLogin } from '../Providers';

const Login = ({ defaultUser = '', defaultPassword = '' }) => {
    const { login, isLoading, error } = useLogin();
    const [user, setUser] = useState(defaultUser);
    const [password, setPassword] = useState(defaultPassword);

    const handleLogin = async () => {
        console.log(`logging in with ${user} ${password}`)
        await login(user, password);
    };

    return (
        <div className={styles.container}>
            <div className={styles.login}>
                <User onUserChange={setUser} defaultValue={defaultUser} />
                <Password onPasswordChange={setPassword} defaultValue={defaultPassword} />
                <LoginButton onClick={handleLogin} disabled={isLoading} />
                {isLoading && <div className={styles.loading}>Logging in...</div>}
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