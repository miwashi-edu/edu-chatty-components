import React, { useEffect, useState, Children, cloneElement } from 'react';
import { useLogin } from '../../Providers';

const Fetcher = ({ apiUrl, path, children, interval = 0 }) => {
    const { isLoggedIn, secureGet } = useLogin();
    const [ data, setData] = useState(null);
    const [ isLoading, setLoading] = useState(true);
    const [ error, setError] = useState(null);
    useEffect(() => {
        if (!isLoggedIn) {
            setLoading(false);
            setData(null);
            setError('Not logged in');
            return;
        }

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const result = await secureGet(apiUrl, path);
                setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();

        let intervalId;
        if (interval > 0) {
            intervalId = setInterval(fetchData, interval * 1000); // Setup periodic fetch
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [apiUrl, path, interval, isLoggedIn, secureGet]);

    if (error === 'Not logged in') return <div>{error}</div>;
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const enhancedChildren = Children.map(children, child => cloneElement(child, { data }));
    return <div>{enhancedChildren}</div>;
};

export default Fetcher;
