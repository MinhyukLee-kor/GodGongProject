import React, { useContext, useEffect, useRef, useState } from "react";
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import CheckboxTodo from "./CheckboxTodo.js";
import ChattingBox from "./ChattingBox.js";
import JoinStudyBtn from "./JoinStudyBtn.js";
import ExitStudyBtn from "./ExitStudyBtn.js";
import DeleteTodoBtn from "./DeleteTodoBtn.js"
import { isAuth, getNickName } from '../jwtCheck.js';
import { Grid, Chip } from '@mui/material/';
import { connect, disConnect } from './chattingConnect.js';

let Wrapper = styled.div`
    margin: auto;
    padding: 3rem 0;
    width: 70%;
    text-align: left;

    h3 { margin-top: 1rem }

    button {
        font-family: 'Pretendard-Medium';
        font-size: 13pt;
        background-color: lightseagreen
    }
`;

export let RoomNumContext = React.createContext();
export let NewMessageContext = React.createContext();
export let ClientContext = React.createContext();
export let SetMemberContext = React.createContext();
export let TaskContext = React.createContext();

function TodoStudy() {

    let today = new Date().getFullYear() + '-' + (new Date().getMonth() + 1).toString().padStart(2, '0') + '-' + new Date().getDate().toString().padStart(2, '0')
    const token = JSON.parse(localStorage.getItem('accessToken'));
    const userNickname = getNickName(token);
    const navigate = useNavigate();
    let { roomNum } = useParams();
    let [room, setRoom] = useState([]);
    let [roomTodos, setRoomTodos] = useState([]);
    let [isMember, setIsMember] = useState(false);
    let [hasTodo, setHasTodo] = useState(false);
   
    let [newMessage, setNewMessage] = useState([]);
    let [badgeNum, setBadgeNum] = useState(-1);
    let client = useRef({});

    useEffect(async () => {
        await axios.get('/api/chat/rooms')
            .then(res => {
                setRoom(res.data.find((x) => x.roomNumber == roomNum));
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    useEffect(() => {
        if (!isAuth(token)) {
            alert('로그인 후 이용하실 수 있어요😥');
            return navigate('/login');
        };

        axios.get('/api/chat/room/check', {
            params: {
                userNickname: userNickname
            } })
            .then(res => {
                console.log(res.data);
                if (!res.data)
                    setIsMember(false);
                else if (res.data.room.roomNumber == roomNum) {
                    setIsMember(true);
                }
            })
            .catch(err => {
                console.log(err);
            })
        
        // message가 입장, 퇴장, done일때 리렌더링되야함
        axios.get('/api/todo/room', {
            params: {
                roomNumber: roomNum
            } })
            .then(res => {
                console.log(res.data);
                console.log(res.data.filter((item, i) => item.todoCreated.substr(0, 10) == today));
                setRoomTodos('');
            })
            .catch(err => {
                console.log(err);
            })

        // axios /room/enter 몇명들어가있는지 roomlog > return : 인원수세는거 (후순위)
        connect(client, roomNum, userNickname, setNewMessage, newMessage);
        return () => disConnect(client);
    }, [isMember]);

    useEffect(() => {
        setBadgeNum(++badgeNum);
    }, [newMessage])
    
    return (
        <Wrapper>
            <Grid alignItems="center" justifyContent="space-between" container spacing={3}>
                
                <Grid item xs={8}>
                    <Chip label={room.roomCategory} />
                    <br />
                    <h1>{room.roomTitle}</h1>
                    <h3>{room.roomCreated
                        && ('▶ ' + room.roomCreated.substr(0, 4) + '.'
                            + room.roomCreated.substr(5, 2) + '.'
                            + room.roomCreated.substr(8, 2) + ' 부터 이어지는 스터디')
                        }</h3>
                </Grid>
                <Grid item xs={4} sx={{ textAlign: 'right' }}>
                    <RoomNumContext.Provider value={roomNum}>
                        <NewMessageContext.Provider value={newMessage}>
                            <ClientContext.Provider value={client.current}>
                                <ChattingBox badgeNum={badgeNum} setBadgeNum={setBadgeNum} />
                            </ClientContext.Provider>
                        </NewMessageContext.Provider>
                    </RoomNumContext.Provider>
                </Grid>

                <Grid item xs={9} />
                <Grid item xs={2} style={{ textAlign: 'right' }}>
                    {
                        hasTodo
                            ? <RoomNumContext.Provider value={roomNum}>
                                <ClientContext.Provider value={client.current}>
                                    <DeleteTodoBtn />
                                </ClientContext.Provider>
                            </RoomNumContext.Provider>
                            : <RoomNumContext.Provider value={roomNum}>
                                <SetMemberContext.Provider value={setIsMember}>
                                    <JoinStudyBtn task={'onlyMake'} />
                                </SetMemberContext.Provider>
                            </RoomNumContext.Provider>
                    }
                </Grid>
                <Grid item xs={1} style={{ textAlign: 'right' }}>
                    {
                        isMember
                            ? <SetMemberContext.Provider value={setIsMember}>
                                <ClientContext.Provider value={client.current}>
                                    <ExitStudyBtn task={'exit'} />
                                </ClientContext.Provider>
                            </SetMemberContext.Provider>
                            : <RoomNumContext.Provider value={roomNum}>
                                <SetMemberContext.Provider value={setIsMember}>
                                    <ClientContext.Provider value={client.current}>
                                        <JoinStudyBtn task={'join'} />
                                    </ClientContext.Provider>
                                </SetMemberContext.Provider>
                            </RoomNumContext.Provider>
                    }
                </Grid>
                
                <Grid item xs={12}>
                    <CheckboxTodo />
                </Grid>
              
            </Grid>
        </Wrapper>
    );
}

export default TodoStudy;