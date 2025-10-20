import { useCallback, useMemo } from 'react';
import ApiContext from './ApiContext.jsx';
import { useAuth } from '@/providers';

const ApiProvider = ({ children }) => {
    const { secureFetch } = useAuth(); // fixed: call the hook

    // Misc
    const getEnv = useCallback(() => {
        return secureFetch('GET', undefined, undefined, '/env');
    }, [secureFetch]);

    // Users (JWT)
    const getUsers = useCallback(({ username, limit = 20, offset = 0 } = {}) => {
        const url = new URL('/users', location.origin);
        const q = new URLSearchParams();
        if (username) q.set('username', username);
        if (limit != null) q.set('limit', String(limit));
        if (offset != null) q.set('offset', String(offset));
        url.search = q.toString();
        return secureFetch('GET', undefined, undefined, url.toString());
    }, [secureFetch]);

    const getUsersCount = useCallback(() => {
        return secureFetch('GET', undefined, undefined, '/users/count');
    }, [secureFetch]);

    const getUserById = useCallback((userId) => {
        return secureFetch('GET', undefined, undefined, `/users/${userId}`);
    }, [secureFetch]);

    const deleteUserById = useCallback((userId) => {
        return secureFetch('DELETE', undefined, undefined, `/users/${userId}`);
    }, [secureFetch]);

    // PUT /user — body: { userId, updatedData: { ... } } → returns { message, token }
    const updateUser = useCallback((userId, updatedData) => {
        return secureFetch('PUT', undefined, { userId, updatedData }, '/user');
    }, [secureFetch]);

    // Invites (JWT)
    // POST /invite/{userId} — body: { conversationId }
    const inviteUser = useCallback((userId, conversationId) => {
        return secureFetch('POST', undefined, { conversationId }, `/invite/${userId}`);
    }, [secureFetch]);

    // Conversations (JWT)
    const getConversations = useCallback(() => {
        return secureFetch('GET', undefined, undefined, '/conversations');
    }, [secureFetch]);

    // Messages (JWT)
    // GET /messages?conversationId=...
    const getMessages = useCallback((conversationId) => {
        const url = new URL('/messages', location.origin);
        if (conversationId) url.search = new URLSearchParams({ conversationId }).toString();
        return secureFetch('GET', undefined, undefined, url.toString());
    }, [secureFetch]);

    // POST /messages — body: { text, conversationId }
    const postMessage = useCallback((text, conversationId) => {
        return secureFetch('POST', undefined, { text, conversationId }, '/messages');
    }, [secureFetch]);

    // DELETE /messages/{msgID}
    const deleteMessage = useCallback((msgID) => {
        return secureFetch('DELETE', undefined, undefined, `/messages/${msgID}`);
    }, [secureFetch]);

    const value = useMemo(
        () => ({
            // misc
            getEnv,
            // users
            getUsers,
            getUsersCount,
            getUserById,
            deleteUserById,
            updateUser,
            // invites
            inviteUser,
            // conversations
            getConversations,
            // messages
            getMessages,
            postMessage,
            deleteMessage,
        }),
        [
            getEnv,
            getUsers,
            getUsersCount,
            getUserById,
            deleteUserById,
            updateUser,
            inviteUser,
            getConversations,
            getMessages,
            postMessage,
            deleteMessage,
        ],
    );

    return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

export default ApiProvider;
