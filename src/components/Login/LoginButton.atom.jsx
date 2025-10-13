import React from 'react';
import styles from './Login.module.css';

const LoginButton = ({
                         onClick,
                         isRegister = false,
                         isDisabled = false,
                     }) => {
    const hasHandler = typeof onClick === 'function';
    const label = hasHandler ? (isRegister ? 'Register' : 'Login') : 'onClick missing';

    const isValid = (u, p) => !!u?.trim() && !!p?.trim();
    const disabled = isDisabled || !hasHandler;

    const handleClick = (e) => {
        e.preventDefault();
        if (disabled) return;
        onClick();
    };

    return (
        <button
            className={styles.submitButton}
            onClick={handleClick}
            disabled={disabled}
        >
            {label}
        </button>
    );
};

export default LoginButton;
