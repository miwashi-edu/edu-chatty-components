import styles from './Chat.module.css';

const Message = ({ id, text, createdAt, userId, currentUserId }) => {
    const formattedDate = new Date(createdAt).toLocaleString();
    const isCurrentUser = userId === currentUserId;

    return (
        <div className={`${styles.message} ${isCurrentUser ? styles.currentUser : styles.otherUser}`} key={id}>
            <div className={styles.messageHeader}>
                <span className={styles.user}>User ID: {userId}</span>
                <span className={styles.date}>{formattedDate}</span>
            </div>
            <div className={styles.messageBody}>
                <p>{text}</p>
            </div>
        </div>
    );
};

export default Message;
