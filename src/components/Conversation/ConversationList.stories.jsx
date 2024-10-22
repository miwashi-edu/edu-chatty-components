import ConversationList from './ConversationList';
import convesationData from './conversationData.json';

export default {
    title: 'Components/Conversation/ConversationList',
    component: ConversationList,
}

export const Default = {

    args: {
        conversations: convesationData,
    }
}