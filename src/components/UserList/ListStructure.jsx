import React, { useState } from 'react';
import styles from './UserList.module.css';

const ListStructure = ({ config, data, children }) => {
    if (!data || data.length === 0) return <div className={styles.noData}>No data provided</div>;
    if (!children) return <div className={styles.noChildren}>No children provided</div>;

    const { direction = 'column', gap = '5px' } = config || {};
    const [selectedRowIndex, setSelectedRowIndex] = useState(null);

    const handleRowClick = (index) => {
        setSelectedRowIndex(index);
    };

    const startConversation = (user) => {
        console.log('Starting conversation with:', user.username);
    };

    const containerStyle = {
        display: 'flex',
        flexDirection: direction,
        gap: gap
    };

    return (
        <div style={containerStyle}>
            {data.map((user, index) => (
                <div
                    key={index}
                    className={`${styles.userItem} ${index === selectedRowIndex ? styles.highlighted : ''}`}
                    onClick={() => handleRowClick(index)}
                >
                    {React.Children.map(children, child =>
                        React.cloneElement(child, { ...user })
                    )}
                    {index === selectedRowIndex && (
                        <button
                            onClick={() => startConversation(user)}
                            className={styles.startConversationButton}
                        >
                            Start Conversation
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ListStructure;
