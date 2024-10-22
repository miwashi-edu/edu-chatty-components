import styles from './ConversationTemplate.module.css';
const ShowUsersButton = ({ onClick }) => {
    return (
        <button onClick={onClick} className={styles.showButton}>
            Show Users
        </button>
    );
};

export default ShowUsersButton;