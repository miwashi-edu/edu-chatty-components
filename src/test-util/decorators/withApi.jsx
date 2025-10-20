import React, { useMemo } from 'react';
import { ApiContext, useConfig } from '@/providers';

export const withApi = (Story) => {
    const { API_BASE_URL } = useConfig(); // for logs only

    const delay = (ms = 120) => new Promise(r => setTimeout(r, ms));
    const log = (label, data) => console.log(`[API mock] ${label}`, data ?? '');

    // simple id -> user helper
    const mkUser = (i) => ({ userId: String(i), username: `user${i}`, avatar: `https://i.pravatar.cc/64?img=${i}` });
    const USERS = Array.from({ length: 25 }, (_, i) => mkUser(i + 1));

    const value = useMemo(() => ({
        // Misc
        getEnv: async () => { log('GET /env'); await delay(); return 'development'; },

        // Users
        getUsers: async ({ username, limit = 20, offset = 0 } = {}) => {
            log('GET /users', { username, limit, offset });
            await delay();
            let list = USERS;
            if (username) list = list.filter(u => u.username.includes(username));
            return list.slice(offset, offset + limit);
        },
        getUsersCount: async () => { log('GET /users/count'); await delay(); return { total: USERS.length }; },
        getUserById: async (userId) => {
            log('GET /users/{userId}', { userId });
            await delay();
            const u = USERS.find(x => x.userId === String(userId));
            if (!u) { const e = new Error('Not Found'); e.status = 404; throw e; }
            return u;
        },
        deleteUserById: async (userId) => {
            log('DELETE /users/{userId}', { userId });
            await delay();
            // pretend success even if missing
            return { message: 'deleted' };
        },
        updateUser: async (userId, updatedData) => {
            log('PUT /user', { userId, updatedData });
            await delay();
            return { message: 'updated', token: 'mock.jwt.reissued' };
        },

        // Invites
        inviteUser: async (userId, conversationId) => {
            log('POST /invite/{userId}', { userId, conversationId });
            await delay();
            return { message: 'invite sent' };
        },

        // Conversations
        getConversations: async () => {
            log('GET /conversations');
            await delay();
            return {
                invitesReceived: ['11111111-1111-1111-1111-111111111111'],
                invitesSent: ['22222222-2222-2222-2222-222222222222'],
                participating: ['33333333-3333-3333-3333-333333333333'],
            };
        },

        // Messages
        getMessages: async (conversationId) => {
            log('GET /messages', { conversationId });
            await delay();
            const cid = conversationId ?? '33333333-3333-3333-3333-333333333333';
            return [
                { id: 1, text: 'hello', createdAt: new Date().toISOString(), userId: '1', conversationId: cid },
                { id: 2, text: 'world', createdAt: new Date().toISOString(), userId: '2', conversationId: cid },
            ];
        },
        postMessage: async (text, conversationId) => {
            log('POST /messages', { text, conversationId });
            await delay();
            const id = Math.floor(Math.random() * 100000);
            const createdAt = new Date().toISOString();
            const userId = '1';
            const cid = conversationId ?? null;
            return {
                message: { id, text, createdAt, userId, conversationId: cid },
                latestMessage: { id, text, conversationId: cid, createdAt, userId },
            };
        },
        deleteMessage: async (msgID) => {
            log('DELETE /messages/{msgID}', { msgID });
            await delay();
            return { message: 'deleted' };
        },
    }), [API_BASE_URL]);

    return (
        <ApiContext.Provider value={value}>
            <Story />
        </ApiContext.Provider>
    );
};
