import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Grid } from "@mui/material";
import { getNickName } from '../jwtCheck.js';

let Wrapper = styled.div`
    background-color: white;
    box-shadow: 5px 5px 5px rgb(226, 233, 230);
    margin: 10px;
    padding: 1.5rem;
    text-align: left;
    cursor: pointer;
    border-radius: 2rem;
    // border: solid 8px black;
`

function TodoCard({ studyRoom }) {

    let navigate = useNavigate();
    const token = JSON.parse(localStorage.getItem('accessToken'));
    const userNickname = getNickName(token);
    let roomCreatedDate = studyRoom.roomCreated.substr(0, 4)
        + '.' + studyRoom.roomCreated.substr(5, 2)
        + '.' + studyRoom.roomCreated.substr(8, 2);
    let nickname = {
        userNickname: userNickname
    }

    function isMemberCheck() {
        axios.get('/api/chat/room/check', { params: nickname })
            .then(res => {
                console.log(res.data);
                if (!res.data || (res.data.room.roomNumber == studyRoom.roomNumber)) {
                    return navigate("/todoStudy/" + studyRoom.roomNumber);
                } else {
                    return alert('이미 참여하신 스터디가 있어 출입할 수 없습니다.');
                }
            })
            .catch(err => {
                console.log(err);
            })
    };

    return (
        <Grid item xs={3} >
            <Wrapper onClick={() => { isMemberCheck() }}>
                <h2>{studyRoom.roomTitle}</h2>
                 {studyRoom.roomCategory} <br />
                {roomCreatedDate} ~ <br />
                <h3 style={{textAlign: 'right', color: 'orangered'}}>5/6</h3>
            </Wrapper>
        </Grid>
    );
}

export default TodoCard;