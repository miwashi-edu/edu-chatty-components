import React from 'react';
import styles from './Login.module.css';

const UserAtom = ({ initialValue = "", onUserChange, label = "Username" }) => {
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

        // Guard: Ensure username is not null or undefined
        if (value === null || value === undefined) {
            console.warn("Username cannot be null or undefined.");
            return;
        }

        // Guard: Optionally add username length or format validation here
        if (value.length < 4) {
            console.warn("Username is too short. It must be at least 4 characters.");
        }

        // Call onUserChange if all conditions are met
        onUserChange(value);
    };

    return (
        <div className={styles.userContainer}>
            <label htmlFor="usernameInput" className={styles.userLabel}>
                {label}:
                <input
                    type="text"
                    id="usernameInput"
                    defaultValue={initialValue} // Set default value
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

export default UserAtom;
