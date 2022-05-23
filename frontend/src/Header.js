import React from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

let HeaderStyle = styled.div`
    margin: auto;
    padding: 3rem 18vw 3rem;
    font-size: 15pt;

    h1 {
        font-family: 'SB';
        font-size: 40pt;
        margin-top: 1rem;
        color: darkcyan;
    }

    span {
        margin: 1rem;
    }


`

function Header(props) {

    let nickName = props.userNickName;

    return (
        <HeaderStyle>
            {
                nickName
                    ? (<div className="help" style={{textAlign: 'right'}}>
                        <Link to="/">
                            <span
                                onClick={() => {
                                    localStorage.clear();
                                    props.setUserNickName('');
                                }}
                            >
                                로그아웃
                            </span>
                        </Link>
                        <Link to="/mypage">
                            {nickName}
                            <AccountCircleIcon className="help2" sx={{fontSize: 40, mb:-1.5}} />
                        </Link>
                    </div>)
                    : (<div style={{ textAlign: 'right' }} >
                        <Link to="/login">
                            로그인
                        </Link>
                        <span>|</span>
                        <Link to="/Join">
                            회원가입
                        </Link>
                    </div>)
            }

            <Link to="/">
                <div style={{ color: 'grey', marginTop: '3rem' }}>같이·공부하는 같·공</div>
                <h1>GOD·GONG</h1>
            </Link>
        </HeaderStyle>
    );
}

export default Header;

