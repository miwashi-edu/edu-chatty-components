import styles from './SideNav.module.css';
import { NavLink } from 'react-router-dom';
import {useAuth, useConfig} from "../../providers";

const isExternal = (to='') => /^(https?:\/\/|mailto:|tel:)/i.test(to);

const SideNav = ({ links }) => {
    const { AUTH_RANKS, PAGE_LINKS = [], menuLinks = [] } = useConfig();
    const { status } = useAuth();

    const source =
        (Array.isArray(links) && links.length ? links :
            (Array.isArray(PAGE_LINKS) && PAGE_LINKS.length ? PAGE_LINKS : menuLinks));

    const items = source.filter(({ minStatus }) =>
        !minStatus || AUTH_RANKS[status] >= AUTH_RANKS[minStatus]
    );

    const isEmpty = items.length === 0;

    return (
        <nav className={`${styles.nav} ${isEmpty ? styles.empty : ''}`} aria-label="Main">
            {isEmpty && <div className={styles.notice}>EMPTY</div>}
            {items.map((link) => {
                const { to, label, end, external, minStatus, ...rest } = link; // strip minStatus
                const ext = external ?? isExternal(to || '');
                return ext ? (
                    <a
                        key={to || label}
                        href={to}
                        className={styles.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        {...rest}
                    >
                        {label}
                    </a>
                ) : (
                    <NavLink
                        key={to || label}
                        to={to}
                        end={Boolean(end)}
                        className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
                        {...rest}
                    >
                        {label}
                    </NavLink>
                );
            })}
        </nav>
    );
};

export default SideNav;
