import React from 'react';
import ProfileOrganism from './ProfileOrganism.jsx';
import { LoginProvider } from '../Providers';

export default {
    title: 'Organisms/ProfileOrganism',
    component: ProfileOrganism,
    decorators: [
        (Story) => <LoginProvider>
            <Story/>
        </LoginProvider>
    ],
    argTypes: {  // Use argTypes to control the args for the component in Storybook
        apiUrl: { control: 'text' },
        path: { control: 'text' }
    }
};

export const Default = {
    args: {
        apiUrl: 'http://localhost:3000',
        path: '/api/users/'
    }
};
