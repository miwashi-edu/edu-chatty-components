import React from 'react';
import styles from './Login.module.css';

const PasswordAtom = ({ onPasswordChange, defaultValue = '', label = "Password" }) => {
    // Guard: Ensure onPasswordChange is a function
    if (typeof onPasswordChange !== 'function') {
        console.warn("onPasswordChange should be a function.");
        return (
            <>
                <b>onPasswordChange function is required for PasswordAtom!</b><br />
            </>
        );
    }

    // Handle password input changes
    const handleChange = (e) => {
        const value = e.target.value;

        // Guard: Ensure password is not null or undefined
        if (value === null || value === undefined) {
            console.warn("Password cannot be null or undefined.");
            return;
        }

        // Guard: Optionally add password length or format validation here
        if (value.length < 8) {
            console.warn("Password is too short. It must be at least 8 characters.");
        }

        // Call onPasswordChange if all conditions are met
        onPasswordChange(value);
    };

    return (
        <div className={styles.passwordContainer}>
            <label htmlFor="passwordInput" className={styles.passwordLabel}>
                {label}:
                <input
                    type="password"
                    id="passwordInput"
                    defaultValue={defaultValue} // Set default value
                    onChange={handleChange}
                    placeholder="Enter password"
                    className={styles.passwordInput}
                    autoComplete="off"
                    minLength="8" // Enforce a minimum length for validation
                    required // Ensure password is provided
                />
            </label>
        </div>
    );
};

export default PasswordAtom;
