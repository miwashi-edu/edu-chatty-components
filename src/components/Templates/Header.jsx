import React, { useContext } from 'react';
import { LoginContext } from '../Providers';

const Header = () => {
    const { isLoggedIn, logout } = useContext(LoginContext); // Destructure `logout` from context

    const handleLogout = () => {
        logout();
    };

    return (
        <div>
            <h1>Welcome to Our Application</h1>
            {isLoggedIn ? (
                <div>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : ('')}
        </div>
    );
};

export default Header;
