export const toInspectableJSON = (obj) => {
    const seen = new WeakSet();
    const json = JSON.stringify(
        obj,
        (k, v) => {
            if (typeof v === "function") return v.toString();
            if (v && typeof v === "object") {
                if (seen.has(v)) return "[Circular]";
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
            const methods = Object.getOwnPropertyNames(proto)
                .filter((n) => n !== "constructor" && typeof obj[n] === "function")
                .map((n) => [n, obj[n].toString()]);
            base.__protoMethods = Object.fromEntries(methods);
        }
        return JSON.stringify(base, null, 2);
    } catch {
        return json;
    }
};

export const parseCookies = (cookieStr) =>
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