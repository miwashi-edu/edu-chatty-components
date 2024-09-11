import {PlaceHolder} from "../PlaceHolder";

export default {
    title: 'Chatty/UserList',
    component: PlaceHolder,
}

export const Default = {
    args:{
        title: 'User',
        users:[
            {
                "userId": 1430,
                "username": "miwa01",
                "avatar": "string"
            },
            {
                "userId": 1431,
                "username": "miwa02",
                "avatar": "string"
            }
        ]
    }
}