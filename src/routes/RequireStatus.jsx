import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import {useAuth, useConfig} from "../providers";

const RequireStatus = ({ min, redirectTo, fallback = null, children }) => {
    const { status } = useAuth();
    const { PAGE_LINKS, AUTH_RANK, AUTH_STATUS } = useConfig();                // e.g. { signIn: "/sign-in" }
    const loc = useLocation();
    console.log("Reqquire");
    console.log(AUTH_STATUS);
    console.log(AUTH_RANK);
    if(!min) min = AUTH_STATUS.AUTHORISED;
    if (status === AUTH_STATUS.LOADING) return fallback;

    const ok = AUTH_RANK[status ?? AUTH_STATUS.IDLE] >= AUTH_RANK[min];
    if (ok) return children ?? <Outlet />;

    const target = redirectTo ?? PAGE_LINKS?.signIn ?? "/sign-in";
    if (loc.pathname === target) return null;             // avoid loop
    return <Navigate to={target} replace state={{ from: loc }} />;
};

export default RequireStatus;
