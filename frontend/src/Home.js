import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import styled from "styled-components";
import TodoStudyList from "./Todo/TodoStudyList.js";
import axios from 'axios';
import { getNickName } from './jwtCheck';
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
    padding: 1rem 3rem 2rem 3rem;
`;
let StudyTime = styled(Grid)`

    height: 100%;

    div {
        font-size: 13pt;
        margin-top:30px;
    }
    h2 {
        font-size: 35pt;
        letter-spacing: 5px;
        margin: 3vh 0;
    }
    button {
        font-family: 'Pretendard-Medium';
        border-radius: 40px;
        font-size: 16pt;
        margin-bottom: 3vh;
        margin-left:-30px;
        width: 12vw;
        background-color: lightseagreen
    }
    .studytimetoday{
        margin-left:-30px;
    }
`;
let StudyDiary = styled(Grid)`
    span {
        font-size: 13pt;
        white-space:pre;
        margin-bottom:20px;
    }
    .recentContent{
        font-size: 16pt;
        font-weight :600;
    }
    div {
        background-color: mintcream;
        padding: 1rem;
        border-radius: 20px;
        border: solid 3px lightseagreen;
        // box-shadow: 1px 1px 10px gainsboro;
    }
    .home_diary {
        width: 100% !important;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
    }
    button {
        font-family: 'Pretendard-Medium';
        border-radius: 10px;
        font-size: 10pt;
        margin-bottom:20px;
        background-color: lightseagreen
    }
`;
let RankingText = styled(Grid)`
    height:300px;
    text-align: left;

    div {
        margin: 3vh 0;
    }

    span{
        font-weight:700;
        font-size:28px;
        margin-right:20px;
    }

    .rankingdata{
        font-size:20px;
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
    const [myTime, setMyTime] = useState(0);
    const [recentDate, setRecentDate] = useState();
    let navigate = useNavigate();

    const [clicked, setClicked] = useState(0);
    const clickhandler = (num) => {
        setClicked(num);
    };
    const ranking = {
        0: <table>
            <tbody>
                {dayTime.map((day, index) => (
                    <tr key={day.nickname}>

                        <td className="rankingnum">{(index)+1==1 ? '🥇':(index)+1==2 ? '🥈': (index)+1==3 ? '🥉' : (index)+1+'위'}</td>
                        <td className="blank"></td>
                        <td className="rankingnick">{day.nickname}</td>
                        <td className="blank2"></td>
                        <td>{test(day.time)}</td>
                    </tr>
                ))}
            </tbody>
        </table>,

        1: <table>
            <tbody>
                {weekTime.map((day, index) => (
                    <tr key={day.nickname}>

                        <td className="rankingnum">{(index)+1==1 ? '🥇':(index)+1==2 ? '🥈': (index)+1==3 ? '🥉' : (index)+1+'위'}</td>       
                        <td className="blank"></td>
                        <td className="rankingnick">{day.nickname}</td>
                        <td className="blank2"></td>
                        <td>{test(day.time)}</td>
                    </tr>
                ))}
            </tbody>
        </table>,
        2: <table>
            <tbody>
                {monthTime.map((day, index) => (
                    <tr key={day.nickname}>

                        <td className="rankingnum">{(index)+1==1 ? '🥇':(index)+1==2 ? '🥈': (index)+1==3 ? '🥉' : (index)+1+'위'}</td>
                        <td className="blank"></td>
                        <td className="rankingnick">{day.nickname}</td>
                        <td className="blank2"></td>
                        <td>{test(day.time)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    };


    const getRecentDiary = async () => {

        axios.get('/api/main/diary/recent', { params: { nickname: nickname } })
            .then(res => {
                console.log(res.data);
                setRecentDiary(res.data);
                setRecentDate(res.data.diaryCreated.substr(0, 10));
            })
            .catch(err => {
                console.log(err);
            });

    };
    function test(data) {
        var h = parseInt(data / 3600);
        var m = parseInt((data % 3600) / 60);
        var s = (data % 3600) % 60;
        var time = h + "시간 " + m + "분 " + s + "초";
        return time;
    };

    const getTotalTime = async () => {
        axios.get('/api/main/studytime/summary')
            .then(res => {
                console.log(res.data);
                setTotalTime(res.data);
                setDayTime(res.data[0]);
                setWeekTime(res.data[1]);
                setMonthTime(res.data[2]);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const MyTime = async () => {
        if (!nickname)
            setMyTime(0);
        else {
            axios.post('/api/mypage/studytime', {
                nickname: nickname
            })
                .then(res => {
                    console.log(res.data);
                    setMyTime(res.data);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    };

    useEffect(() => {
        getRecentDiary();
        getTotalTime();
        MyTime();
    }, [nickname]);

    return (
        <Wrapper>
            <TodayStyle container spacing={1}>
                <StudyTime item xs={5}>
                    <div style={{ textAlign: 'left' }}>오늘의 공부시간</div>
                    <div className="studytimetoday"><h2 style={{ textAlign: 'center' }}>{test(myTime[0]) == "NaN시간 NaN분 NaN초" ? "0시간 0분 0초" : test(myTime[0])}</h2></div>
                    <div><Button variant="contained" size="large" onClick={() => navigate("/challenge")}>공부 시작</Button></div>
                </StudyTime>
                <StudyDiary item xs={7} sx={{ textAlign: 'left' }}>
                    <div style={{ paddingBottom: '0', border: 'none', background: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ textAlign: 'center' }}>오늘의 공부일기</span>
                        <Button variant="contained" onClick={() => navigate("/diary")}>일기 쓰기</Button>
                    </div>
                    <div className="home_diary">
                        <span>{recentDate}</span>
                        <br></br>
                        <br></br>
                        {recentDiary.diaryContent == null ?
                            <h3 style={{ textAlign: 'center', fontWeight: 'lighter' }} >
                                일기를 한번도 작성하지 않으셨어요!</h3> :
                            <h3>{recentDiary.diaryContent}</h3>}
                        <br></br>
                        <br></br>
                        {recentDiary.diarySentiment == null ?
                            <h5></h5> :
                            recentDiary.diarySentiment === 'neutral' ?
                                <h5>감정분석결과 : 오늘은 쏘쏘~ 내일은 더욱 힘차게! 😙</h5> :
                                recentDiary.diarySentiment === 'negative' ?
                                    <h5>감정분석결과 : 오늘은 조금 힘드셨군요. 내일은 더욱 힘내봐요! 😥</h5>
                                    : <h5>감정분석결과 : 오늘은 뿌듯! 내일도 화이팅! 😊</h5>
                        }
                    </div>

                </StudyDiary>
            </TodayStyle>

            <Grid container spacing={1} sx={{ marginTop: '1vh' }}>
                <RankingText item xs={4} sx={{ margin: '2vh 0 10vh' }}>
                    <div><h1>누적 공부 시간 랭킹🏆</h1></div>
                    <span className={`rankingbtn ${clicked === 0 ? 'selected' : ''}`} state={clicked} onClick={() => clickhandler(0)}>오늘</span>
                    <span className={`rankingbtn ${clicked === 1 ? 'selected' : ''}`} state={clicked} onClick={() => clickhandler(1)}>한 주</span>
                    <span className={`rankingbtn ${clicked === 2 ? 'selected' : ''}`} state={clicked} onClick={() => clickhandler(2)}>이번달</span>
                    <div className="rankingdata">{ranking[clicked]}</div>

                </RankingText>
            </Grid>

            <TodoStudyList isHome={true} />
            <Link to="/todoStudy" style={{ textDecoration: 'underline', textAlign: 'right' }}>
                더 보러가기
            </Link>
        </Wrapper >
    );
}

export default Home;
