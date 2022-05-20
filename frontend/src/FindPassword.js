
import React, { useState } from 'react';
import axios from 'axios';

import {
    Button,
    TextField,
    FormControl,
    FormControlLabel,
    Checkbox,
    FormHelperText,
    Grid,
    Box,
    Typography,
    Container,
} from '@mui/material/';

import './join.css';
import { useNavigate } from 'react-router-dom';



const Register = () => {

    const [emailError, setEmailError] = useState('');

    const navigate = useNavigate();




    const onhandlePost = async (data) => {
        const { email } = data;
        const postData = { email };

        await axios
            .post('/api/user/password', postData)
            .then(function (res) {
                if (res.data.success == true) {
                    alert('메일함에서 비밀번호 변경 메일을 확인해주세요!');
                    navigate('/login');
                } else if (res.data.success == false) {
                    alert('등록되지 않은 이메일입니다😰');
                } else {
                    alert(res.data.message);
                }
            })
            .catch(function (err) {
                console.log(err);
                console.log(postData);
                console.log(origin);
                console.log(err.response.data.message);
                if (err.response.status === 400) {
                    alert(err.response.data.message);
                }
            });
    };
    // useState 추가

    // form 전송
    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);
        const joinData = {
            email: data.get('email'),


        };
        const { email } = joinData;

        // 이메일 유효성 체크
        // 이메일 유효성 체크
        const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        if (!emailRegex.test(email)) setEmailError('올바른 이메일 형식이 아닙니다!');
        else setEmailError('');
        if (
            emailRegex.test(email)


        ) {
            onhandlePost(joinData);
        }

    };



    return (

        <Container component="main" maxWidth="xs">

            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderRadius: '10px',
                    padding: '32px',
                    backgroundColor: '#fff',
                    boxShadow: ' 0 8px 20px 0 rgba(0, 0, 0, 0.15)'
                }}
            >

                <Typography component="h1" variant="h5">
                    비밀번호를 잊어버리셨나요?
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <FormControl component="fieldset" variant="standard">
                        <Grid container spacing={2}>

                            <Grid item xs={12} >
                                <TextField
                                    required
                                    autoFocus
                                    fullWidth
                                    type="email"
                                    id="email"
                                    name="email"
                                    label="이메일 주소"
                                    error={emailError !== '' || false}
                                />
                            </Grid>
                            <FormHelperText>{emailError}</FormHelperText>


                        </Grid>

                        <Button
                            id='joinBtn'
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 1 }}
                            size="large"
                        >
                            비밀번호 찾기
                        </Button>

                    </FormControl>

                </Box>
            </Box>
        </Container>

    );
};
export default Register;