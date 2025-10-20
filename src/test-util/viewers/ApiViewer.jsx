// src/test-util/ApiViewer.jsx
import React, { useCallback, useMemo, useState } from 'react';
import styles from './viewers.module.css';
import { useApi } from '@/providers';

const json = (v) => JSON.stringify(v, null, 2);

export default function ApiViewer() {
    const {
        getEnv,
        getUsers, getUsersCount, getUserById, deleteUserById, updateUser,
        inviteUser,
        getConversations,
        getMessages, postMessage, deleteMessage,
    } = useApi();

    const [msg, setMsg] = useState('');
    const [out, setOut] = useState(null);

    // inputs
    const [userId, setUserId] = useState('');
    const [username, setUsername] = useState('');
    const [limit, setLimit] = useState(20);
    const [offset, setOffset] = useState(0);
    const [convId, setConvId] = useState('');
    const [text, setText] = useState('');
    const [msgId, setMsgId] = useState('');

    const call = useCallback(async (fn) => {
        try {
            setMsg('…');
            const res = await fn();
            setOut(res ?? '[no content]');
            setMsg('ok');
        } catch (e) {
            setOut(e?.payload ?? e?.message ?? String(e));
            setMsg('error');
        }
    }, []);

    const available = useMemo(() => ({
        getEnv: !!getEnv,
        getUsers: !!getUsers,
        getUsersCount: !!getUsersCount,
        getUserById: !!getUserById,
        deleteUserById: !!deleteUserById,
        updateUser: !!updateUser,
        inviteUser: !!inviteUser,
        getConversations: !!getConversations,
        getMessages: !!getMessages,
        postMessage: !!postMessage,
        deleteMessage: !!deleteMessage,
    }), [
        getEnv, getUsers, getUsersCount, getUserById, deleteUserById, updateUser,
        inviteUser, getConversations, getMessages, postMessage, deleteMessage,
    ]);

    return (
        <div className={styles.root}>
            <div className={styles.section}>
                <div className={styles.title}>API controls</div>

                <div className={styles.controls}>
                    <strong>Users</strong>
                    <div className={styles.actions}>
                        <input className={styles.inlineInput} placeholder="username filter" value={username} onChange={(e)=>setUsername(e.target.value)} />
                        <input className={styles.inlineInput} placeholder="limit" type="number" value={limit} onChange={(e)=>setLimit(Number(e.target.value||0))} />
                        <input className={styles.inlineInput} placeholder="offset" type="number" value={offset} onChange={(e)=>setOffset(Number(e.target.value||0))} />
                        <button type="button" className={styles.btn} disabled={!available.getUsers} onClick={() => call(() => getUsers({ username, limit, offset }))}>get users</button>
                        <button type="button" className={styles.btn} disabled={!available.getUsersCount} onClick={() => call(() => getUsersCount())}>count</button>
                    </div>

                    <div className={styles.actions}>
                        <input className={styles.inlineInput} placeholder="userId" value={userId} onChange={(e)=>setUserId(e.target.value)} />
                        <button type="button" className={styles.btn} disabled={!available.getUserById || !userId} onClick={() => call(() => getUserById(userId))}>get by id</button>
                        <button type="button" className={`${styles.btn} ${styles.btnDanger}`} disabled={!available.deleteUserById || !userId} onClick={() => call(() => deleteUserById(userId))}>delete by id</button>
                        <button
                            type="button"
                            className={styles.btn}
                            disabled={!available.updateUser || !userId}
                            onClick={() => call(() => updateUser(userId, { avatar: 'https://example.com/a.png' }))}>
                            update (avatar demo)
                        </button>
                    </div>

                    <strong>Invites</strong>
                    <div className={styles.actions}>
                        <input className={styles.inlineInput} placeholder="userId (target)" value={userId} onChange={(e)=>setUserId(e.target.value)} />
                        <input className={styles.inlineInput} placeholder="conversationId (uuid)" value={convId} onChange={(e)=>setConvId(e.target.value)} />
                        <button type="button" className={styles.btn} disabled={!available.inviteUser || !userId || !convId} onClick={() => call(() => inviteUser(userId, convId))}>invite</button>
                    </div>

                    <strong>Conversations</strong>
                    <div className={styles.actions}>
                        <button type="button" className={styles.btn} disabled={!available.getConversations} onClick={() => call(() => getConversations())}>get conversations</button>
                    </div>

                    <strong>Messages</strong>
                    <div className={styles.actions}>
                        <input className={styles.inlineInput} placeholder="conversationId (optional)" value={convId} onChange={(e)=>setConvId(e.target.value)} />
                        <button type="button" className={styles.btn} disabled={!available.getMessages} onClick={() => call(() => getMessages(convId || undefined))}>get messages</button>
                    </div>

                    <div className={styles.actions}>
                        <input className={styles.inlineInput} placeholder="text" value={text} onChange={(e)=>setText(e.target.value)} />
                        <input className={styles.inlineInput} placeholder="conversationId" value={convId} onChange={(e)=>setConvId(e.target.value)} />
                        <button type="button" className={styles.btn} disabled={!available.postMessage || !text} onClick={() => call(() => postMessage(text, convId || null))}>post message</button>
                    </div>

                    <div className={styles.actions}>
                        <input className={styles.inlineInput} placeholder="message id" value={msgId} onChange={(e)=>setMsgId(e.target.value)} />
                        <button type="button" className={`${styles.btn} ${styles.btnDanger}`} disabled={!available.deleteMessage || !msgId} onClick={() => call(() => deleteMessage(msgId))}>delete message</button>
                    </div>

                    <strong>Misc</strong>
                    <div className={styles.actions}>
                        <button type="button" className={styles.btn} disabled={!available.getEnv} onClick={() => call(() => getEnv())}>get /env</button>
                    </div>

                    <pre className={styles.pre}>status: {msg || '[idle]'}</pre>
                </div>
            </div>

            <div className={styles.section}>
                <div className={styles.title}>Output</div>
                <pre className={styles.pre}>{json(out)}</pre>
            </div>

            <div className={styles.section}>
                <div className={styles.title}>Available methods (read-only)</div>
                <pre className={styles.pre}>{json(available)}</pre>
            </div>
        </div>
    );
}
