import React, { useEffect, useState } from 'react';
import { useLogin } from '../Login/LoginProvider';  // Corrected path based on your structure

const UserFetcher = ({ children }) => {
    const { token } = useLogin();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            console.log('Fetching user data', token);
            if (!token) return;  // Exit if there's no token
            setLoading(true);
            try {
                const response = await fetch('https://api.example.com/user/data', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    setUserData(data);
                } else {
                    throw new Error(data.message || "Failed to fetch user data.");
                }
            } catch (error) {
                setError(error.message);
                console.error('Fetching user data failed:', error);
            } finally {
                setLoading(false);
            }
        };

        const intervalId = setInterval(fetchUserData, 5000); // Poll every 5 seconds

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, [token]); // Effect runs when token changes

    // Render only if there is exactly one child
    const childElement = React.Children.only(children);

    return React.cloneElement(childElement, { userData, loading, error });
};

export default UserFetcher;
