import UserAtom from './UserAtom';
import {action} from "@storybook/addon-actions";

export default {
    title: 'Login/UserAtom',
    component: UserAtom,
}

export const Default = {
    args: {
        onUserChange: action('password-changed'),
    },
};


export const WithInitialValue = {
    args: {
        initialValue: 'John Doe',
        onUserChange: action('password-changed'),
    },
};


export const MissingOnChange = {
    args: {
        initialValue: 'John Doe',
    },
};