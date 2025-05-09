export const getCsrfToken = async () => {
    try {
        const response = await fetch('https://chatify-api.up.railway.app/csrf', {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
            }
        });
        const data = await response.json();
        return data.csrfToken;
    } catch (error) {
        console.error('Failed to fetch CSRF token:', error);
        return null;
    }
};

export const login = async (username, password, setIsLoggedIn, setBearerToken) => {
    const csrfToken = await getCsrfToken();
    if (!csrfToken) {
        console.log("CSRF token retrieval failed.");
        return;
    }
    console.log(`csrf token: ${csrfToken} obtained!`);
    try {
        const response = await fetch('https://chatify-api.up.railway.app/auth/token', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password,
                csrfToken: csrfToken
            })
        });
        const data = await response.json();
        sessionStorage.setItem('csrfToken', csrfToken);
        sessionStorage.setItem('bearerToken', data.token);
        setBearerToken(data.bearerToken);
        setIsLoggedIn(true);
        console.log(`logged in successfully!`);
    } catch (error) {
        console.error('Login failed:', error);
    }
};

export const logout = (setIsLoggedIn) => {
    console.log("Logging out.");
    sessionStorage.removeItem('csrfToken');
    sessionStorage.removeItem('bearerToken');
    setIsLoggedIn(false);
};

export const secureGet = async (apiUrl, path, options = {}) => {
    console.log(apiUrl);
    console.log(path);

    const token = sessionStorage.getItem('bearerToken');
    console.log(token);
    const headers = new Headers(options.headers || {});
    headers.append('Authorization', `Bearer ${token}`);

    try {
        const response = await fetch(`${apiUrl}${path}`, {
            ...options,
            headers: headers
        });
        return response.json();
    } catch (error) {
        console.error(`Failed to make secure call to ${apiUrl}${path}:`, error);
        return {error: error.message};
    }
};

export const securePost = async (apiUrl, path, body, options = {}) => {
    console.log(apiUrl);
    console.log(path);

    const token = sessionStorage.getItem('bearerToken');
    console.log(token);
    const headers = new Headers(options.headers || {});
    headers.append('Authorization', `Bearer ${token}`);
    headers.append('Content-Type', 'application/json');  // Ensuring JSON content type is set for POST requests

    try {
        const response = await fetch(`${apiUrl}${path}`, {
            method: 'POST',  // Setting the method to POST
            headers: headers,
            body: JSON.stringify(body),  // Stringifying the body as it should be sent as JSON
            ...options
        });
        return response.json();
    } catch (error) {
        console.error(`Failed to make secure POST call to ${apiUrl}${path}:`, error);
        return {error: error.message};
    }
};

