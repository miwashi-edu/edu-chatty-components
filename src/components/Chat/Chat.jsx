import Message from './Message';
import styles from './Chat.module.css';

const Chat = ({ messages, currentUserId }) => {
    if(!messages){
        messages = [];
    }

    return (
        <div className={styles.chatContainer}>
            {currentUserId}
            {messages.map((message) => (
                <Message
                    key={message.id}
                    id={message.id}
                    text={message.text}
                    createdAt={message.createdAt}
                    userId={message.userId}
                    currentUserId={currentUserId}
                />
            ))}
        </div>
    );
};

export default Chat;
