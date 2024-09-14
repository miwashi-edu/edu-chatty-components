import React from 'react';
import {UserWithName, UserWithEmail} from "./User";

const Frame = ({ children, user }) => {
    return (
        <div style={{
            padding: '20px',
            margin: 'auto',
            maxWidth: '600px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}>
            {React.Children.map(children, child => React.cloneElement(child, { ...user }))}
        </div>
    );
};

export default {
    title: 'Chatty/User',
    component: Frame,
}

export const Default = {
    args:{
        user: {
            id: 1430,
            username: "miwa01",
            password: "$2a$10$9oS16yAtH6J1mkZmJmq98OFJ6qd.4a.0tYwbtHUZ6j3ZiqpOBW7dy",
            createdAt: "2024-09-11T21:55:20.000Z",
            email: "miwa01@example.com",
            avatar: "string",
            invite: null,
        },
        children: <UserWithName />,
    }
}

export const AlternateUser = {
    args:{
        id: 1430,
        username: "miwa01",
        password: "$2a$10$9oS16yAtH6J1mkZmJmq98OFJ6qd.4a.0tYwbtHUZ6j3ZiqpOBW7dy",
        createdAt: "2024-09-11T21:55:20.000Z",
        email: "miwa01@example.com",
        avatar: "string",
        invite: null,
        children: <UserWithEmail/>,
    }
}