import {useEffect, useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './App.css';
import './TimeCalendar.css';
import {getNickName} from "./jwtCheck";
import axios from "axios";

function TimeCalendar() {
    const token = JSON.parse(localStorage.getItem('accessToken'));
    let nickname = getNickName(token);
  const [date, setDate] = useState(new Date());

  const [time, setTime] = useState([]);
  const [caltime, setCaltime] = useState('');

    function test(data){
        var h = parseInt(data/3600);
        var m = parseInt((data%3600)/60);
        var s = (data%3600)%60;
        var time = h+"시간 "+m+"분 "+s+"초";
        return time;
    };

    let daybody={
        nickname : nickname,
        date : date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()
    }
    const CalTime = async () => {
        axios.post('/api/mypage/studytime/calendar', daybody)
            .then(res=> {
                if (res.data != null) {
                setCaltime(res.data);
                console.log(res.data);
                setCaltime(res.data[0].substr(11, 6));
            }
            })
            .catch(err =>{
                console.log(err);
            })
    };

    let body = {
        nickname : nickname
    };
    const MyTime = async () => {
        axios.post('/api/mypage/studytime', body)
            .then(res=>{
                setTime(res.data);
            })
            .catch(err =>{
                console.log(err);
            })
    };

    useEffect(()=>{
        MyTime();
    },[]);
    useEffect(()=>{
        CalTime();
    },[date]);


  return (
    <div className='page'>
      <div className='timeCalendar'>
        <h2 className='text-center'>나의 공부시간⏰</h2>
        <div className='calendar-container'>
          <Calendar onChange={setDate} value={date}/>
        </div>
      </div>

      <div className='totaltime'>
        <div className='totaltime2'>
            <h1>{date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()} 공부시간</h1>
            {test(caltime)}
          <h1>오늘의 공부시간</h1>
            {test(time[0])=="NaN시간 NaN분 NaN초" ? "0시간 0분 0초":test(time[0])}

          <h1>이번주 공부시간</h1>
            {test(time[1])=="NaN시간 NaN분 NaN초" ? "0시간 0분 0초":test(time[1])}

          <h1>이번달 공부시간</h1>
            {test(time[2])=="NaN시간 NaN분 NaN초" ? "0시간 0분 0초":test(time[2])}

          <h1>나의 총 공부시간</h1>
            {test(time[3])=="NaN시간 NaN분 NaN초" ? "0시간 0분 0초":test(time[3])}
        </div>
      </div>

    </div>
  );
}

export default TimeCalendar;