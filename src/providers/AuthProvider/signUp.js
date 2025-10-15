import {getCsrf} from "./getSrf.js";
import {joinUrl} from "./auth.js";

export const signUp = async ({ username, password, email, avatar, apiBaseUrl }) => {
    console.log(joinUrl(apiBaseUrl, "/auth/register"));
    const csrf = await getCsrf(apiBaseUrl);
    console.log(csrf);
    if (csrf) return;
    const res = await fetch(joinUrl(apiBaseUrl, "/auth/register"), {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, email, avatar, csrfToken: csrf }),
    });
    console.log("fetched");
    if (res.status === 201 || res.status === 400) {
        // 201 Created or 400 User exists (acceptable for manual flows)
        console.log(res.statusText);
        console.log(res.status);
        return true;
    }

    const errText = await res.text().catch(() => "");
    console.log(errText);
    throw new Error(`Register failed (${res.status}) ${errText}`);
}
