import React, {useCallback} from "react";
import {ErrorBoundary} from '@/util'
import {Login as LoginForm} from "@/components/Login";

const signIn = (username, password) => {
    console.log("signIn", { username, password });
};

const Login = () => {
    const onSignIn = useCallback(signIn, []);
    return (
        <ErrorBoundary>
            <LoginForm onClick={onSignIn} />
        </ErrorBoundary>
    );
}

export default Login;
