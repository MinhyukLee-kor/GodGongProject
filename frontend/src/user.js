
import { useState, useEffect, useCallback } from "react";
import { isAuth, getId } from './jwtCheck';
import axios from 'axios';


import { useNavigate } from "react-router-dom";
import {

    Box,
    Container,


} from '@mui/material/';
import './User.css';

import Swal from 'sweetalert2';

const User = (props) => {

    const token = JSON.parse(localStorage.getItem('accessToken'));
    const userId = getId(token);
    const navigate = useNavigate();



    const [user, setUser] = useState([]);
    const [nic, setNick] = useState();
    const [birth, setBirth] = useState();
    const [state, setsState] = useState();
    const [oldPas, setOldPas] = useState();
    const [newPas, setNewPas] = useState();
    const [passwordConfirm, setPasswordConfirm] = useState('');

    //오류메시지 상태저장
    const [nameMessage, setNameMessage] = useState('');
    const [birthMessage, setBirthMessage] = useState('');
    const [passwordOldMessage, setPasswordOldMessage] = useState('');
    const [passwordNewMessage, setPasswordNewMessage] = useState('');
    const [passwordConfirmMessage, setPasswordConfirmMessage] = useState('');

    // 유효성 검사
    const [isName, setIsName] = useState(true);
    const [isBirth, setIsBirth] = useState(true);
    const [isOldPassword, setIsOldPassword] = useState(false);
    const [isNewPassword, setIsNewPassword] = useState(false);
    const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);


    const getUser = async () => {
        const json = await axios.get('/api/users/' + userId, { params: { id: userId } });
        setUser(json.data);
        setNick(json.data.nickname);
        setBirth(json.data.birth);
        setsState(false);
    };
    useEffect(() => {
        getUser();
        if (!isAuth(token)) {
            Swal.fire({
                confirmButtonColor: '#2fbe9f',

                confirmButtonText: '확인',
                text: '로그인 후 이용하실 수 있어요😥', // Alert 제목 

            });
            navigate('/login');
        }
    }, [state == true]);
    let nicBody = {
        id: userId,
        nickname: nic

    };

    const handleSubmitNic = (e) => {
        e.preventDefault();

        const nameRegex = /^[가-힣|a-zA-Z|0-9]+$/;

        if (!nameRegex.test(nic) || nic.length < 1) {
            setNameMessage('올바른 닉네임을 입력해주세요!');
            setIsName(false);
        } else {
            setIsName(true);
            axios

                .post('/api/user/' + userId + '/nickname', nicBody)

                .then(function (response) {
                    if (response.data == false) {
                        Swal.fire({
                            confirmButtonColor: '#2fbe9f',

                            confirmButtonText: '확인',
                            text: '중복된 닉네임입니다!😢', // Alert 제목 

                        });

                    } else {
                        Swal.fire({
                            confirmButtonColor: '#2fbe9f',

                            confirmButtonText: '확인',
                            html: '닉네임이 수정되었습니다.<br>다시 로그인해주세요!😊', // Alert 제목 

                        }).then((re) => {
                            if (re.isConfirmed) {
                                localStorage.clear();
                                props.setUserNickName('');
                                navigate('/');
                            }
                        });

                    }



                })
                .catch(function (err) {
                    console.log(err);
                });

        }



    };
    let birthBody = {
        id: userId,
        birth: birth

    };
    const handleSubmitBirth = (e) => {
        e.preventDefault();

        const birthRegex = /^[0-9]{6}$/;
        if (!birthRegex.test(birth)) {
            setBirthMessage('생년월일을 6자리로 입력해주세요!');
            setIsBirth(false);
        } else {
            setIsBirth(true);
            axios
                .post('/api/user/' + userId + '/birth', birthBody)
                .then(function (response) {
                    Swal.fire({
                        confirmButtonColor: '#2fbe9f',

                        confirmButtonText: '확인',
                        html: '생년월일이 수정되었습니다.<br>다시 로그인해주세요!😊', // Alert 제목 

                    }).then((re) => {
                        if (re.isConfirmed) {
                            localStorage.clear();
                            props.setUserNickName('');
                            navigate('/');
                        }
                    });




                })
                .catch(function (err) {
                    console.log(err);

                });

        }




    };
    let pasBody = {
        id: userId,
        oldPassword: oldPas,
        newPassword: newPas

    };
    const handleSubmitPas = useCallback((e) => {
        e.preventDefault();

        const passwordRegex = /^.{4,20}$/;
        if (!passwordRegex.test(oldPas)) {
            setPasswordOldMessage('4~20글자를 입력해주세요!');
            setIsOldPassword(false);

        } else if (!passwordRegex.test(newPas)) {
            setPasswordNewMessage('4~20글자를 입력해주세요!');
            setIsOldPassword(true);
            setIsNewPassword(false);
        } else if (passwordConfirm != newPas) {
            setIsPasswordConfirm(false);
            setPasswordConfirmMessage('비밀번호가 다릅니다!');
            setIsOldPassword(true);
            setIsNewPassword(true);
        } else {
            setIsOldPassword(true);
            setIsNewPassword(true);
            setIsPasswordConfirm(true);
            axios
                .post('/api/user/' + userId + '/password', pasBody)
                .then(function (response) {
                    if (response.data == false) {
                        Swal.fire({
                            confirmButtonColor: '#2fbe9f',

                            confirmButtonText: '확인',
                            text: '비밀번호가 틀렸습니다!😢', // Alert 제목 

                        });

                    } else {
                        Swal.fire({
                            confirmButtonColor: '#2fbe9f',

                            confirmButtonText: '확인',
                            html: '비밀번호가 수정되었습니다.<br>다시 로그인해주세요!😊', // Alert 제목 

                        }).then((re) => {
                            if (re.isConfirmed) {
                                localStorage.clear();
                                props.setUserNickName('');
                                navigate('/');
                            }
                        });

                    }


                })
                .catch(function (err) {
                    console.log(err);
                });

        }



    }, [oldPas, newPas, passwordConfirm]
    );

    let delBody = {
        id: userId,


    };
    const handleSubmitDel = (e) => {
        e.preventDefault();

        Swal.fire({
            showCancelButton: true,
            confirmButtonColor: '#2fbe9f',
            cancelButtonColor: '#fd565f',
            confirmButtonText: '확인',
            cancelButtonText: '취소',
            text: '정말 탈퇴하시겠습니까?', // Alert 내용 
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .post('/api/user/delete', delBody)
                    .then(function (response) {
                        console.log(response.status, '성공');
                        Swal.fire({

                            confirmButtonColor: '#2fbe9f',

                            confirmButtonText: '확인',

                            text: '탈퇴되었습니다!', // Alert 내용 
                        }).then((re) => {
                            if (re.isConfirmed) {
                                localStorage.clear();
                                props.setUserNickName('');

                                navigate('/');
                            }
                        });
                    })
                    .catch(function (err) {
                        console.log(delBody);
                        console.log(err);

                    });
            }

        });
    };
    // 닉네임
    const onChangeName = useCallback((e) => {
        const nameRegex = /^[가-힣|a-zA-Z|0-9]+$/;
        const nameCurrent = e.target.value;
        setNick(nameCurrent);

        if (!nameRegex.test(nameCurrent) || nameCurrent.length < 1) {
            setNameMessage('올바른 닉네임을 입력해주세요!');
            setIsName(false);
        } else {

            setIsName(true);
        }
    }, []);
    // 생년월일
    const onChangeBirth = useCallback((e) => {
        const birthRegex = /^[0-9]{6}$/;
        const birthCurrent = e.target.value;
        setBirth(birthCurrent);

        if (!birthRegex.test(birthCurrent)) {
            setBirthMessage('생년월일을 6자리로 입력해주세요!');
            setIsBirth(false);
        } else {

            setIsBirth(true);
        }
    }, []);
    // 현재 비밀번호
    const onChangeOldPassword = useCallback((e) => {
        const passwordRegex = /^.{4,20}$/;
        const passwordOldCurrent = e.target.value;
        setOldPas(passwordOldCurrent);

        if (!passwordRegex.test(passwordOldCurrent)) {
            setPasswordOldMessage('4~20글자를 입력해주세요!');
            setIsOldPassword(false);
        } else {

            setIsOldPassword(true);
        }
    }, []);
    // 변경 비밀번호
    const onChangeNewPassword = useCallback((e) => {
        const passwordRegex = /^.{4,20}$/;
        const passwordNewCurrent = e.target.value;
        setNewPas(passwordNewCurrent);

        if (!passwordRegex.test(passwordNewCurrent)) {
            setPasswordNewMessage('4~20글자를 입력해주세요!');
            setIsNewPassword(false);
        } else {

            setIsNewPassword(true);
        }
    }, []);
    //비번 확인
    const onChangePasswordConfirm = useCallback(
        (e) => {
            const passwordConfirmCurrent = e.target.value;
            setPasswordConfirm(passwordConfirmCurrent);

            if (newPas === passwordConfirmCurrent) {

                setIsPasswordConfirm(true);
            } else {
                setPasswordConfirmMessage('비밀번호가 다릅니다!');
                setIsPasswordConfirm(false);
            }
        },
        [newPas]
    );
    return (<div>

        <Container className="UserEditor">

            <h2>회원정보🔎</h2>
            <br></br>
            <Box component="form" sx={{ mt: 3 }}>
                <div className="userFlex">
                    <label>이메일</label>
                    <input
                        defaultValue={user.email}
                        name="nickName"
                        placeholder="작성자"
                        type="text"
                        readOnly

                    />

                </div>
                <h3>닉네임 수정</h3>
                <br></br>
                <div className="userFlex">
                    <label>닉네임</label>
                    <input
                        defaultValue={nic}
                        name="nickName"
                        onChange={onChangeName}
                        placeholder="닉네임"
                        type="text"


                    />
                    {<span className={`message ${isName ? 'success' : 'error'}`}>{nameMessage}</span>}
                    <div className='modify'>
                        <button onClick={handleSubmitNic}>수정하기</button>
                    </div>

                </div>
                <h3>생년월일 수정</h3>
                <br></br>
                <div className="userFlex">
                    <label>생년월일</label>
                    <input
                        defaultValue={birth}
                        name="birht"
                        onChange={onChangeBirth}
                        placeholder="생년월일"
                        type="text"


                    />
                    <div className="modify" >
                        <button onClick={handleSubmitBirth}>수정하기</button>
                    </div>
                    {<span className={`message ${isBirth ? 'success' : 'error'}`}>{birthMessage}</span>}

                </div>
                <h3>비밀번호 수정</h3>
                <br></br>
                <div className="userFlex">
                    <label>현재 비밀번호</label>
                    <input
                        defaultValue={oldPas}
                        name="old"
                        onChange={onChangeOldPassword}
                        placeholder="현재 비밀번호"


                        type="password"



                    />
                    {(
                        <span className={`message ${isOldPassword ? 'success' : 'error'}`}>{passwordOldMessage}</span>
                    )}
                </div>

                <div className="userFlex">
                    <label>변경 비밀번호</label>
                    <input
                        defaultValue={newPas}
                        name="new"
                        onChange={onChangeNewPassword}
                        placeholder="변경 비밀번호"


                        type="password"



                    />
                    {(
                        <span className={`message ${isNewPassword ? 'success' : 'error'}`}>{passwordNewMessage}</span>
                    )}
                </div>

                <div className="userFlex">
                    <label>변경 비밀번호 확인</label>
                    <input
                        defaultValue={passwordConfirm}
                        onChange={onChangePasswordConfirm}
                        name="confirm"
                        placeholder="비밀번호 확인"
                        type="password"


                    />
                    {(
                        <span className={`message ${isPasswordConfirm ? 'success' : 'error'}`}>{passwordConfirmMessage}</span>
                    )}
                    <div className='modify'>
                        <button onClick={handleSubmitPas}>수정하기</button>
                    </div>
                </div>

            </Box>



            <div className="userDelBtn">
                <button onClick={handleSubmitDel}>탈퇴하기</button>
            </div>
        </Container>
    </div>
    );

};
export default User;
