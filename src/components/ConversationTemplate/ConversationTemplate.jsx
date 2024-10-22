// ConversationTemplate.jsx
import React, { useState } from 'react';
import styles from './ConversationTemplate.module.css';
import { UserList, Modal } from "../UserList/";
import { UserWithName } from "../UserList/User.jsx";
import { Chat } from "../Chat";
import ShowUsersButton from "./ShowUsersButton.jsx";
import HideUsersButtonDecorator from "./HideUsersButtonDecorator.jsx";

export const ConversationTemplate = ({ users }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => setIsModalOpen(!isModalOpen);
    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            <ShowUsersButton onClick={toggleModal} />
            {isModalOpen && (
                <HideUsersButtonDecorator onClose={closeModal} >
                    <Modal isOpen={true}>
                        <UserList users={users}>
                            <UserWithName />
                        </UserList>
                    </Modal>
                </HideUsersButtonDecorator>
            )}
            <Chat />
        </>
    );
};

export default ConversationTemplate;
