import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import axios from "axios";
import { getNickName } from '../jwtCheck.js';
import Swal from 'sweetalert2';

let Wrapper = styled.div`
   
`;
function MakeTodoStudy({ setOpen, update, setUpdate }) {

    const token = JSON.parse(localStorage.getItem('accessToken'));
    const userNickname = getNickName(token);

    let [room, setRoom] = useState({
        roomCategory: "",
        roomTitle: "",
        userNickname: userNickname
    });

    function onChange(e) {
        setRoom({
            ...room, [e.target.name]: e.target.value
        });
    }

    function submitStudy() {
        axios.post('/api/chat/room', null, { params: room })
            .then(res => {
                Swal.fire({
                    confirmButtonColor: '#2fbe9f',

                    confirmButtonText: '확인',
                    html: '스터디룸을 성공적으로 만들었어요!😊', // Alert 제목 

                });

                console.log(res.data);
                setOpen(false);
                setUpdate(!update);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <Wrapper>
            <h2>Todo Study 만들기</h2>
            <TextField
                required={true}
                fullWidth
                variant="outlined"
                margin="dense"
                name="roomTitle"
                label='방 제목'
                onChange={onChange}
            />
            <TextField
                required={true}
                fullWidth
                variant="outlined"
                margin="dense"
                name="roomCategory"
                label='카테고리 (ex. 대기업, 공무원, 수능...)'
                onChange={onChange}
            />
            <Button
                variant="contained"
                style={{ marginTop: '1rem' }}
                onClick={() => submitStudy()}>스터디 만들기</Button>
        </Wrapper>
    );
}

export default MakeTodoStudy;