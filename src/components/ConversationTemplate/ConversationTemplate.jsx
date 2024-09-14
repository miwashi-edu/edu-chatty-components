// ConversationTemplate.jsx
import React, { useState } from 'react';
import styles from './ConversationTemplate.module.css';
import { UserList, Modal } from "../UserList/";
import { UserWithName } from "../UserList/User.jsx";
import { Chat } from "../Chat";
import HideUsersButtonDecorator from "./HideUsersButtonDecorator.jsx";

const ShowUsersButton = ({ onClick }) => {
    return (
        <button onClick={onClick}>
            Show Users
        </button>
    );
};

export const ConversationTemplate = ({ users }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => setIsModalOpen(!isModalOpen);
    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            <ShowUsersButton onClick={toggleModal} />
            {isModalOpen && (
                <HideUsersButtonDecorator onClose={closeModal} className={styles.hideButton}>
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
