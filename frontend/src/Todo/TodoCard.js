import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Grid } from "@mui/material";
import { getNickName } from '../jwtCheck.js';
import Swal from 'sweetalert2';

let Wrapper = styled.div`
    background-color: white;
    box-shadow: 5px 5px 5px rgb(226, 233, 230);
    margin: 10px;
    padding: 1.5rem;
    text-align: left;
    cursor: pointer;
    border-radius: 2rem;
`;

function TodoCard({ studyRoom }) {

    let navigate = useNavigate();
    const token = JSON.parse(localStorage.getItem('accessToken'));
    const userNickname = getNickName(token);
    let [membersNum, setMembersNum] = useState([]);
    let roomCreatedDate = studyRoom.roomCreated.substr(0, 4)
        + '.' + studyRoom.roomCreated.substr(5, 2)
        + '.' + studyRoom.roomCreated.substr(8, 2);
    let nickname = {
        userNickname: userNickname
    };

    axios.get('/api/todo/room', {
        params: {
            roomNumber: studyRoom.roomNumber
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


    function isMemberCheck() {

        if (!userNickname) {
            Swal.fire({
                confirmButtonColor: '#2fbe9f',
                confirmButtonText: '확인',
                text: '로그인 후 이용하실 수 있어요😥', // Alert 제목 
            });
            navigate('/login');
        };

        axios.get('/api/chat/room/check', { params: nickname })
            .then(res => {
                console.log(res.data);
                if (!res.data || (res.data.room.roomNumber == studyRoom.roomNumber)) {
                    return navigate("/todoStudy/" + studyRoom.roomNumber);
                } else {
                    return Swal.fire({
                        confirmButtonColor: '#2fbe9f',
                        confirmButtonText: '확인',
                        html: '이미 참여하신 스터디가 있어 출입할 수 없습니다!😢', // Alert 제목 
                    });
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <Grid item sm={6} md={4} lg={3} >
            <Wrapper onClick={() => { isMemberCheck(); }}>
                <h2>{studyRoom.roomTitle}</h2>
                {studyRoom.roomCategory} <br />
                {roomCreatedDate} ~ <br />
                <h3 style={{ textAlign: 'right', color: '#fd565f' }}>{membersNum}명</h3>
            </Wrapper>
        </Grid>
    );
}

export default TodoCard;