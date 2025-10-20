import InputField from './InputField.atom';
import { action } from 'storybook/actions';

export default {
    title: 'Components/Login/InputField',
    component: User,
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