export const fetchCsrfToken = async () => {
    try {
        const response = await fetch('https://chatify-api.up.railway.app/csrf', {
            method: 'PATCH',
        });

        if (response.ok) {
            const data = await response.json();
            return data.csrfToken;  // Assuming the response has csrfToken
        } else {
            console.log('Failed to fetch CSRF token');
            return null;
        }
    } catch (error) {
        console.error('Error fetching CSRF token:', error);
        return null;
    }
};

export const authenticateUser = async (username, password) => {
    // First, fetch the CSRF token
    const csrfToken = await fetchCsrfToken();

    if (!csrfToken) {
        console.error('Failed to fetch CSRF token');
        return null;
    }

    try {
        const response = await fetch('https://chatify-api.up.railway.app/auth/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
                csrfToken: csrfToken,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            return data.token;  // Assuming the token is returned in response
        } else {
            console.log('Authentication failed');
            return null;
        }
    } catch (error) {
        console.error('Error during authentication:', error);
        return null;
    }
};