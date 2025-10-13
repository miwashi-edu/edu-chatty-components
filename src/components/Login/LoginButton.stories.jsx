import LoginButton from "./LoginButton.atom";
import { action } from 'storybook/actions';

export default {
    title: 'Components/Login/Button',
    component: LoginButton,

};

export const Default = {
    args: {
        onClick: action('password-changed'),
        username:'username',
        password:'password',
    },
};

export const MissingOnClick = {
    args: {
        username:'username',
        password:'password',
    },
};

export const AsLogin = {
    args: {
        isRegister: false,
        onClick: action('button-clicked'),
        username:'username',
        password:'password',
    },
};

export const AsRegister = {
    args: {
        isRegister: true,
        onClick: action('button-clicked'),
        username:'username',
        password:'password',
    },
};