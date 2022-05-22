import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes } from "react-router-dom";
import Header from './Header.js';
import Home from './Home.js';
import Challenge from './Challenge.js';
import TimeCalendar from './TimeCalendar';
import Login from './Login.js';
import Join from './Join.js';
import FindPassword from './FindPassword';
import EditPassword from './EditPassword';
import MyPage from './MyPage.js';
import Diary from './Diary.js';
import DiaryDetail from './DiaryDetail';
import DiaryList from './DiaryList.js';
import User from './user.js';
import TodoStudyList from './Todo/TodoStudyList.js';
import TodoStudyRoom from './Todo/TodoStudyRoom.js';
import Footer from './Footer.js';
import { isAuth, getNickName } from './jwtCheck.js';

function App() {

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

    return (
        <div className="App">
            <Header userNickName={userNickName} setUserNickName={setUserNickName} />

            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/login" element={<Login isLogin={isLogin} setIsLogin={setIsLogin} />} />
                <Route path="/Join" element={<Join />} />
                <Route path="/findPassword" element={<FindPassword />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/mypage/diary" element={<DiaryList />} />
                <Route path="/mypage/diaryDetail/:id" element={<DiaryDetail />} />
                <Route path="/challenge" element={<Challenge />} />
                <Route path="/timecalendar" element={<TimeCalendar />} />
                <Route path="/diary" element={<Diary />} />
                <Route path='/mypage/user' element={<User setUserNickName={setUserNickName} />} />
                <Route path="/todoStudy" element={<TodoStudyList />} />
                <Route path="/todoStudy/:roomNum" element={<TodoStudyRoom />} />
                <Route path="/user/passwordChange/:key" element={<EditPassword />} />
            </Routes>

            <Footer />
        </div>
    );
}

export default App;