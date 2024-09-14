import React from 'react';
import styles from './UserList.module.css';
import Avatar from './Avatar';

const UserWithName = ({ id, username, email, avatar }) => (
    <div className={styles.userContainer}>
        <Avatar src={avatar} alt={username} className={styles.userAvatarRound} />
        <h1 className={styles.userName}>{username}</h1>
    </div>
);

const UserWithEmail = ({ id, username, email, avatar }) => (
    <div className={styles.userContainerAlt}>
        <Avatar src={avatar} alt={username} className={styles.userAvatar} />
        <h1 className={styles.userName}>{email?email:'email missing'}</h1>
    </div>
);

export { UserWithName, UserWithEmail };
