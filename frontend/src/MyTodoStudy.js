import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { getNickName } from './jwtCheck.js';
import styled from "styled-components";

let Wrapper = styled.div`
    margin: auto;
    margin-top: 2vh;
    margin-bottom: 2vh;
    span {
        margin: auto;
        padding: 15vh 0;
        font-size: 20pt;
        color: grey;
    }
`;
let Card = styled.div`
    background-color: white;
    box-shadow: 5px 5px 5px rgb(226, 233, 230);
    margin: 10px;
    padding: 1.5rem;
    text-align: left;
    cursor: pointer;
    border-radius: 2rem;
`;

function MyTodoStudy() {

    let navigate = useNavigate();
    const token = JSON.parse(localStorage.getItem('accessToken'));
    const userNickname = getNickName(token);
    let [room, setRoom] = useState([]);
    let [roomDate, setRoomDate] = useState('');
    let [membersNum, setMembersNum] = useState([]);


    useEffect(() => {
        axios.get('/api/chat/room/check', {
            params: {
                userNickname: userNickname
            }
        })
            .then(res => {
                if (res.data) {
                    console.log(res.data);
                    setRoom(res.data.room);
                    setRoomDate(res.data.room.roomCreated.substr(0, 4)
                        + '.' + res.data.room.roomCreated.substr(5, 2)
                        + '.' + res.data.room.roomCreated.substr(8, 2));

                    // 인원 수 구하기
                    axios.get('/api/todo/room', {
                        params: {
                            roomNumber: res.data.room.roomNumber
                        }
                    })
                        .then(res => {
                            let num = [];
                            res.data.map(mem => {
                                num.push(mem.user.nickname);
                            });
                            num = [...new Set(num)];
                            setMembersNum(num.length);
                        })
                        .catch(err => {
                            console.log(err);
                        });
                } else return false;
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <Wrapper>
            <h4 style={{ textAlign: 'left', margin: '1rem' }}>나의 Todo Study✅</h4>
            {
                room.length != 0
                    ? <Card onClick={() => { navigate("/todoStudy/" + room.roomNumber); }}>
                        <h2>{room.roomTitle}</h2>
                        {room.roomCategory} <br />
                        {roomDate} ~ <br />
                        <h3 style={{ textAlign: 'right', color: '#fd565f' }}>{membersNum}명</h3>
                    </Card>
                    : <span>현재 함께하는 todo스터디가 없습니다.</span>
            }
        </Wrapper>
    );
}

export default MyTodoStudy;