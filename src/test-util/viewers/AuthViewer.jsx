import React, { useEffect, useMemo, useState } from "react";
import { useConfig, useAuth } from "@/providers";
import styles from "./viewers.module.css";
import { toInspectableJSON, parseCookies } from "./util.js";
import CookieViewer from "./CookieViewer.jsx";
import LocalStorageViewer from "./LocalStorageViewer.jsx";
import SessionStorageViewer from "./SessionStorageViewer.jsx";

export default function AuthViewer() {
    const { signIn, signOut, signUp, token, status, ...rest } = useAuth();
    const { STORAGE_KEYS } = useConfig();

    // auth controls state
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState("");
    const [reg, setReg] = useState({ username: "", password: "", email: "", avatar: "" });
    const [msg, setMsg] = useState("");

    const [rawCookies, setRawCookies] = useState(typeof document !== "undefined" ? document.cookie : "");
    const cookies = useMemo(() => parseCookies(rawCookies), [rawCookies]);

    const pretty = useMemo(
        () => toInspectableJSON({ signIn, signOut, signUp, ...rest }),
        [signIn, signOut, signUp]
    );

    const doLogin = async () => {
        try {
            await signIn({ username: user, password });
            setMsg("login ok");
            refreshCookies();
        } catch (e) {
            setMsg(`login: ${e.message}`);
        }
    };

    const doRegister = async () => {
        try {
            await signUp({ username: user, password, email, avatar });
            setMsg("register ok (or exists)");
            refreshCookies();
        } catch (e) {
            setMsg(`register: ${e.message}`);
        }
    };

    const doGetCsrf = async () => {
        try {
            // add method later
            setMsg("csrf ok");
            refreshCookies();
        } catch (e) {
            setMsg(`get csrf token: ${e.message}`);
        }
    };

    const doLogout = async () => {
        try {
            await signOut();
            setMsg("logout ok");
            refreshCookies();
        } catch (e) {
            setMsg(`logout: ${e.message}`);
        }
    };

    const refreshCookies = () => {
        if (typeof document !== "undefined") setRawCookies(document.cookie || "");
    };

    // Auto-refresh cookies periodically + when tab becomes visible
    useEffect(() => {
        refreshCookies();
        const iv = setInterval(refreshCookies, 2000);
        const onVis = () => document.visibilityState === "visible" && refreshCookies();
        document.addEventListener("visibilitychange", onVis);
        return () => {
            clearInterval(iv);
            document.removeEventListener("visibilitychange", onVis);
        };
    }, []);

    const copyCookies = async () => {
        try {
            await navigator.clipboard.writeText(rawCookies);
            setMsg("cookies copied");
        } catch {
            setMsg("copy failed");
        }
    };

    return (
        <div className={styles.root}>


            <div className={styles.section}>
                <div className={styles.title}>Auth controls</div>

                <div className={styles.controls}>
                    <strong>Login</strong>
                    <input placeholder="username" value={user} onChange={(e) => setUser(e.target.value)} />
                    <input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <input placeholder="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input placeholder="avatar" value={avatar} onChange={(e) => setAvatar(e.target.value)} />

                    <div className={styles.actions}>
                        <button type="button" onClick={doLogin}>Login</button>
                        <button type="button" onClick={doRegister}>Register</button>
                        <button type="button" onClick={doLogout}>Logout</button>
                        <button type="button" onClick={doGetCsrf}>Get csrf token</button>
                    </div>

                    <pre className={styles.pre}>
token: {token ? "[set]" : "[none]"}{msg && `\n${msg}`}
                    </pre>
                    <pre className={styles.pre}>
status: {status}
                    </pre>
                </div>
            </div>

            <div className={styles.section}>
                <CookieViewer />
            </div>

            <div className={styles.section}>
                <LocalStorageViewer  include={[STORAGE_KEYS.AUTH_TOKEN, STORAGE_KEYS.CSRF_TOKEN]}/>
            </div>

            <div className={styles.section}>
                <SessionStorageViewer  include={[STORAGE_KEYS.AUTH_TOKEN, STORAGE_KEYS.CSRF_TOKEN]}/>
            </div>

            <div className={styles.section}>
                <div className={styles.title}>Auth (read-only inspect)</div>
                <pre className={styles.pre}>{pretty}</pre>
            </div>
        </div>
    );
}
