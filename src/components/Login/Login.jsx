import React, { useState } from 'react';
import styles from './Login.module.css';
import User from "./User.atom";
import InputField from "./InputField.atom";
import Password from "./Password.atom";
import LoginButton from "./LoginButton.atom";

const Login = ({ defaultUser = '', defaultPassword = '', buttonCaption = '', isRegister = false, onClick}) => {
    const isLoading = false;
    const error = [];

    const [user, setUser] = useState(defaultUser);
    const [password, setPassword] = useState(defaultPassword);
    const [avatar, setAvatar] = useState('');
    const [email, setEmail] = useState('');

    const handleOnClick = async () => {
        console.log(`logging in with ${user} ${password}`)
        await onClick(user, password);
    };

    return (
        <div className={styles.container}>
            <div className={styles.login}>
                <User onUserChange={setUser} defaultValue={defaultUser}  isRegister={isRegister}/>
                <Password onPasswordChange={setPassword} defaultValue={defaultPassword}  isRegister={isRegister}/>
                {isRegister && <InputField onValueChange={setAvatar}/>}
                {isRegister && <InputField onValueChange={setEmail}/>}
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