import UserList from "./UserList";
import {UserWithName, UserWithEmail} from "./User";
import userData from "../../testdata/users.json";
import Modal from './Modal'; //
export default {
    title: 'Chatty/UserList',
    component: UserList,
}

export const Default = {
    args:{
        title: 'User',
        users: userData,
        config: {},
        children: <UserWithName />,
    },

}

export const AlternateUser = {
    args:{
        title: 'User',
        users: userData,
        config: {},
        children: <UserWithEmail />,
    },
}

export const UserListInModal = {
    args: {
        users: userData,
        children: <UserWithName />,
        config: {},
    },
    decorators: [
        (Story) => (
            <Modal isOpen={true}>
                <Story />
            </Modal>
        )
    ]
};

export const UserListOnScreen = {
    args: {
        config: {}, // Assuming some configuration if necessary
        users: userData,
        children: <UserWithName />,
    },
    decorators: [
        (Story) => (
            <div style={{ padding: '20px', border: '1px solid #ccc', maxWidth: '600px', margin: 'auto' }}>
                <Story />
            </div>
        )
    ]
};