import React from 'react';

const MainTemplate = ({ header, content, footer }) => (
    <div>
        <header>{header}</header>
        <main>{content}</main>
        <footer>{footer}</footer>
    </div>
);

export default MainTemplate;
