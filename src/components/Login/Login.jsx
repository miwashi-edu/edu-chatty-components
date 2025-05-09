import React, { useState } from 'react';
import styles from './Login.module.css';
import UserAtom from "./UserAtom";
import PasswordAtom from "./PasswordAtom";
import LoginButton from "./LoginButtonAtom";
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
                <UserAtom onUserChange={setUser} defaultValue={defaultUser} />
                <PasswordAtom onPasswordChange={setPassword} defaultValue={defaultPassword} />
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