import Chat from './Chat';
import chatData from "../../testdata/chat.json";

export default {
    title: 'Chatty/Chat',
    component: Chat,
}

export const Default = {
    args: {
        title: 'Chat',
        currentUserId: 1431,
        messages: chatData,
    }
}


export const EmptyChat = {
    args: {
        title: 'Chat',
        currentUserId: 1431,
    }
}

export const EmptyChat2 = {
    args: {
        title: 'Chat',
        currentUserId: 1431,
        messages: [
            {
                "id": 14920,
                "text": "Nudå",
                "createdAt": "2024-09-04T08:18:41.000Z",
                "userId": 875,
                "conversationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
            },
            {
                "id": 15707,
                "text": "Hello, world!",
                "createdAt": "2024-09-06T14:02:13.000Z",
                "userId": 1350,
                "conversationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
            },
            {
                "id": 15708,
                "text": "tjenna",
                "createdAt": "2024-09-06T14:02:22.000Z",
                "userId": 1350,
                "conversationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
            },
        ]
    }
}