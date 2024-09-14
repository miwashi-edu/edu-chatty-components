import React from 'react';
import styles from './UserList.module.css';
import defaultAvatar from './avatar.jpg';  // Import the default avatar image

const Avatar = ({ src, alt, className }) => (
    <img
        src={src || defaultAvatar}
        onError={(e) => { e.target.onerror = null; e.target.src = defaultAvatar; }}
        alt={alt}
        className={className}
    />
);

export default Avatar;
