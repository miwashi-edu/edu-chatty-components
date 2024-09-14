import styles from './UserList.module.css';

const Modal = ({ children, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                {children}
            </div>
        </div>
    );
};

export default Modal;
