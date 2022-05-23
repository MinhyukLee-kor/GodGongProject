import { Button } from "@mui/material";
import React, { useContext } from "react";
import { getNickName } from '../jwtCheck.js';
import Swal from 'sweetalert2';

function DeleteTodoBtn({ roomNum, client, setHasTodo}) {

    const token = JSON.parse(localStorage.getItem('accessToken'));
    const userNickname = getNickName(token);

    function deleteTodo() {
        try {
            client.publish({
                destination: '/pub/todo/delete',
                body: JSON.stringify({
                    roomNumber: roomNum,
                    userNickname: userNickname,
                    result: ''
                })
            });
            Swal.fire({
                confirmButtonColor: '#2fbe9f',
                
                confirmButtonText: '확인',
                html: '회원님의 todo가 삭제되었습니다!😊', // Alert 제목 

            });
            setHasTodo(false);
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <div>
            <Button
                variant="contained"
                style={{ backgroundColor: 'orange' }}
                onClick={() => deleteTodo()}>
                todo삭제
            </Button>
        </div>
    );
}

export default DeleteTodoBtn;