const toSignal = x => (x?.signal ?? x);
const isSignal = s => !!s && typeof s.aborted === 'boolean' && typeof s.addEventListener === 'function';

function composeSignal(...inputs) {
    const signals = inputs.map(toSignal).filter(isSignal);
    if (signals.length === 0) return undefined;
    if (typeof AbortSignal.any === 'function') return AbortSignal.any(signals);
    return signals[0];
}

export async function getCsrfToken(KEY, url, { signal, renew = false } = {}) {
    if (renew) localStorage.removeItem(KEY);
    const cached = localStorage.getItem(KEY);
    if (cached) return cached;

    const localAC = new AbortController();
    const timeoutSig = typeof AbortSignal.timeout === 'function' ? AbortSignal.timeout(10_000) : undefined;

    const finalSignal = composeSignal(signal, localAC.signal, timeoutSig);

    const res = await fetch(url, {
        method: 'PATCH',
        credentials: 'include',
        signal: finalSignal,
    });

    if (!res.ok) return '';
    const data = await res.json().catch(() => ({}));
    const token = data?.csrfToken || data?.token || '';
    if (token) localStorage.setItem(KEY, token);
    return token;
}

