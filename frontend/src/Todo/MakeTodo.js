import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import axios from "axios";
import { RoomNumContext, ClientContext } from './TodoStudyRoom.js';
import { getNickName } from '../jwtCheck.js';
import Swal from 'sweetalert2';

let Wrapper = styled.div`
    h4 {
        text-align: left;
        color: dimgrey;
        margin: 15px 0;
    }
`;
function MakeTodo({ setOpen, task }) {

    const token = JSON.parse(localStorage.getItem('accessToken'));
    const userNickname = getNickName(token);
    let client = useContext(ClientContext);
    let roomNum = useContext(RoomNumContext);
    let [todos, setTodos] = useState([]);
    let arr = [0, 1, 2, 3, 4];


    function onChange(e) {
        let copyTodos = [...todos];
        copyTodos[e.target.id] = e.target.value;
        copyTodos = copyTodos.filter((todo, i) => todo != '');
        setTodos(copyTodos);
    }

    function postTodo() {
        todos.map((todo) => {
            axios.post('/api/todo/insert', null, {
                params: {
                    userNickname: userNickname,
                    content: todo,
                    roomNumber: roomNum
                }
            })
                .then(res => {
                    console.log(res.data);
                })
                .catch(err => {
                    Swal.fire({
                        confirmButtonColor: '#2fbe9f',

                        confirmButtonText: '확인',
                        html: 'Todo 등록에 실패했습니다.<br>다시 시도해주세요!😢', // Alert 제목 

                    });

                    console.log(todo);
                    console.log(err);
                });
        });
    }

    function joinStudy() {

        if (task == 'join') {
            try {
                client.publish({
                    destination: '/pub/chat/enter',
                    body: JSON.stringify({
                        roomNumber: roomNum,
                        userNickname: userNickname,
                        message: ''
                    })
                });
                Swal.fire({
                    confirmButtonColor: '#2fbe9f',

                    confirmButtonText: '확인',
                    html: '스터디원이 되셨어요.<br>같이 열심히 Todo해요!😊', // Alert 제목 

                });

            } catch (err) {
                console.log(err.message);
            }
        } else {
            try {
                client.publish({
                    destination: '/pub/todo/add',
                    body: JSON.stringify({
                        roomNumber: roomNum,
                        userNickname: userNickname,
                        result: ''
                    })
                });
                Swal.fire({
                    confirmButtonColor: '#2fbe9f',

                    confirmButtonText: '확인',
                    html: '오늘의 todo를 생성했습니다.<br>같이 열심히 Todo해요!😊', // Alert 제목 

                });

            } catch (err) {
                console.log(err.message);
            }
        }

    }

    return (
        <Wrapper>
            <h2>나의 Todo List 만들기</h2>
            <h4>Todo는 최소 1개, 최대 5개까지 만들 수 있습니다.</h4>

            {
                arr.map(i => {
                    return <TextField
                        key={i}
                        fullWidth
                        variant="outlined"
                        size="small"
                        margin="dense"
                        label={'no.' + (i + 1)}
                        id={'' + i}
                        onChange={onChange}
                    />;
                })
            }
            {/* Todo추가버튼은 아이콘으로 변경 */}
            <Button
                variant="contained"
                style={{ marginTop: '1rem' }}
                onClick={() => {
                    if (todos.length == 0) {
                        return Swal.fire({
                            confirmButtonColor: '#2fbe9f',

                            confirmButtonText: '확인',
                            html: 'todo는 최소 1개 작성해야 합니다!😊', // Alert 제목 

                        });


                    };
                    console.log(todos);
                    postTodo();
                    setOpen(false);
                    joinStudy();
                }}>스터디시작</Button>
        </Wrapper>
    );
}

export default MakeTodo;