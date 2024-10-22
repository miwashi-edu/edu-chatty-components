import React from 'react';
import MainTemplate from '../Templates/MainTemplate.jsx';
import Header from '../Templates/Header.jsx';
import Footer from '../Templates/Footer.jsx';
import Content from '../Templates/Content.jsx';

const LoginPage = ({ headerProps, contentProps, footerProps }) => (
    <MainTemplate
        header={<Header {...headerProps} />}
        content={<Content {...contentProps} />}
        footer={<Footer {...footerProps} />}
    />
);

export default LoginPage;
