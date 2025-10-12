import React from 'react';
import MainTemplate from '../components/Templates/MainTemplate.jsx';
import Header from '../components/Templates/Header.jsx';
import Footer from '../components/Templates/Footer.jsx';
import Content from '../components/Templates/Content.jsx';

const LoginPage = ({ headerProps, contentProps, footerProps }) => (
    <MainTemplate
        header={<Header {...headerProps} />}
        content={<Content {...contentProps} />}
        footer={<Footer {...footerProps} />}
    />
);

export default LoginPage;
