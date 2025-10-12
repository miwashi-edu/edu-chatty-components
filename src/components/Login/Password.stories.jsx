import Password from "./Password.atom";
import { action } from 'storybook/actions';

export default {
    title: 'Components/Login/Password',
    component: Password,

};

export const Default = {
    args: {
        onPasswordChange: action('password-changed'),
    },
};

export const WithInitialValue = {
    args: {
        initialValue: 'password',
        onPasswordChange: action('password-changed'),
    },
};


export const MissingOnChange = {
    args: {
    },
};