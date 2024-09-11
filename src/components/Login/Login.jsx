import React, { useState } from 'react';
import styles from './Login.module.css';
import UserAtom from "./UserAtom.jsx";
import PasswordAtom from "./PasswordAtom.jsx";
import LoginButton from "./LoginButtonAtom.jsx";

const Login = ({ loginFunction }) => {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginClick = () => {
        if (loginFunction) {
            loginFunction(user, password);
        } else {
            console.error('No login function provided!');
            console.error('User:', user);
            console.error('Password:', password);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.login}>
                <UserAtom onUserChange={setUser} />
                <PasswordAtom onPasswordChange={setPassword} />
                <LoginButton onClick={handleLoginClick} />
            </div>
        </div>
    );
};

export default Login;
