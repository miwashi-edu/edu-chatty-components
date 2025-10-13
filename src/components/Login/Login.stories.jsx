import React from 'react';
import Login from './Login';

export default {
    title: 'Components/Login',
    component: Login,
    decorators: []
};

export const Default = {
    args: {
        defaultUser: 'exampleUser',
        defaultPassword: 'examplePassword'
    }
};

export const NoOnLoginProvided = {args: {}};

export const AsLogin = {
    args: {
        isRegister: false
    }
};

export const AsRegister = {
    args: {
        isRegister: true
    }
};
