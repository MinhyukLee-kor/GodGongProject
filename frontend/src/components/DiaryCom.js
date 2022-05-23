
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import React from "react";
import {

    Box,
    Container,


} from '@mui/material/';

function DiaryCom({ diaryId, diaryContent, diarySentiment, diaryCreated, handleSubmit }) {

    let navigate = useNavigate();
    function move_more() {
        navigate(`/mypage/diaryDetail/${diaryId}`);
    }




    return <div>

        <Container className="DiaryEditor">

            <Box component="form" sx={{ mt: 3 }}>
                <div>


                    <Box className="d_list">
                        <div className="flex">
                            <h5>{diaryCreated}</h5>
                            <button className="delBtn" type="submit" onClick={() => handleSubmit(diaryId)}>❌</button></div>
                        <div className="content">

                            <span>{diaryContent}</span>
                            {/*   <span>{diaryContent.length > 50 ? diaryContent.substr(0, 50) + "..." : diaryContent}</span> */}


                        </div>
                        <div className="flex">
                            <div className="sentiment">
                                {diarySentiment === 'neutral' ?
                                    <h5 >감정분석결과  : 오늘은 쏘쏘~ 내일은 더욱 힘차게! 😙</h5> :
                                    diarySentiment === 'negative' ?
                                        <h5 >감정분석결과 : 오늘은 조금 힘드셨군요. 내일은 더욱 힘내봐요! 😥</h5>
                                        : <h5 >감정분석결과 : 오늘은 뿌듯! 내일도 화이팅! 😊</h5>
                                }
                            </div>

                            <div className="more" >    <button type="submit" onClick={() => move_more()} >더 보기</button>  </div>
                        </div>
                    </Box>

                    <hr></hr>




                </div>
            </Box >
        </Container >
    </div >;
}

DiaryCom.propTypes = {
    diaryId: PropTypes.number.isRequired,
    diaryContent: PropTypes.string.isRequired,
    diarySentiment: PropTypes.string.isRequired,
    diaryCreated: PropTypes.string.isRequired,


};
// <Link to={`/Movie/${diaryId}`}>
export default DiaryCom;;