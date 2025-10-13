import React, { useState } from 'react';
import styles from './Login.module.css';
import User from "./User.atom";
import Password from "./Password.atom";
import LoginButton from "./LoginButton.atom";
//import { useLogin } from '../Providers';

const Login = ({ defaultUser = '', defaultPassword = '', buttonCaption = '', isRegister = false, onClick}) => {
    //const { login, isLoading, error } = useLogin();
    const isLoading = false;
    const error = [];

    const [user, setUser] = useState(defaultUser);
    const [password, setPassword] = useState(defaultPassword);

    const handleOnClick = async () => {
        console.log(`logging in with ${user} ${password}`)
        await onClick(user, password);
    };

    return (
        <div className={styles.container}>
            <div className={styles.login}>
                <User onUserChange={setUser} defaultValue={defaultUser} />
                <Password onPasswordChange={setPassword} defaultValue={defaultPassword} />
                <LoginButton onClick={handleOnClick} disabled={isLoading} isRegister={isRegister}/>
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