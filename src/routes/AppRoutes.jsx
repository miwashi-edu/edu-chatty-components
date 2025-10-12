import React from 'react';
import {Route, Routes} from "react-router-dom";
import RequireStatus from "./RequireStatus.jsx";
import {useConfig} from "@/providers";
import {
    HomePage,
} from "@/pages";

export const AppRoutes = () => {
    const {AUTH_STATUS} = useConfig();
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
        </Routes>
    )
}

export default AppRoutes;