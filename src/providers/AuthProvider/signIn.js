// signIn.js
export async function authSignIn(
    username,
    password,
    url,
    csrfToken,
    { signal, storageKey } = {}
) {
    const opAC = signal ? null : new AbortController();
    const finalSignal = signal ?? opAC?.signal;
    let existingToken = null;
    if (storageKey) {
        console.log('Reading existing token');
        try {
            existingToken = sessionStorage.getItem(storageKey) || null;
        } catch (_) {/* ignore storage errors */}
        if (!existingToken && typeof window !== 'undefined') {
            try {
                const loc = new URL(window.location.href);
                existingToken =
                    loc.searchParams.get(storageKey) ||
                    loc.searchParams.get('token') ||
                    null;
                if (existingToken) {
                    try { sessionStorage.setItem(storageKey, existingToken); } catch (_) {}
                }
            } catch (_) {/* ignore URL issues */}
        }
    }

    const headers = { 'Content-Type': 'application/json' };
    if (csrfToken) headers['x-csrf-token'] = csrfToken;
    if (existingToken) headers['authorization'] = `Bearer ${existingToken}`;
    console.log('Fetching token');
    try {
        const res = await fetch(url, {
            method: 'POST',
            credentials: 'include',
            signal: finalSignal,
            headers,
            body: JSON.stringify({
                username,
                password,
                csrfToken
            }),
        });

        if (!res.ok) {
            if (storageKey && (res.status === 401 || res.status === 403)) {
                try { sessionStorage.removeItem(storageKey); } catch (_) {}
            }
            throw new Error('Sign-in failed');
        }
        const data = await res.json().catch(() => ({}));

        if (storageKey) {
            const newToken = data?.token || data?.accessToken || null;
            if (newToken) {
                try { sessionStorage.setItem(storageKey, newToken); } catch (_) {}
            }
        }
    } catch (err) {
        console.error('fetch failed', err?.name, err?.message);
        if (err?.name === 'AbortError') console.warn('request aborted');
    } finally {
        console.log('fetch finished (success/fail)');
    }
    /*
    if (!res.ok) {
        if (storageKey && (res.status === 401 || res.status === 403)) {
            try { sessionStorage.removeItem(storageKey); } catch (_) {}
        }
        throw new Error('Sign-in failed');
    }

    const data = await res.json().catch(() => ({}));

    // Persist new token from response (if any)
    if (storageKey) {
        const newToken = data?.token || data?.accessToken || null;
        if (newToken) {
            try { sessionStorage.setItem(storageKey, newToken); } catch (_) {}
        }
    }*/

    return "data";
}
