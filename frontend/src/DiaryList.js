
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import DiaryCom from "./components/DiaryCom";
import Pagination from "./Pagination";
import { isAuth, getNickName } from './jwtCheck';
import {


    Container,


} from '@mui/material/';
import './DiaryList.css';
import Swal from 'sweetalert2';
function DiaryList(diary) {



    const token = JSON.parse(localStorage.getItem('accessToken'));
    const nickname = getNickName(token);
    const navigate = useNavigate();


    const [loading, setLoading] = useState(true);
    const [diaries, setDiaries] = useState([]);
    const [state, setsState] = useState();

    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;
    const getDiaries = async () => {
        const json = await axios.get('/api/diary/mydiary', { params: { nickname: nickname } });
        setDiaries(json.data);
        setLoading(false);
        setsState(false);

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
    }, [state === true]);


    const handleSubmit = (diaryId) => {

        axios
            .get('/api/diary/delete/' + diaryId, { params: { diaryId: diaryId } })
            .then(function (response) {
                Swal.fire({
                    confirmButtonColor: '#2fbe9f',

                    confirmButtonText: '확인',
                    text: '일기가 삭제되었습니다!😊', // Alert 제목 

                }).then((result) => {
                    if (result.isConfirmed) {
                        setsState(true);
                    }

                });






            })
            .catch(function (err) {
                console.log(err);
                console.log(err.response.data.message);
            });

    };



    function move_dairy() {
        navigate("/diary");
    }







    return (

        <div>
            {loading ? (
                <div >
                    <h1 >Loading...</h1>
                </div>
            ) : (
                <div>

                    <Container className='diary_header'>

                        <div className='paging'> <h2>공부일기📆</h2>
                            <select
                                type="number"
                                value={limit}
                                onChange={({ target: { value } }) => setLimit(Number(value))}
                            >
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select></div>
                        <div>   <button className="diary" type="submit" onClick={() => move_dairy()}>일기 쓰기</button></div>

                    </Container>

                    <div >

                        {diaries.slice(offset, offset + limit).map((diary) => (

                            <DiaryCom
                                diary={diary}
                                key={diary.diaryId}
                                diaryId={diary.diaryId}
                                diaryContent={diary.diaryContent}
                                diarySentiment={diary.diarySentiment}
                                diaryCreated={diary.diaryCreated.substr(0, 10)}
                                handleSubmit={handleSubmit}

                            />


                        ))}


                    </div>
                    <Pagination
                        total={diaries.length}
                        limit={limit}
                        page={page}
                        setPage={setPage}
                    />
                </div>
            )}
        </div>
    );

}
export default DiaryList;