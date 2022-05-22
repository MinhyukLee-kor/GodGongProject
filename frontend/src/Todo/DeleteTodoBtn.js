import { Button } from "@mui/material";
import React, { useContext } from "react";
import { getNickName } from '../jwtCheck.js';

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
            setHasTodo(false);
            alert('회원님의 todo가 삭제되었습니다.')
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