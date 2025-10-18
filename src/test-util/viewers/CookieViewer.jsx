import React, { useEffect, useMemo, useState } from "react";
import styles from "./viewers.module.css";
import { parseCookies } from "./util.js";

const hasDOM = typeof document !== "undefined";

function setCookie(name, value, { days, path = "/" } = {}) {
    if (!hasDOM) return;
    let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
    if (Number.isFinite(days)) {
        const d = new Date();
        d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
        cookie += `; expires=${d.toUTCString()}`;
    }
    cookie += `; path=${path}`;
    document.cookie = cookie;
}

function deleteCookie(name, path = "/") {
    if (!hasDOM) return;
    document.cookie = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}`;
}

export default function CookieViewer() {
    const [raw, setRaw] = useState(hasDOM ? document.cookie : "");
    const [msg, setMsg] = useState("");
    const [newKey, setNewKey] = useState("");
    const [newVal, setNewVal] = useState("");
    const [days, setDays] = useState("");
    const [path, setPath] = useState("/");

    const [editing, setEditing] = useState(null); // key being edited
    const [editVal, setEditVal] = useState("");

    const items = useMemo(() => parseCookies(raw), [raw]);

    const refresh = () => hasDOM && setRaw(document.cookie || "");

    useEffect(() => {
        if (!hasDOM) return;
        refresh();
        const iv = setInterval(refresh, 2000);
        const onVis = () => document.visibilityState === "visible" && refresh();
        document.addEventListener("visibilitychange", onVis);
        return () => {
            clearInterval(iv);
            document.removeEventListener("visibilitychange", onVis);
        };
    }, []);

    const onAdd = () => {
        if (!newKey) return setMsg("cookie key required");
        const d = days === "" ? undefined : Number(days);
        setCookie(newKey, newVal, { days: Number.isFinite(d) ? d : undefined, path: path || "/" });
        setNewKey(""); setNewVal("");
        refresh();
        setMsg("cookie set");
    };

    const onEdit = (key, value) => {
        setEditing(key);
        setEditVal(value ?? "");
    };

    const onSave = (key) => {
        setCookie(key, editVal, { path: "/" });
        setEditing(null);
        refresh();
        setMsg("cookie updated");
    };

    const onDelete = (key) => {
        deleteCookie(key, "/");
        if (editing === key) setEditing(null);
        refresh();
        setMsg("cookie deleted");
    };

    const onClearAll = () => {
        items.forEach(({ name }) => deleteCookie(name, "/"));
        refresh();
        setMsg("all cookies cleared (client-visible only)");
    };

    const copyRaw = async () => {
        try {
            await navigator.clipboard.writeText(raw || "");
            setMsg("cookies copied");
        } catch {
            setMsg("copy failed");
        }
    };

    return (
        <div className={styles.section}>
            <div className={styles.title}>Cookies (client-visible)</div>

            <div className={styles.controls} style={{ marginBottom: 8 }}>
                <div className={styles.actions}>
                    <button type="button" onClick={refresh}>Refresh</button>
                    <button type="button" onClick={copyRaw}>Copy</button>
                    <button type="button" onClick={onClearAll}>Clear all</button>
                </div>

                <div className={styles.actions}>
                    <input placeholder="key" value={newKey} onChange={(e) => setNewKey(e.target.value)} />
                    <input placeholder="value" value={newVal} onChange={(e) => setNewVal(e.target.value)} />
                    <input placeholder="days (optional)" inputMode="numeric" value={days} onChange={(e) => setDays(e.target.value)} style={{ maxWidth: 140 }} />
                    <input placeholder="path (default /)" value={path} onChange={(e) => setPath(e.target.value)} style={{ maxWidth: 160 }} />
                    <button type="button" onClick={onAdd}>Add / Update</button>
                </div>

                {msg && <pre className={styles.pre}>{msg}</pre>}
            </div>

            {items.length === 0 ? (
                <div>No cookies visible to JavaScript (HttpOnly cookies won’t show).</div>
            ) : (
                <ul style={{ margin: 0, paddingLeft: 16, display: "grid", gap: 8 }}>
                    {items.map(({ name, value }) => (
                        <li key={name} style={{ wordBreak: "break-all" }}>
                            <div style={{ display: "grid", gap: 6 }}>
                                <div>
                                    <strong>{name}</strong>{": "}
                                    {editing === name ? (
                                        <input value={editVal} onChange={(e) => setEditVal(e.target.value)} />
                                    ) : (
                                        <span>{value || "(empty)"}</span>
                                    )}
                                </div>
                                <div className={styles.actions}>
                                    {editing === name ? (
                                        <>
                                            <button type="button" onClick={() => onSave(name)}>Save</button>
                                            <button type="button" onClick={() => { setEditing(null); setEditVal(""); }}>Cancel</button>
                                        </>
                                    ) : (
                                        <button type="button" onClick={() => onEdit(name, value)}>Edit</button>
                                    )}
                                    <button type="button" onClick={() => onDelete(name)}>Delete</button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            <div style={{ marginTop: 8 }}>
                <div style={{ fontSize: 12, opacity: 0.75, marginBottom: 4 }}>Raw document.cookie</div>
                <pre className={styles.pre}>{raw || "(empty)"}</pre>
            </div>
        </div>
    );
}
