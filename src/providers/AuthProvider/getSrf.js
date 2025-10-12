let csrfToken = null;
let inFlight = null;

export const getCsrf = async ({ apiBaseUrl, fetchFn = fetch } = {}) => {
    if (csrfToken) return csrfToken;
    if (inFlight) return inFlight;

    inFlight = (async () => {
        const res = await fetchFn(new URL('/csrf', apiBaseUrl), {
            method: 'PATCH',
            credentials: 'include',
        });
        if (!res.ok) throw new Error(`CSRF failed: ${res.status}`);
        const data = await res.json().catch(() => ({}));
        const token = data?.csrfToken;
        if (!token) throw new Error('CSRF token missing in response');
        csrfToken = token;
        return csrfToken;
    })();

    try {
        return await inFlight;
    } finally {
        inFlight = null; // clear whether success or error
    }
};

export const setCsrfToken = (token) => { csrfToken = token || null; };
export const getCachedCsrf = () => csrfToken;
