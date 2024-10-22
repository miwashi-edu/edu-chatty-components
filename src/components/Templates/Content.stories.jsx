import React from 'react';
import { LoginProvider } from "../Providers";
import Content from './Content.jsx';

export default {
    title: 'Templates/Content',
    component: Content,
    decorators: [
        (Story) => <LoginProvider>
            <Story/>
        </LoginProvider>
    ],
    argTypes: {
        profileApiUrl: { control: 'text' },
        profilePath: { control: 'text' },
        loginProps: { control: 'object' }
    }
};

export const Default = {
    args: {
        apiUrl: 'http://localhost:3000',
        path: '/api/users/',
        loginProps: {}  // You can define default props for LoginOrganism here if needed
    }
};
