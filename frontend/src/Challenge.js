import React, { useState, useEffect } from 'react';
import DisplayComponent from './DisplayComponent.js';
import BtnComponent from './BtnComponent.js';
import './Challenge.css';
import { isAuth, getNickName } from './jwtCheck';
import ChallengeModal from './ChallengeModal.js';
import * as tmPose from '@teachablemachine/pose';
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Swal from 'sweetalert2';
function Challenge(props) {


  let [timedata, setTimedata] = useState(0);


  const token = JSON.parse(localStorage.getItem('accessToken'));
  let nickname = getNickName(token);
  const navigate = useNavigate();

  const [time, setTime] = useState({ s: 0, m: 0, h: 0 });
  const [interv, setInterv] = useState();
  const [status, setStatus] = useState(0);
  //not started = 0
  //started = 1
  //stopped = 2
  const start = () => {
    init();
    run();
    setStatus(1);
    setInterv(setInterval(run, 1000));
  };



  var updatedS = time.s, updatedM = time.m, updatedH = time.h;

  const run = () => {
    if (check == "공부중") {
      if (updatedM === 60) {
        updatedH++;
        updatedM = 0;
      }
      if (updatedS === 60) {
        updatedM++;
        updatedS = 0;
      }
      updatedS++;
    } else if (check == "자리비움") {
      setStatus(1);
    }
    return setTime({ s: updatedS, m: updatedM, h: updatedH });
  };

  const stop = () => {
    clearInterval(interv);
    setStatus(2);


  };

  const reset = async () => {
    setTime({ s: 0, m: 0, h: 0 });
    clearInterval(interv);
    setStatus(0);
    var time = updatedS + updatedM * 60 + updatedH * 3600;
    let body = {
      nickname: nickname,
      studytime: time
    };

    await axios.post('/api/studylog/time', body)
      .then(function () {
        console.log(body);
      })
      .catch(function (error) {
        console.log(error);
      });

    await axios.get('/api/studytime/recent', { params: { nickname: nickname } })
      .then(res => {
        console.log(res.data);
        setTimedata(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const resume = () => start();

  //MODAL
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (!isAuth(token)) {
      Swal.fire({
        confirmButtonColor: '#2fbe9f',

        confirmButtonText: '확인',
        text: '로그인 후 이용하실 수 있어요😥', // Alert 제목 

      });
      navigate('/login');
    }

    return () => camStop();
  }, []);

  const URL = "https://teachablemachine.withgoogle.com/models/pUdkMsW7A/";
  let model, webcam, ctx, labelContainer, maxPredictions = null;
  async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // Note: the pose library adds a tmPose object to your window (window.tmPose)
    model = await tmPose.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Convenience function to setup a webcam
    const size = 200;
    const flip = true; // whether to flip the webcam
    webcam = new tmPose.Webcam(size, size, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    window.requestAnimationFrame(loop); //

    // append/get elements to the DOM
    const canvas = document.getElementById("canvas");
    canvas.width = size;
    canvas.height = size;
    ctx = canvas.getContext("2d");


  }


  async function loop(timestamp) {
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
  }

  var check = "자리비움";
  async function predict() {
    // Prediction #1: run input through posenet
    // estimatePose can take in an image, video or canvas html element
    const {
      pose,
      posenetOutput
    } = await model.estimatePose(webcam.canvas);
    // Prediction 2: run input through teachable machine classification model
    const prediction = await model.predict(posenetOutput);
    if (prediction[0].probability.toFixed(2) >= 0.50) {
      check = "공부중";
    } else if (prediction[1].probability.toFixed(2) >= 0.90) {
      check = "자리비움";
    }

    /*
      //콘솔로 확인하는 코드
      console.log(prediction[0].probability);
      if (prediction[0].probability > 0.001) {
        console.log('공부중');
      } else {
        console.log('자리비움');
        // {props.stop};
      }
    */


    // finally draw the poses
    drawPose(pose);
  }

  function drawPose(pose) {
    if (webcam.canvas) {
      ctx.drawImage(webcam.canvas, 0, 0);

      // 포인트 뼈대 표시
      // if (pose) {
      //     const minPartConfidence = 0.5;
      //     tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
      //     tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
      // }
    }
  }

  function camStop() {
    if (webcam == null)
      return;
    webcam.stop();
  }

  return (
    <div className="main-secion">
      <div className="clock-holder">
        <div className="canvas-holder"><canvas id="canvas"></canvas></div>
        <div className="clock-title1">{getNickName(token)}님의 오늘의 챌린지</div>
        <div className="stopwatch">
          {openModal && <ChallengeModal timedata={timedata} closeModal={setOpenModal} />}
          <DisplayComponent className="DisplayComponent" time={time} />
          <BtnComponent setOpenModal={setOpenModal} status={status} resume={resume} reset={reset} stop={stop} start={start} />

          <div id="label-container"></div>
        </div>
      </div>
    </div>
  );
}


export default Challenge;