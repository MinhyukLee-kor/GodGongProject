
import { useState, useEffect, useContext } from "react";
import { isAuth, getNickName, getId } from './jwtCheck';
import axios from 'axios';


import { useNavigate, useParams } from "react-router-dom";
import {

    Box,
    Container,


} from '@mui/material/';
import './diary.css';



const User = () => {

    const token = JSON.parse(localStorage.getItem('accessToken'));
    const nickname = getNickName(token);
    const userId = getId(token);
    const navigate = useNavigate();



    const [user, setUser] = useState([]);
    const [nic, setNick] = useState();
    const [birth, setBirth] = useState();
    const [state, setsState] = useState();
    const getDiaries = async () => {
        const json = await axios.get('/api/users/' + userId, { params: { id: userId } });
        console.log(json);
        setUser(json.data);
        setNick(json.data.nickname);
        setBirth(json.data.birth);

        console.log(user);
        setsState(false);
    };
    useEffect(() => {
        getDiaries();
        if (!isAuth(token)) {
            alert('로그인 후 이용하실 수 있어요😥');
            return navigate('/login');
        }
    }, [state == true]);
    let body = {
        diaryId: userId,
        nickname: nic

    };

    const handleSubmitNic = () => {
        axios
            .post('/api/user/' + userId + '/nickname', body)
            .then(function (response) {
                console.log(response.status, '성공');

                navigate('/mypage/user');
                console.log(response);
                alert("저장 성공!");


            })
            .catch(function (err) {
                console.log(err);

                console.log(origin);



            });



    };

    console.log(user.nickname);
    return (
        <Container className="DiaryEditor">
            <h3>{getNickName(token)}님의 마이페이지💁🏻‍♀️</h3>
            <h2>회원정보</h2>
            <Box component="form" sx={{ mt: 3 }}>
                <div>
                    <label>이메일</label>
                    <input
                        defaultValue={user.email}
                        name="nickName"
                        placeholder="작성자"
                        type="text"
                        readOnly

                    />
                </div>
                <div>
                    <label>닉네임</label>
                    <input
                        defaultValue={nic}
                        name="nickName"
                        onChange={event => setNick(event.target.value)}
                        placeholder="작성자"
                        type="text"


                    />
                </div>
                <div>
                    <label>생년월일</label>
                    <input
                        defaultValue={birth}
                        name="birht"
                        onChange={event => setBirth(event.target.value)}
                        placeholder="작성자"
                        type="text"


                    />
                </div>
                <div>
                    <label>현재 비밀번호</label>
                    <input
                        name="nickName"
                        placeholder="작성자"
                        type="text"
                        readOnly

                    />
                </div>
                <div>
                    <label>변경 비밀번호</label>
                    <input
                        name="nickName"
                        placeholder="작성자"
                        type="text"
                        readOnly

                    />
                </div>
                <div>
                    <label>변경 비밀번호 확인</label>
                    <input
                        name="nickName"
                        placeholder="작성자"
                        type="text"
                        readOnly

                    />
                </div>

            </Box>
            <div>
                <button onClick={handleSubmitNic}>닉네임 수정하기</button>
            </div>
            <div>
                <button onClick={handleSubmitNic}>생년월일 수정하기</button>
            </div>
            <div>
                <button onClick={handleSubmitNic}>비밀번호 수정하기</button>
            </div>
        </Container>
    );

};
export default User;
