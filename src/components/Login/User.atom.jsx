import React from 'react';
import styles from './Login.module.css';

const User = ({ initialValue = "", onUserChange, label = "Username" }) => {
    // Guard: Ensure onUserChange is a function
    if (typeof onUserChange !== 'function') {
        console.warn("onUserChange should be a function.");
        return (
            <>
                <b>onUserChange function is required for UserAtom!</b><br />
            </>
        );
    }

    // Handle user input changes
    const handleChange = (e) => {
        const value = e.target.value;
        if (value === null || value === undefined) {
            console.warn("Username cannot be null or undefined.");
            return;
        }
        if (value.length < 4) {
            console.warn("Username is too short. It must be at least 4 characters.");
        }
        onUserChange(value);
    };

    return (
        <div className={styles.userContainer}>
            <label htmlFor="usernameInput" className={styles.userLabel}>
                {label}:
                <input
                    type="text"
                    id="usernameInput"
                    defaultValue={initialValue}
                    onChange={handleChange}
                    placeholder="Enter username"
                    className={styles.userInput}
                    minLength="4" // Optionally enforce a minimum length for validation
                    required // Ensure username is provided
                />
            </label>
        </div>
    );
};

export default User;
