import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import DiaryList from './DiaryList.js';
import TimeCalendar from './TimeCalendar.js';
import User from './user.js';
import { isAuth, getNickName } from './jwtCheck';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import ListAltIcon from '@mui/icons-material/ListAlt';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import PersonSearchRoundedIcon from '@mui/icons-material/PersonSearchRounded';
import MyTodo from "./MyTodo.js";
import Swal from 'sweetalert2';

function MyPage(props) {

    let navigate = useNavigate();
    let token = JSON.parse(localStorage.getItem('accessToken'));
    let [menu, setMenu] = useState(2);

    let handleChange = (event, newValue) => {
        setMenu(newValue);
    };

    if (!isAuth(token)) {

        Swal.fire({
            confirmButtonColor: '#2fbe9f',

            confirmButtonText: '확인',
            text: '로그인 후 이용하실 수 있어요😥', // Alert 제목 

        });
        navigate('/login');
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <h3>{getNickName(token)}님의 마이페이지💁🏻‍♀️</h3>
            <Tabs value={menu} onChange={handleChange} centered={true}>
                <Tab icon={<TimelapseIcon />} label="공부시간" />
                <Tab icon={<ListAltIcon />} label="투두리스트" />
                <Tab icon={<BorderColorRoundedIcon />} label="공부일기" />
                <Tab icon={<PersonSearchRoundedIcon />} label="회원정보" />
            </Tabs>
            {menu == 0
                ? <TimeCalendar />
                : menu == 1
                    ? <MyTodo />
                    : menu == 2
                        ? <DiaryList />
                        : <User setUserNickName={props.setUserNickName} />}
        </div>
    );
}

export default MyPage;
