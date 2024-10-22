import React from 'react';
import styles from './ConversationTemplate.module.css';

const HideUsersButtonDecorator = ({ children, onClose, className }) => {
    if (React.Children.count(children) !== 1) {
        console.error("HideUsersButtonDecorator expects exactly one child.");
        return (<>HideUsersButtonDecorator expects exactly one child.</>);
    }

    const child = React.Children.only(children);

    const closeButton = (
        <button onClick={onClose} className={styles.hideButton}>
            Hide Users
        </button>
    );

    return React.cloneElement(child, {
        ...child.props,
        children: (
            <>
                {child.props.children}
                {closeButton}
            </>
        )
    });
};

export default HideUsersButtonDecorator;
