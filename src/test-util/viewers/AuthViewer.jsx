import React,{useMemo} from 'react';
import { useAuth } from '@/providers';
import styles from './viewers.module.css';

const toInspectableJSON = (obj) => {
    const seen = new WeakSet();
    const json = JSON.stringify(
        obj,
        (k, v) => {
            if (typeof v === 'function') return v.toString(); // show function source/signature
            if (v && typeof v === 'object') {
                if (seen.has(v)) return '[Circular]';
                seen.add(v);
            }
            return v;
        },
        2
    );
    try {
        const base = JSON.parse(json);
        const proto = Object.getPrototypeOf(obj);
        if (proto && proto !== Object.prototype) {
            const methods = Object.fromEntries(
                Object.getOwnPropertyNames(proto)
                    .filter((n) => n !== 'constructor' && typeof obj[n] === 'function')
                    .map((n) => [n, obj[n].toString()])
            );
            base.__protoMethods = methods;
        }
        return JSON.stringify(base, null, 2);
    } catch {
        return json; // fallback if JSON.parse fails
    }
};

const AuthViewer = () => {
    const auth = useAuth();
    const pretty = useMemo(() => toInspectableJSON(auth), [auth]);
    return (
        <div className={styles.root}>
            <div className={styles.section}>
                <div className={styles.title}>Auth (read-only)</div>
                <pre className={styles.pre}>{pretty}</pre>
            </div>
        </div>
    );
};

export default AuthViewer;