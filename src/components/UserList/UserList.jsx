import ListStructure from './ListStructure.jsx';
import styles from './UserList.module.css';

const UserList = ({ config, users, children, className, style }) => {
    return (
        <div className={`${styles.userListContainer} ${className}`} style={style}>
            <ListStructure config={config} data={users}>
                {children}
            </ListStructure>
        </div>
    );
};

export default UserList;
