import ConversationTemplate from "./ConversationTemplate";
import userData from '../../testdata/users.json';
import chatData from '../../testdata/chat.json';

export default {
    title: 'Components/ConversationTemplate/ConversationTemplate',
    component: ConversationTemplate
}

export const Default = {
    args: {
        users: userData,
    }
}