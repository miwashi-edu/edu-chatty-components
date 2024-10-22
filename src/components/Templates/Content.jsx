import React, { useContext } from 'react';
import { LoginContext } from '../Providers';
import LoginOrganism from '../Organisms/LoginOrganism.jsx';
import ProfileOrganism from '../Organisms/ProfileOrganism.jsx';

const Content = ({ apiUrl, path, loginProps }) => {
    const { isLoggedIn } = useContext(LoginContext);
    return (
        <div>
            {isLoggedIn ? <ProfileOrganism apiUrl={apiUrl} path={path} /> : <LoginOrganism />}
        </div>
    );
};

export default Content;
