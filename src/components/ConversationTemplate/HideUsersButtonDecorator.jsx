import React from 'react';

const HideUsersButtonDecorator = ({ children, onClose, className }) => {
    if (React.Children.count(children) !== 1) {
        console.error("HideUsersButtonDecorator expects exactly one child.");
        return null;
    }

    const child = React.Children.only(children);

    const closeButton = (
        <button onClick={onClose} className={className}>
            Hide Users
        </button>
    );

    return React.cloneElement(child, {
        ...child.props,
        children: (
            <>
                {child.props.children}
                {closeButton}
            </>
        )
    });
};

export default HideUsersButtonDecorator;
