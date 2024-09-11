import Message from "./Message.jsx";
import styles from './Chat.module.css'; // Import styles for the container

export default {
    title: 'Chatty/Message',
    component: Message,
    decorators: [
        (Story) => (
            <div className={styles.testContainer}>
                <Story />
            </div>
        ),
    ],
};

export const Default = {
    args: {
        currentUserId: 1350,
        title: 'Message Response',
        id: 15724,
        text: "hej",
        createdAt: "2024-09-06T14:15:20.000Z",
        userId: 1350,
        conversationId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    },
};

export const OtherUser = {
    args: {
        currentUserId: 1351,
        title: 'Message Response',
        id: 15724,
        text: "hej",
        createdAt: "2024-09-06T14:15:20.000Z",
        userId: 1350,
        conversationId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    },
};
