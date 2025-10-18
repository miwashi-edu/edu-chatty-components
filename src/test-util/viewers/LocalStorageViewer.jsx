// LocalStorageViewer.jsx
import React, { useEffect, useMemo, useState } from "react";
import styles from "./viewers.module.css";

const hasWin = typeof window !== "undefined" && typeof window.localStorage !== "undefined";

function readAll() {
    if (!hasWin) return [];
    const out = [];
    for (let i = 0; i < window.localStorage.length; i++) {
        const k = window.localStorage.key(i);
        out.push({ key: k, value: window.localStorage.getItem(k) });
    }
    return out.sort((a, b) => (a.key || "").localeCompare(b.key || ""));
}

function normalizeList(x) {
    if (!x) return null;
    if (Array.isArray(x)) return x.map(String);
    if (typeof x === "string") return x.split(",").map(s => s.trim()).filter(Boolean);
    return null;
}

/**
 * Props:
 *  - include?: string[] | string (comma-separated)
 *  - omit?: string[] | string (comma-separated)
 * Behavior:
 *  - If include is provided, show only those keys (plus empty rows for any missing keys).
 *  - omit always hides matching keys (overrides include).
 */
export default function LocalStorageViewer({ include, omit }) {
    const [rows, setRows] = useState(readAll());
    const [msg, setMsg] = useState("");

    const [newKey, setNewKey] = useState("");
    const [newVal, setNewVal] = useState("");

    const [editing, setEditing] = useState(null); // key being edited
    const [editVal, setEditVal] = useState("");
    const [renaming, setRenaming] = useState(null); // key being renamed
    const [newName, setNewName] = useState("");

    const refresh = () => setRows(readAll());
    useEffect(() => { refresh(); }, []);

    const includeList = useMemo(() => normalizeList(include), [include]);
    const omitList = useMemo(() => normalizeList(omit), [omit]);

    const filteredRows = useMemo(() => {
        // start from actual rows
        let map = new Map(rows.map(r => [r.key, { key: r.key, value: r.value }]));

        // if include specified: restrict to include set, and add empty placeholders for missing
        if (includeList && includeList.length) {
            const incSet = new Set(includeList);
            const subset = new Map();
            includeList.forEach(k => {
                if (map.has(k)) subset.set(k, map.get(k));
                else subset.set(k, { key: k, value: "" , _virtual: true }); // empty row for missing key
            });
            map = subset;
        }

        // apply omit last (wins)
        if (omitList && omitList.length) {
            const omitSet = new Set(omitList);
            omitSet.forEach(k => map.delete(k));
        }

        // return sorted by key for stable display
        return [...map.values()].sort((a, b) => a.key.localeCompare(b.key));
    }, [rows, includeList, omitList]);

    const onAdd = () => {
        if (!hasWin) return;
        if (!newKey) return setMsg("key required");
        window.localStorage.setItem(newKey, newVal);
        setNewKey(""); setNewVal("");
        refresh();
        setMsg("item set");
    };

    const onEdit = (k, v) => {
        setEditing(k);
        setEditVal(v ?? "");
    };

    const onSave = (k) => {
        if (!hasWin) return;
        window.localStorage.setItem(k, editVal);
        setEditing(null);
        refresh();
        setMsg("item updated");
    };

    const onDelete = (k) => {
        if (!hasWin) return;
        window.localStorage.removeItem(k);
        if (editing === k) setEditing(null);
        refresh();
        setMsg("item deleted");
    };

    const onClearAll = () => {
        if (!hasWin) return;
        window.localStorage.clear();
        refresh();
        setMsg("all items cleared");
    };

    const onRename = (oldKey) => {
        setRenaming(oldKey);
        setNewName(oldKey);
    };

    const onApplyRename = (oldKey) => {
        if (!hasWin) return;
        const val = window.localStorage.getItem(oldKey);
        // If oldKey didn't exist (virtual), treat as create under new name
        if (newName && newName !== oldKey) {
            if (val !== null) {
                window.localStorage.setItem(newName, val);
                window.localStorage.removeItem(oldKey);
            } else {
                window.localStorage.setItem(newName, "");
            }
        }
        setRenaming(null);
        refresh();
        setMsg("item renamed");
    };

    const copyJSON = async () => {
        try {
            const obj = filteredRows.reduce((acc, { key, value }) => { acc[key] = value; return acc; }, {});
            await navigator.clipboard.writeText(JSON.stringify(obj, null, 2));
            setMsg("localStorage copied");
        } catch {
            setMsg("copy failed");
        }
    };

    const sizeInfo = useMemo(() => {
        const total = filteredRows.reduce((n, { key, value }) => n + (key?.length || 0) + (value?.length || 0), 0);
        return `${total} chars`;
    }, [filteredRows]);

    return (
        <div className={styles.section}>
            <div className={styles.title}>LocalStorage ({sizeInfo})</div>

            <div className={styles.controls} style={{ marginBottom: 8 }}>
                <div className={styles.actions}>
                    <button type="button" className={styles.btn} onClick={refresh}>Refresh</button>
                    <button type="button" className={styles.btn} onClick={copyJSON}>Copy JSON</button>
                </div>
                {msg && <pre className={styles.pre}>{msg}</pre>}
            </div>

            {filteredRows.length === 0 ? (
                <div className={styles.muted}>No localStorage items.</div>
            ) : (
                <ul className={styles.kvList}>
                    {filteredRows.map(({ key, value, _virtual }) => (
                        <li key={key} className={styles.kvItem} style={{ opacity: _virtual ? 0.85 : 1 }}>
                            <div className={styles.kvRow}>
                                <div className={styles.kvLine}>
                                    <strong className={styles.kvKey}>
                                        {renaming === key ? (
                                            <input
                                                className={styles.inlineInput}
                                                value={newName}
                                                onChange={(e) => setNewName(e.target.value)}
                                            />
                                        ) : (
                                            key
                                        )}
                                    </strong>
                                    <span className={styles.kvSep}>: </span>
                                    {editing === key ? (
                                        <input
                                            className={styles.inlineInput}
                                            value={editVal}
                                            onChange={(e) => setEditVal(e.target.value)}
                                        />
                                    ) : (
                                        <span className={styles.kvValue}>{value || "(empty)"}</span>
                                    )}
                                    {_virtual && <em className={styles.metaTag}>(not set)</em>}
                                </div>

                                <div className={styles.actions}>
                                    {editing === key ? (
                                        <>
                                            <button type="button" className={styles.btn} onClick={() => onSave(key)}>Save</button>
                                            <button type="button" className={styles.btn} onClick={() => { setEditing(null); setEditVal(""); }}>Cancel</button>
                                        </>
                                    ) : (
                                        <button type="button" className={styles.btn} onClick={() => onEdit(key, value)}>Edit</button>
                                    )}

                                    {renaming === key ? (
                                        <>
                                            <button type="button" className={styles.btn} onClick={() => onApplyRename(key)}>Apply rename</button>
                                            <button type="button" className={styles.btn} onClick={() => setRenaming(null)}>Cancel</button>
                                        </>
                                    ) : (
                                        <button type="button" className={styles.btn} onClick={() => onRename(key)}>Rename</button>
                                    )}

                                    <button type="button" className={`${styles.btn} ${styles.btnDanger}`} onClick={() => onDelete(key)}>Delete</button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
