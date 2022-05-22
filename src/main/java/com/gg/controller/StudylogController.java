package com.gg.controller;

import com.gg.dto.StudyRankDTO;
import com.gg.service.StudylogService;
import com.gg.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
public class StudylogController {

    @Autowired
    StudylogService studylogService;

    @Autowired
    UserService userService;

    //닉네임이랑 공부한시간(초) 받고 저장하기
    @PostMapping("/api/studylog/time")
    public Boolean insertStudyTime(@RequestBody HashMap<String, String> params){
        boolean check = true;
        String nickname = params.get("nickname");
        int time = Integer.parseInt(params.get("studytime"));
        int studytime = studylogService.insertStudyTime(nickname, time);
        if(studytime==0){
            check = false;
        }
        return check;
    }

    @PostMapping("/api/mypage/studytime")
    public List<Integer> studyTime(@RequestBody HashMap<String, String> param){
        List<Integer> studytime = new ArrayList<>();
        String nickname = param.get("nickname");
        int day = studylogService.oneDayTime(nickname);
        int week = studylogService.oneWeekTime(nickname);
        int month = studylogService.oneMonthTime(nickname);
        int total = studylogService.totalTime(nickname);

        studytime.add(0,day);
        studytime.add(1,week);
        studytime.add(2,month);
        studytime.add(3,total);

        return studytime;
    }

    @PostMapping("/api/mypage/studytime/calendar")
    public List<String> calendarTime(@RequestBody HashMap<String,String>param){
        String nickname = param.get("nickname");
        String date = param.get("date");
        return studylogService.calendarTime(nickname, date);
    }

    @GetMapping("/api/main/studytime/summary")
    public List<List<StudyRankDTO>> Ranking() {
        List<List<StudyRankDTO>> result = studylogService.Ranking();
        return result;
    }

    @GetMapping("/api/studytime/recent")
    public Integer recentStudyTime(String nickname){
        return studylogService.recentStudytime(nickname);
    }
}
