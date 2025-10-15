export const getCsrfToken = async (fetchingCsrf, setCsrfToken, KEY, API_BASE_URL) => {
    let alive = true;
    if (fetchingCsrf.current) return;
    fetchingCsrf.current = true;
    try {
        // 1) use from localStorage if present
        const cached = localStorage.getItem(KEY);
        if (cached) {
            if (alive) setCsrfToken(cached);
            return;
        }
        // 2) else refresh at load
        const res = await fetch(`${API_BASE_URL}/csrf`, { credentials: 'include' });
        if (!res.ok) return;
        const data = await res.json().catch(() => ({}));
        const token = data?.csrfToken || data?.token || '';
        if (token) {
            localStorage.setItem(KEY, token);
            if (alive) setCsrfToken(token);
        }
    } finally {
        fetchingCsrf.current = false;
    }
    init();
};
