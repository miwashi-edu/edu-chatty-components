import userData from "../../testdata/users.json";
import ListStructure from './ListStructure';

export default {
    title: 'Chatty/ListStructure',
    component: ListStructure,
};

//Mock User Component for test purposes
const UserDisplay = ({ username, email, createdAt, avatar }) => (
    <div style={{padding: '10px', border: '1px solid #ccc', borderRadius: '5px'}}>
        <p>Username: {username}</p>
        <p>Email: {email}</p>
        <p>Created At: {createdAt}</p>
        <p>Avatar: {avatar}</p>
    </div>
);

// Configuration for the ListStructure component
const config = {
    direction: 'column',
    gap: '20px'
};

export const DefaultUserList = {
    args: {
        config: config,
        data: userData,
        children: <UserDisplay />
    }
};
