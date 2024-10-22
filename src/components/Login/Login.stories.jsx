import React from 'react';
import { LoginProvider } from '../Providers/'; // Corrected import
import Login from './Login';

export default {
    title: 'Login/Login',
    component: Login,
    decorators: [(Story) => (
        <LoginProvider>
            <Story />
        </LoginProvider>
    )]
};

export const Default = {
    args: {
        defaultUser: 'exampleUser', // If needed to prefill fields or similar
        defaultPassword: 'examplePassword' // If needed to prefill fields or similar
    }
};

export const NoOnLoginProvided = {
    args: {
        // This scenario might be irrelevant if `onLogin` isn't actually used by the component
    }
};
