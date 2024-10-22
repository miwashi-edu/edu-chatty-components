import { AuthProvider } from './AuthProvider.jsx';
import LoginModal from './LoginModal';
import { within, userEvent } from '@storybook/testing-library';

const mockOnLogin = (token) => {
    alert(`Login successful! Token: ${token}`);
};

export default {
    title: 'Login/LoginModal',
    component: LoginModal,
    decorators: [
        (Story) => (
            <AuthProvider>
                <Story />
            </AuthProvider>
        )
    ],
};

export const Default = {
    args: {
        onLogin: mockOnLogin
    }
}

/*
const Template = (args) => <LoginModal {...args} />;

// Default story with the login modal showing
export const Default = Template.bind({});
Default.args = {
    onLogin: mockOnLogin,
};

// Simulate user interaction for the login modal
export const WithUserInteraction = Template.bind({});
WithUserInteraction.args = {
    onLogin: mockOnLogin,
};

// Simulating user input and login process
WithUserInteraction.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find input fields and buttons
    const usernameInput = canvas.getByPlaceholderText('Username');
    const passwordInput = canvas.getByPlaceholderText('Password');
    const loginButton = canvas.getByText('Login');

    // Simulate user typing the username and password
    await userEvent.type(usernameInput, 'admin');
    await userEvent.type(passwordInput, 'password');

    // Simulate the user clicking the login button
    await userEvent.click(loginButton);
};
*/