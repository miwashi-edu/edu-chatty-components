import React, { useContext } from 'react';
import { LoginContext } from '../Providers';

const Footer = () => {
    const { isLoggedIn } = useContext(LoginContext);
    return(
        <div>
            <p>Copyright © 2024</p>
            {isLoggedIn ? 'Logged in' : 'Not so much'}
        </div>
    )
};

export default Footer;
