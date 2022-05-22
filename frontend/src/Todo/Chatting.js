import React, { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { getNickName } from '../jwtCheck.js';
import { RoomNumContext, NewMessageContext, ClientContext } from './TodoStudyRoom.js'

let Receive = styled.div`
    height: 75%;
    overflow: auto;
    width: 100%;
    padding: 1rem;
`
let Send = styled.div`
    height: 20%;
    padding: 0.7rem;
    border-top: 1px solid lightgray;
`
let Text = styled.textarea`
    width: 100%;
    height: 80%;
    margin: 0;
    padding: 10px;
    background-color: #e9e7e7;
    border: none;
    outline: none;
    font-family: 'Pretendard-Medium';
    font-size: 11pt;
`
let NewText = styled.div`
    background-color: #f0f0f0;
    padding: 5px;
    border-radius: 5px;
    display: inline-block;
`

function Chatting() {

    let token = JSON.parse(localStorage.getItem('accessToken'));
    let userNickname = getNickName(token);
    let roomNum = useContext(RoomNumContext);
    let newMessage = useContext(NewMessageContext);
    let client = useContext(ClientContext);
    let scrollRef = useRef();

    useEffect(() => {
        // scrollRef.current.scrollIntoView(false);
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView(
                {
                    behavior: 'smooth',
                    block: 'end',
                })
        }
    }, [newMessage]);

    function sendMessage(myMessage) {
        if (myMessage.length == 1)
            return alert('글자를 입력해주세요!');
        try {
            client.publish({
                destination: '/pub/chat/message',
                body: JSON.stringify({
                    roomNumber: roomNum,
                    userNickname: userNickname,
                    message: myMessage
                })
            });
        } catch(err) {
            console.log(err.message);
        }
    }

    return (
        <div style={{ height: '100vh' }}>
            <h2 style={{ height: '5%', padding: '10px 10px 12px 10px'}}>📢Chatting</h2>
            <Receive>
                {
                    newMessage && newMessage.map((chat, index) => (
                        chat.userNickname == userNickname
                            ? (<div key={index} style={{ padding: '10px', paddingBottom: 0, textAlign: 'right' }} ref={scrollRef}>
                                <b>{chat.userNickname}</b><br />
                                <NewText>{chat.message}</NewText>
                            </div>)
                            : (<div key={index} style={{ padding: '10px', paddingBottom: 0 }} ref={scrollRef}>
                                <b>{chat.userNickname}</b><br />
                                <NewText>{chat.message}</NewText>
                            </div>)
                    ))
                }
            </Receive>
            {/* 그냥 구경하러 온 사람은 채팅 못남기게 textarea 비활성화 */}
            <Send>
                <div style={{ height: '20%' }}>{userNickname}</div>
                <Text onKeyUp={(e) => {
                    if (e.key == 'Enter') {
                        sendMessage(e.target.value);
                        e.target.value = '';
                    }
                }}></Text>
            </Send>
        </div>
    );
}

export default Chatting;