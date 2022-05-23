
import { useState, useEffect } from "react";
import { isAuth } from './jwtCheck';
import axios from 'axios';


import { useNavigate, useParams } from "react-router-dom";
import {

    Box,
    Container,


} from '@mui/material/';
import './diary.css';

import Swal from 'sweetalert2';

const DiaryDetail = () => {

    const token = JSON.parse(localStorage.getItem('accessToken'));
    const { id } = useParams();


    const [diaries, setDiaries] = useState();
    const [date, setDate] = useState();

    const edit = diaries;
    const getDiaries = async () => {
        const json = await axios.get('/api/diary/edit/' + id, { params: { diaryId: id } });
        setDiaries(json.data.diaryContent);
        setDate(json.data.diaryCreated);


    };
    useEffect(() => {
        getDiaries();
        if (!isAuth(token)) {
            Swal.fire({
                confirmButtonColor: '#2fbe9f',

                confirmButtonText: '확인',
                text: '로그인 후 이용하실 수 있어요😥', // Alert 제목 

            });
            navigate('/login');
        }
    }, []);


    const navigate = useNavigate();
    let dateEdit = "" + date;
    let body = {
        diaryId: id,
        content: edit

    };


    function move() {
        navigate("/mypage");
    }
    const handleSubmit = () => {
        axios
            .post('/api/diary/edit/' + id, body)
            .then(function (response) {
                Swal.fire({
                    confirmButtonColor: '#2fbe9f',

                    confirmButtonText: '확인',

                    text: "일기가 수정되었습니다!😊", // Alert 내용 
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/mypage');
                    }

                });


            })
            .catch(function (err) {
                console.log(err);
            });



    };

    return (
        <Container className="DiaryEditor">
            <h2>공부 일기</h2>
            <Box component="form" sx={{ mt: 3 }}>

                <div>
                    <input
                        value={dateEdit.substring(0, 10)}

                        name="date"
                        placeholder="날짜"
                        type="text"
                        readOnly
                    />
                </div>
                <div>
                    <textarea
                        defaultValue={edit}
                        onChange={event => setDiaries(event.target.value)}
                        name="content"
                        placeholder="일기"
                        type="text"
                    />
                </div>
            </Box>
            <div className="btns">
                <button className="saveBtn" onClick={handleSubmit}>수정하기</button>
                <button className="deleteBtn" onClick={move}>취소하기</button>
            </div>
        </Container>
    );

};
export default DiaryDetail;
