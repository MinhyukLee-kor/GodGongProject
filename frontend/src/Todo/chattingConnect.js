import SockJs from "sockjs-client";

let StompJs = require('@stomp/stompjs');

export function connect(client, roomNum, update, setUpdate, setNewMessage, newMessage) {
    client.current = new StompJs.Client({
        // brokerURL: "ws://localhost:8080/api/ws", // 웹소켓 서버로 직접 접속하는 것
        webSocketFactory: () => { return new SockJs("http://localhost:8080/api/ws") },
        connectHeaders: {},
        debug: function (str) {
            console.log(str);
        },
        // reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
    })

    client.current.onConnect = () => {
        subscribe(client, roomNum, update, setUpdate, setNewMessage, newMessage);
        
    }

    client.current.onStompError = function (frame) {
        console.log('Broker reported error: ' + frame.headers['message']);
        console.log('Additional details: ' + frame.body);
    };

    client.current.activate();
}

function subscribe(client, roomNum, update, setUpdate, setNewMessage, newMessage) {
    client.current.subscribe("/sub/room/" + roomNum,
        function (chat) {
            if (chat.body) {
                if (JSON.parse(chat.body).result == 'done') setUpdate(!update);
                else setNewMessage(newMessage => [...newMessage, JSON.parse(chat.body)]);
            } else {
                alert('got empty message!')
            }
        }
    )
};

export function disConnect(client) {
    client.current.deactivate();
};