import React, {useCallback} from "react";
import styles from '../pages.module.css';
import {Login as LoginForm} from "@/components/Login";
import {ErrorBoundary} from "@/util/index.js";
import {useAuth} from '@/providers';

const Register = () => {
    const {register} = useAuth;
    const onRegister = useCallback((username, password) => {
        console.log("registering", { username, password });
        register(username, password);
    }, [register]);

    return (
        <ErrorBoundary>
            <LoginForm onClick={onRegister} isRegister={true}/>
        </ErrorBoundary>
    );
}

export default Register;
