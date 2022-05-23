import React, { useEffect, useRef, useState } from "react";
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import CheckboxTodo from "./CheckboxTodo.js";
import ChattingBox from "./ChattingBox.js";
import JoinStudyBtn from "./JoinStudyBtn.js";
import ExitStudyBtn from "./ExitStudyBtn.js";
import DeleteTodoBtn from "./DeleteTodoBtn.js";
import { getNickName } from '../jwtCheck.js';
import { Grid, Chip } from '@mui/material/';
import { connect, disConnect } from './chattingConnect.js';

let Wrapper = styled.div`
    margin: auto;
    padding: 3rem 0;
    width: 70%;
    text-align: left;

    b {
        margin-left: 1rem;
        font-size: 15pt;
        font-weight: lighter;
        color: dimgray;
    }

    button {
        font-family: 'Pretendard-Medium';
        font-size: 13pt;
    }
`;

export let RoomNumContext = React.createContext();
export let NewMessageContext = React.createContext();
export let ClientContext = React.createContext();
export let SetMemberContext = React.createContext();
export let TaskContext = React.createContext();

function TodoStudy() {

    let today = new Date().getFullYear() + '-' + (new Date().getMonth() + 1).toString().padStart(2, '0') + '-' + new Date().getDate().toString().padStart(2, '0');
    const token = JSON.parse(localStorage.getItem('accessToken'));
    const userNickname = getNickName(token);
    let { roomNum } = useParams();
    let [room, setRoom] = useState([]);
    let [todos, setTodos] = useState([]);
    let [membersNum, setMembersNum] = useState([]);
    let [members, setMembers] = useState([]);
    let [isMember, setIsMember] = useState(false);
    let [hasTodo, setHasTodo] = useState(false);

    let [update, setUpdate] = useState(false);
    let [newMessage, setNewMessage] = useState([]);
    let [badgeNum, setBadgeNum] = useState(-1);
    let client = useRef({});

    useEffect(() => {
        axios.get('/api/chat/rooms')
            .then(res => {
                setRoom(res.data.find((x) => x.roomNumber == roomNum));
            })
            .catch(error => {
                console.log(error);
            });
    }, [update]);

    useEffect(() => {

        axios.get('/api/chat/room/check', {
            params: {
                userNickname: userNickname
            }
        })
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
            });

        // message가 입장, 퇴장, done일때 리렌더링되야함
        axios.get('/api/todo/room', {
            params: {
                roomNumber: roomNum
            }
        })
            .then(res => {
                console.log(res.data);

                // 인원수 구하기
                let num = [];
                res.data.map(mem => {
                    num.push(mem.user.nickname);
                });
                num = [...new Set(num)];
                setMembersNum(num.length);

                // 스터디 전체의 todo로부터 오늘의 todo를 구하고
                // 오늘의 todo에서 오늘의 멤버를 뽑아냄
                let todayTodos = res.data.filter((item, i) => item.todoCreated.substr(0, 10) == today);
                setTodos(todayTodos);

                let todayMember = [];
                todayTodos.map(todo => {
                    todayMember.push(todo.user.nickname);
                });
                todayMember = [...new Set(todayMember)];
                console.log(todayMember);
                setMembers(todayMember);

                // 오늘멤버에 내가 있는지 체크 (내가 오늘 작성한 todo가 있는지)
                if (todayMember.filter((nickname, i) => nickname == userNickname).length != 0)
                    setHasTodo(true);
            })
            .catch(err => {
                console.log(err);
            });

        // axios /room/enter 몇명들어가있는지 roomlog > return : 인원수세는거 (후순위)
        connect(client, roomNum, update, setUpdate, setNewMessage, newMessage);
        return () => disConnect(client);
    }, [update]);

    useEffect(() => {
        setBadgeNum(++badgeNum);
    }, [newMessage]);

    return (
        <Wrapper>
            <Grid alignItems="center" justifyContent="space-between" container spacing={3}>

                <Grid item xs={11}>
                    <Chip label={room.roomCategory} />
                    <b style={{ color: '#fd565f', fontSize: '17pt', fontWeight: 'bold' }}>{membersNum}명</b>
                    <br />
                    <h1 style={{ marginTop: '1rem' }}>{room.roomTitle}
                        <b>{room.roomCreated
                            && (room.roomCreated.substr(0, 4) + '.'
                                + room.roomCreated.substr(5, 2) + '.'
                                + room.roomCreated.substr(8, 2) + ' ~')}</b>
                    </h1>
                    <h2 style={{ marginTop: '1rem', color: 'dimgray' }}>
                        방장🏁 {room.user && room.user.nickname}
                    </h2>
                </Grid>
                <Grid item xs={1}>
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
                        isMember
                            ? (hasTodo
                                ? <DeleteTodoBtn
                                    roomNum={roomNum}
                                    client={client.current}
                                    setHasTodo={setHasTodo} />
                                : <RoomNumContext.Provider value={roomNum}>
                                    <ClientContext.Provider value={client.current}>
                                        <JoinStudyBtn task={'onlyMake'} />
                                    </ClientContext.Provider>
                                </RoomNumContext.Provider>)
                            : null
                    }
                </Grid>
                <Grid item xs={1} style={{ textAlign: 'right' }}>
                    {
                        isMember
                            ? <RoomNumContext.Provider value={roomNum}>
                                <ClientContext.Provider value={client.current}>
                                    <ExitStudyBtn />
                                </ClientContext.Provider>
                            </RoomNumContext.Provider>
                            : <RoomNumContext.Provider value={roomNum}>
                                <ClientContext.Provider value={client.current}>
                                    <JoinStudyBtn task={'join'} />
                                </ClientContext.Provider>
                            </RoomNumContext.Provider>
                    }
                </Grid>

                <Grid container item xs={12}>
                    {
                        todos.length == 0
                            ? <div style={{ textAlign: 'center', color: 'gray', fontSize: '20pt', margin: 'auto', padding: '7vw' }}>
                                오늘 스터디원들의 todo가 없습니다.<br />
                                오늘의 첫 todo를 만들어보세요!
                            </div >
                            : null
                    }
                    {
                        members && members.map(member => {
                            return <Grid item sm={6} md={4} lg={3}>
                                {/* 여기 context는 checkboxtodo가 아닌 그 하위 모달 ~ completeTodo로 가기 위한 것이기 떄문에 지우면 안됨 */}
                                <RoomNumContext.Provider value={roomNum}>
                                    <ClientContext.Provider value={client.current}>
                                        <CheckboxTodo
                                            nickname={member}
                                            myNickname={userNickname}
                                            roomNum={roomNum}
                                            client={client.current}
                                            todos={todos.filter((todo, i) => todo.user.nickname == member)}
                                            checkNum={todos.filter((todo, i) => todo.user.nickname == member)
                                                .filter((item, i) => item.todoCheck == true).length} />
                                    </ClientContext.Provider>
                                </RoomNumContext.Provider>
                            </Grid>;
                        })
                    }
                </Grid>

            </Grid>
        </Wrapper>
    );
}

export default TodoStudy;