import {PlaceHolder} from "../PlaceHolder";

export default {
    title: 'Chatty/MessageResponse',
    component: PlaceHolder,
}

export const Default = {
    args:{
        title: 'Message Response',
        response: {
            "message": "Message created successfully",
            "latestMessage": {
                "id": 16022,
                "text": "Hello There!",
                "conversationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
            }
        },
    }
}