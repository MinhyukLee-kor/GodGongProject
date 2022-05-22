import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import styled from "styled-components";
import TodoStudyList from "./Todo/TodoStudyList.js";
import axios from 'axios';
import { getNickName } from './jwtCheck';
import DiaryCom from "./components/DiaryCom";
import './Home.css';

let Wrapper = styled.div`
    margin: auto;
    width: 65%;
    height: 100%;
`;

let TodayStyle = styled(Grid)`
    background-color: white;
    box-shadow: 15px 15px 10px rgb(226, 233, 230);
    border-radius: 20px;
    padding: 1rem 3rem;
`;
let StudyTime = styled(Grid)`

    height: 100%;

    div {
        font-size: 13pt;
    }
    h2 {
        font-size: 45pt;
        letter-spacing: 5px;
        margin: 4vh 0;
    }
    button {
        font-family: 'Pretendard-Medium';
        border-radius: 40px;
        font-size: 16pt;
        margin-bottom: 3vh;
        width: 12vw;
        background-color: lightseagreen
    }
`;
let StudyDiary = styled(Grid)`
    span {
        font-size: 13pt;
        margin-left: 0;
    
        white-space:pre;
      
    }
    div {
        background-color: mintcream;
        padding: 1rem;
        margin-top: 1rem;
        border-radius: 20px;
        border: solid 1px lightseagreen;
        // box-shadow: 1px 1px 10px gainsboro;
    }
`;
let RankingText = styled(Grid)`
    text-align: left;
    div {
        margin: 3vh 0;
    }
`;


function Home() {
    const token = JSON.parse(localStorage.getItem('accessToken'));
    const nickname = getNickName(token);

    const [recentDiary, setRecentDiary] = useState([]);
    const [totalTime, setTotalTime] = useState([]);
    const [dayTime, setDayTime] = useState([]);
    const [weekTime, setWeekTime] = useState([]);
    const [monthTime, setMonthTime] = useState([]);
    const [myTime, setMyTime] = useState([]);
    const [recentDate, setRecentDate] = useState();
    let navigate = useNavigate();

    const[clicked, setClicked] = useState(0);
    const clickhandler = (num) => {
        setClicked(num);
    };
    const ranking = {
        0:<table>
                <tbody>
                {dayTime.map((day) =>(
                    <tr key={day.nickname}>
                        <td>{day.nickname}</td>
                        <td>{test(day.time)}</td>
                    </tr>
                ))}
                </tbody>
            </table>,

        1:<table>
            <tbody>
            {weekTime.map((day) =>(
                <tr key={day.nickname}>
                    <td>{day.nickname}</td>
                    <td>{test(day.time)}</td>
                </tr>
            ))}
            </tbody>
        </table>,
        2:<table>
            <tbody>
            {monthTime.map((day) =>(
                <tr key={day.nickname}>
                    <td>{day.nickname}</td>
                    <td>{test(day.time)}</td>
                </tr>
            ))}
            </tbody>
        </table>}


    const getRecentDiary = async () => {

        axios.get('/api/main/diary/recent', {params: {nickname: nickname}})
            .then(res=>{
                console.log(res.data);
                setRecentDiary(res.data);
                setRecentDate(res.data.diaryCreated.substr(0, 10));
            })
            .catch(err =>{
                console.log(err);
        })

    };
    function test(data){
        var h = parseInt(data/3600);
        var m = parseInt((data%3600)/60);
        var s = (data%3600)%60;
        var time = h+"시간 "+m+"분 "+s+"초";
        return time;
    };

    const getTotalTime = async () => {
        axios.get('/api/main/studytime/summary')
            .then(res=> {
                console.log(res.data);
                setTotalTime(res.data);
                setDayTime(res.data[0]);
                setWeekTime(res.data[1]);
                setMonthTime(res.data[2]);
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
                console.log(res.data);
                setMyTime(res.data);
            })
            .catch(err =>{
                console.log(err);
            })

    };
    useEffect(() => {
        getRecentDiary();
        getTotalTime();
        MyTime();
    }, []);
    return (
        <Wrapper>
            <TodayStyle container spacing={1}>
                <StudyTime item xs={5}>
                    <div style={{ textAlign: 'left' }}>오늘의 공부시간</div>
                    <div className="studytimetoday"><h2>{test(myTime[0])=="NaN시간 NaN분 NaN초" ? "0시간 0분 0초":test(myTime[0])}</h2></div>
                    <div><Button variant="contained" size="large" onClick={() => navigate("/challenge")}>공부 시작</Button></div>
                </StudyTime>
                <StudyDiary item xs={7} sx={{ textAlign: 'left' }}>

                    <span>오늘의 공부일기</span>
                    <div>
                        <span>{recentDate}</span>
                        <br></br>
                        <br></br>
                        {recentDiary.diaryContent == null ?
                            <h3>일기를 한번도 작성하지 않으셨어요!</h3> :
                            <h3>{recentDiary.diaryContent}</h3>}
                        <br></br>
                        <br></br>
                        {recentDiary.diarySentiment == null ?
                            <h5></h5> :
                            recentDiary.diarySentiment === 'neutral' ?
                                <h5>감정분석결과 : 기분이 보통입니다. 😐</h5> :
                                recentDiary.diarySentiment === 'negative' ?
                                    <h5>감정분석결과 : 기분이 나쁩니다. 👿</h5>
                                    : <h5>감정분석결과 : 기분이 좋습니다. 🥰</h5>
                        }
                    </div>
                </StudyDiary>
            </TodayStyle>

            <Grid container spacing={1} sx={{ marginTop: '3vh' }}>
                <RankingText item xs={4} sx={{ margin: '5vh 0 10vh' }}>
                    <div><h1>누적 공부 시간 랭킹</h1></div>
                    <div>현재시간 기준</div>
                    <span className={`rankingbtn ${clicked === 0 ? 'selected' : ''}`} state={clicked} onClick={()=>clickhandler(0)}>오 늘</span>
                    <span className={`rankingbtn ${clicked === 1 ? 'selected' : ''}`} state={clicked} onClick={()=>clickhandler(1)}>한 주</span>
                    <span className={`rankingbtn ${clicked === 2 ? 'selected' : ''}`} state={clicked} onClick={()=>clickhandler(2)}>한 달</span>
                    <div>{ranking[clicked]}</div>

                </RankingText>
                <Grid item xs={8} sx={{ textAlign: 'left' }}>
                    <div><b>1~10위</b> 누적 공부시간 랭킹에서 다른 사용자와 공부시간을 비교할 수 있습니다.</div>
                    <div>***랭킹 표***</div>
                </Grid>
            </Grid>

            <TodoStudyList isHome={true} />
            <Link to="/todoStudy" style={{ textDecoration: 'underline', textAlign: 'right' }}>
                더 보러가기
            </Link>
        </Wrapper>
    );
}

export default Home;