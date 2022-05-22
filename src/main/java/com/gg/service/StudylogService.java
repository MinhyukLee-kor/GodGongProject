package com.gg.service;

import com.gg.domain.Studylog;
import com.gg.domain.User;
import com.gg.dto.StudyRankDTO;
import com.gg.dto.StudylogInterface;
import com.gg.repository.StudylogRepository;
import com.gg.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class StudylogService {

    @Autowired
    StudylogRepository studylogRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserService userService;
    //닉네임이랑 공부한시간(초) 받고 저장하기
    public Integer insertStudyTime(String nickname, int time){
        User user = userRepository.findByNickname(nickname);
        Studylog studylog = new Studylog();
        studylog.setStudylogTime(time);
        studylog.setUser(user);
        studylogRepository.save(studylog);
        return studylog.getStudylogTime();
    }

    //총 공부시간
    public Integer totalTime(String nickname){
        User user = userRepository.findByNickname(nickname);
        int time = studylogRepository.totalStudyTime(user.getId());
        return time;
    }

    //마이페이지용
    public Integer oneDayTime(String nickname){
        User user = userRepository.findByNickname(nickname);
        int time = studylogRepository.oneDayTime(user.getId());
        return time;
    }

    public Integer oneWeekTime(String nickname){
        User user = userRepository.findByNickname(nickname);
        int time = studylogRepository.oneWeekTime(user.getId());
        return time;
    }

    public Integer oneMonthTime(String nickname){
        User user = userRepository.findByNickname(nickname);
        int time = studylogRepository.oneMonthTime(user.getId());
        return time;
    }

    public List<String> calendarTime(String nickname, String date){
        User user = userRepository.findByNickname(nickname);
        return studylogRepository.calendarTime(user.getId(), date);
    }

    //메인페이지 랭킹용
    public List<StudylogInterface> Monthtop10Studytime(){
        return studylogRepository.Monthtop10studyTime();
    }

    public List<StudylogInterface> Weektop10Studytime(){
        return studylogRepository.Weektop10studyTime();
    }
    public List<StudylogInterface> Daytop10Studytime(){
        return studylogRepository.Daytop10studyTime();
    }

    public Integer recentStudytime(String nickname){
        User user = userRepository.findByNickname(nickname);
        return studylogRepository.recentStudyTime(user.getId());
    }

    public List<List<StudyRankDTO>> Ranking(){
        List<List<StudyRankDTO>> result = new ArrayList<>();
        int length = this.Daytop10Studytime().size();
        List<StudyRankDTO> dayranks = new ArrayList<>();
        List<StudyRankDTO> weekranks = new ArrayList<>();
        List<StudyRankDTO> monthranks = new ArrayList<>();
        for (int i = 0; i < length; i++) {
            //하루
            StudyRankDTO daysr = new StudyRankDTO();
            Long id = this.Daytop10Studytime().get(i).getId();
            int day = this.Daytop10Studytime().get(i).getTime();
            String nickname = userService.findNickname(id);
            daysr.setNickname(nickname);
            daysr.setTime(day);
            dayranks.add(i, daysr);
        }
        result.add(0, dayranks);

        length = this.Weektop10Studytime().size();
        for (int i = 0; i < length; i++) {
            //한 주
            StudyRankDTO weeksr = new StudyRankDTO();
            Long id = this.Weektop10Studytime().get(i).getId();
            int week = this.Weektop10Studytime().get(i).getTime();
            String nickname = userService.findNickname(id);
            weeksr.setNickname(nickname);
            weeksr.setTime(week);
            weekranks.add(i, weeksr);
        }
        result.add(1, weekranks);

        length = this.Monthtop10Studytime().size();
        for (int i = 0; i < length; i++) {
            //한 달
            StudyRankDTO monthsr = new StudyRankDTO();
            Long id = this.Monthtop10Studytime().get(i).getId();
            int month = this.Monthtop10Studytime().get(i).getTime();
            String nickname = userService.findNickname(id);
            monthsr.setNickname(nickname);
            monthsr.setTime(month);
            monthranks.add(i, monthsr);
        }
        result.add(2, monthranks);
        return result;
    }
}
