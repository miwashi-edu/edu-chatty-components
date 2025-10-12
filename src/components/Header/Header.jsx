import React from 'react';
import { Logo } from '@/components/Logo';
import styles from './Header.module.css';

const Header = () => {
    return (
        <header className={styles.header}>
            <Logo className={styles.logo} size="md" />
            <div className={styles.spacer} />
            <h1>MENU</h1>
        </header>
    );
};

export default Header;