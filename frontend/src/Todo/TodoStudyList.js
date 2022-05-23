import React, { useState, useEffect } from "react";
import axios from 'axios';
import TodoModal from './TodoModal.js';
import TodoCard from "./TodoCard.js";
import { getNickName } from '../jwtCheck';
import { Button, Grid } from "@mui/material";
import styled from "styled-components";
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';

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
    width: ${props => props.isHome ? '0' : '65vw'}
`

function TodoStudyList(props) {

    const token = JSON.parse(localStorage.getItem('accessToken'));
    const userNickname = getNickName(token);
    
    let [rooms, setRooms] = useState([]);
    let [modalOpen, setModalOpen] = useState(false);
   
    let [update, setUpdate] = useState(false);

    let [nowPage, setNowPage] = useState(1);
    let LastIndex = nowPage * 8;
    let sliceTodoList = [];
    sliceTodoList = rooms && rooms.slice(0, LastIndex);

    useEffect(() => {
        axios.get('/api/chat/rooms')
            .then(res => {
                console.log(res.data);
                setRooms(res.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, [update])
       
    return (
        <Wrapper>
            {
                props.isHome || !userNickname
                    ? null
                    : <AddCircleOutlineRoundedIcon
                        sx={{ fontSize: 60, float: 'right', cursor: 'pointer' }}
                        onClick={() => setModalOpen(true)} />
            }
            <h1 style={{ textAlign: 'left', margin: '1rem' }}>함께하는 Todo✅</h1>
            {
                modalOpen && <TodoModal
                    task='createStudy'
                    open={modalOpen}
                    setOpen={setModalOpen}
                    update={update}
                    setUpdate={setUpdate} />
            }
            <Grid container
                direction="row"
                alignItems="stretch"
                spacing={1}>
                {
                    rooms.length != 0
                        ? sliceTodoList && sliceTodoList.map(studyRoom => {
                            return <TodoCard studyRoom={studyRoom} key={studyRoom.roomNumber} />
                        })
                        : <span>현재 운영중인 todo스터디가 없습니다.</span>
                }
            </Grid>

            {
                LastIndex >= (rooms && rooms.length) || props.isHome
                    ? null
                    : <Button
                        variant="contained" size="large"
                        sx={{
                            backgroundColor: 'black',
                            marginTop: '20px',
                            fontFamily: 'Pretendard-Medium',
                            borderRadius: '40px' }}
                        onClick={() => setNowPage(++nowPage)}>▼ 더보기</Button>
            }
        </Wrapper>
    );
}

export default TodoStudyList;