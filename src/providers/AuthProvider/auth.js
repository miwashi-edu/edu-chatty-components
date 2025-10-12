export const joinUrl = (base, path) => {
    if (!path) return base;
    if (/^https?:\/\//i.test(path)) return path;
    return `${base.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`;
};