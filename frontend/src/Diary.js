
import { useState, useEffect } from "react";
import { isAuth, getNickName } from './jwtCheck';
import axios from 'axios';


import { useNavigate } from "react-router-dom";
import {

    Box,
    Container,


} from '@mui/material/';
import './diary.css';
import Swal from 'sweetalert2';


const Diary = () => {

    const token = JSON.parse(localStorage.getItem('accessToken'));
    const nickName = getNickName(token);


    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let date = today.getDate();
    var format = "날짜 : " + year + "-" + (("00" + month.toString()).slice(-2)) + "-" + (("00" + date.toString()).slice(-2));
    const [state, setState] = useState({
        nickname: nickName,
        content: "",

    });

    const navigate = useNavigate();
    const handleChangeState = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };
    let body = {
        nickname: nickName,
        content: state.content

    };

    useEffect(() => {
        if (!isAuth(token)) {
            Swal.fire({
                confirmButtonColor: '#2fbe9f',

                confirmButtonText: '확인',
                text: '로그인 후 이용하실 수 있어요😥', // Alert 제목 

            });
            navigate('/login');
        }
    }, []);

    const handleSubmit = () => {
        axios
            .post('/api/diary/post', body)
            .then(function (response) {
                Swal.fire({
                    confirmButtonColor: '#2fbe9f',

                    confirmButtonText: '확인',

                    text: "일기가 작성되었습니다!😊", // Alert 내용 
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/mypage');
                    }

                });



            })
            .catch(function (err) {
                console.log(err);
                console.log(err.response.data.message);
                if (err.response.status === 400) {
                    alert(err.response.data.message);
                }


            });



    };
    function move() {
        navigate("/");
    }

    return (
        <Container className="DiaryEditor">
            <h2>공부 일기</h2>
            <Box component="form" sx={{ mt: 3 }}>
                <div>
                    <input
                        value={format}
                        onChange={handleChangeState}
                        name="date"
                        placeholder="날짜"
                        type="text"
                        readOnly
                    />
                </div>
                <div>
                    <textarea
                        value={state.content}
                        onChange={handleChangeState}
                        name="content"
                        placeholder="일기"
                        type="text"
                    />
                </div>
            </Box>
            <div className="btns">
                <button className="saveBtn" onClick={handleSubmit}>작성하기</button>
                <button className="deleteBtn" onClick={move}>취소하기</button>
            </div>
        </Container>
    );

};
export default Diary;
