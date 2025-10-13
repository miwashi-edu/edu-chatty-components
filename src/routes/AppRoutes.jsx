import React from 'react';
import {Route, Routes} from "react-router-dom";
import RequireStatus from "./RequireStatus.jsx";
import {useConfig} from "@/providers";
import {
    HomePage,
    ConfigPage,
    AuthPage,
    LoginPage,
    RegisterPage,
} from "@/pages";

export const AppRoutes = () => {
    const {AUTH_STATUS} = useConfig();
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/sign-in" element={<LoginPage />} />
            <Route path="/config" element={<ConfigPage />} />
            <Route path="/auth" element={<AuthPage />} />
        </Routes>
    )
}

export default AppRoutes;