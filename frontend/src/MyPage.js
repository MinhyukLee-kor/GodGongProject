import { SetMealRounded } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import DiaryList from './DiaryList.js';
import TimeCalendar from './TimeCalendar.js';
import User from './user.js';
import { isAuth, getNickName } from './jwtCheck';
import './Mypage.css';
function MyPage(props) {
    let [userNickName, setUserNickName] = useState('');
    let [isLogin, setIsLogin] = useState(false);


    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('accessToken'));

        if (isAuth(token)) {
            setUserNickName(getNickName(token));
            setIsLogin(true);
        } else {
            setIsLogin(false);
        }
    }, [isLogin]);
    let navigate = useNavigate();
    const token = JSON.parse(localStorage.getItem('accessToken'));
    const [menu, setMenu] = useState(3);
    if (!isAuth(token)) {
        alert('로그인 후 이용하실 수 있어요😥');
        return navigate('/login');
    }
    let onClickFuncStudy = () => {
        setMenu(1);
    };
    let onClickFuncTodo = () => {
        setMenu(2);
    };
    let onClickFuncDiary = () => {
        setMenu(3);
    };
    let onClickFuncUser = () => {
        setMenu(4);
    };


    return (
        <div>
            <h3>{getNickName(token)}님의 마이페이지💁🏻‍♀️</h3>
            <div className="mypageFlex">
                <div className="menu">
                    {/* mypage/studylog */}
                    <a onClick={onClickFuncStudy}>
                        <h3>공부시간</h3>
                    </a>
                    {/* mypage/todo */}
                    <a onClick={onClickFuncTodo}>
                        <h3>투두리스트</h3>
                    </a>
                    <a onClick={onClickFuncDiary}>
                        <h3>공부일기 목록</h3>
                    </a>
                    <a onClick={onClickFuncUser}>
                        <h3>회원정보 수정</h3>
                    </a>
                </div>
                <div className="page">
                    {menu == 1 ? <TimeCalendar /> : menu == 2 ? <User /> : menu == 3 ? <DiaryList /> : <User />}
                </div>
            </div>
        </div>
    );
}

export default MyPage;
