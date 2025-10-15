// AuthViewer.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/providers";
import styles from "./viewers.module.css";
import { toInspectableJSON } from "./toInspectableJSON.js";

const parseCookies = (cookieStr) =>
    cookieStr
        .split(";")
        .map((c) => c.trim())
        .filter(Boolean)
        .map((c) => {
            const idx = c.indexOf("=");
            const name = idx >= 0 ? c.slice(0, idx) : c;
            const value = idx >= 0 ? decodeURIComponent(c.slice(idx + 1)) : "";
            return { name, value };
        });

export default function AuthViewer() {
    const { signIn, signOut, signUp, token, ...rest } = useAuth();

    // auth controls state
    const [loginU, setLoginU] = useState("");
    const [loginP, setLoginP] = useState("");
    const [reg, setReg] = useState({ username: "", password: "", email: "", avatar: "" });
    const [msg, setMsg] = useState("");

    // cookie viewer state
    const [rawCookies, setRawCookies] = useState(typeof document !== "undefined" ? document.cookie : "");
    const cookies = useMemo(() => parseCookies(rawCookies), [rawCookies]);

    const pretty = useMemo(
        () => toInspectableJSON({ signIn, signOut, signUp, ...rest }),
        [signIn, signOut, signUp]
    );

    const doLogin = async () => {
        try {
            console.log("login");
            await signIn({ username: loginU, password: loginP });
            setMsg("login ok");
            refreshCookies();
        } catch (e) {
            setMsg(`login: ${e.message}`);
        }
    };

    const doRegister = async () => {
        try {
            await signUp(reg);
            setMsg("register ok (or exists)");
            refreshCookies();
        } catch (e) {
            setMsg(`register: ${e.message}`);
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

                <div style={{ display: "grid", gap: 12 }}>
                    <div style={{ display: "grid", gap: 6 }}>
                        <strong>Login</strong>
                        <input placeholder="username" value={loginU} onChange={(e) => setLoginU(e.target.value)} />
                        <input placeholder="password" type="password" value={loginP} onChange={(e) => setLoginP(e.target.value)} />
                        <button onClick={doLogin}>Login</button>
                    </div>

                    <div style={{ display: "grid", gap: 6 }}>
                        <strong>Register</strong>
                        <input
                            placeholder="username"
                            value={reg.username}
                            onChange={(e) => setReg((s) => ({ ...s, username: e.target.value }))}
                        />
                        <input
                            placeholder="password"
                            type="password"
                            value={reg.password}
                            onChange={(e) => setReg((s) => ({ ...s, password: e.target.value }))}
                        />
                        <input
                            placeholder="email"
                            type="email"
                            value={reg.email}
                            onChange={(e) => setReg((s) => ({ ...s, email: e.target.value }))}
                        />
                        <input
                            placeholder="avatar"
                            value={reg.avatar}
                            onChange={(e) => setReg((s) => ({ ...s, avatar: e.target.value }))}
                        />
                        <button onClick={doRegister}>Register</button>
                    </div>

                    <div style={{ display: "grid", gap: 6 }}>
                        <strong>Logout</strong>
                        <button onClick={doLogout}>Logout</button>
                    </div>

                    <pre className={styles.pre}>
            token: {token ? "[set]" : "[none]"}
                        {msg && `\n${msg}`}
          </pre>
                </div>
            </div>

            <div className={styles.section}>
                <div className={styles.title}>Cookies (client-visible)</div>
                <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                    <button onClick={refreshCookies}>Refresh</button>
                    <button onClick={copyCookies}>Copy</button>
                </div>

                {cookies.length === 0 ? (
                    <div>No cookies visible to JavaScript (HttpOnly cookies won’t show).</div>
                ) : (
                    <ul style={{ margin: 0, paddingLeft: 16 }}>
                        {cookies.map(({ name, value }) => (
                            <li key={name} style={{ wordBreak: "break-all" }}>
                                <strong>{name}</strong>: {value || "(empty)"}
                            </li>
                        ))}
                    </ul>
                )}

                <div style={{ marginTop: 8 }}>
                    <div style={{ fontSize: 12, opacity: 0.75, marginBottom: 4 }}>Raw document.cookie</div>
                    <pre className={styles.pre}>{rawCookies || "(empty)"}</pre>
                </div>
            </div>

            <div className={styles.section}>
                <div className={styles.title}>Auth (read-only inspect)</div>
                <pre className={styles.pre}>{pretty}</pre>
            </div>
        </div>
    );
}
