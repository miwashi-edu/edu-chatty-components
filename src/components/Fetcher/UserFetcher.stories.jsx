import UserFetcher from './UserFetcher';
import {LoginProvider} from "../Login/LoginProvider.jsx";
import Login from "../Login/Login.jsx";
import Chat from "../Chat/Chat.jsx";

export default {
    title: 'Components/Fetcher/UserFetcher',
    component: UserFetcher,
}

export const Default = {
    args: {

    },
    render: () => <div>
        <LoginProvider>
            <Login />

            <UserFetcher>
                <Chat />
            </UserFetcher>
        </LoginProvider>
    </div>
}