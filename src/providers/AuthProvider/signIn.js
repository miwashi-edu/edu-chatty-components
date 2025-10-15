import {getCsrf} from "./getSrf.js";
import {joinUrl} from "./auth.js";

export const signIn = async ({ username, password, apiBaseUrl }) => {
    const csrf = await getCsrf();
    const res = await fetch(joinUrl(apiBaseUrl, '/auth/token'), {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, csrfToken: csrf }),
    });
    if (!res.ok) {
        const errText = await res.text().catch(() => '');
        throw new Error(`Login failed (${res.status}) ${errText}`);
    }
    const { token: t } = await res.json();
    if (!t) throw new Error('JWT token missing in response');
    return t;
};