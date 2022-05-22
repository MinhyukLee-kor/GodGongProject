import axios from "axios";
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function FindPw() {

    const navigate = useNavigate();
    let { key } = useParams();

    useEffect(() => {
        axios.get('/user/password/' + key)
            .then(res => {
                if (res.success == true) {
                    alert('비밀번호 변경이 완료되었습니다. 다시 로그인해주세요.');
                    localStorage.clear();
                    // props.setUserNickName('');
                    navigate('/');
                }
                else if (res.message == '유효하지 않은 Key값입니다.')
                    alert('잘못된 접근입니다.');
                return navigate('/login');
            })
            .catch(err => {
                console.log(err);
            })
    }, []);
    
    return (
        <div>
        </div>
    );
}

export default FindPw;

