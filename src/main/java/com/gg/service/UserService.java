package com.gg.service;

import com.gg.config.jwt.JwtTokenProvider;
import com.gg.domain.User;
import com.gg.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtTokenProvider tokenProvider;

    @Autowired
    DiaryRepository diaryRepository;

    @Autowired
    StudylogRepository studylogRepository;

    @Autowired
    RoomRepository roomRepository;

    @Autowired
    RoomlogRepository roomlogRepository;

    @Autowired
    TodoRepository todoRepository;

    @Autowired
    RefreshTokenRepository refreshTokenRepository;

    public User findBynickname(String nickname){
       return userRepository.findByNickname(nickname);
    }

    // 회원 정보 삭제
    public void deleteUser(Long id){
        //일기
        diaryRepository.deleteAllByUserId(id);
        //공부시간
        studylogRepository.deleteAllByUserId(id);
        //스터디룸
        roomRepository.deleteAllByUserId(id);
        //투두리스트
        todoRepository.deleteAllByUserId(id);
        //룸로그
        roomlogRepository.deleteAllByUserId(id);
        //토큰
        refreshTokenRepository.deleteAllByUserId(id);
        userRepository.deleteById(id);
    }


    // 회원 닉네임 변경
    public boolean updateNickname(Long id, String nickname){
        boolean check = true;
        if(userRepository.existsByNickname(nickname)){
            check = false;
            return check;
        }else {
            User user = userRepository.findById(id).get();
            user.setNickname(nickname);
            userRepository.save(user);
            return check;
        }
        //토큰..refresh
    }

    // 회원 비밀번호 변경
    public boolean updatePassword(Long id, String oldPassword, String newPassword){
        boolean check = true;
        User user = userRepository.findById(id).get();
        if(passwordEncoder.matches(oldPassword, user.getPassword())){
            user.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user);
        } else {
            check = false;
        }
        return check;

    }

    // 회원 생년월일 변경
    public void updateBirth(Long id, String birth){
        User user = userRepository.findById(id).get();
        user.setBirth(birth);
        userRepository.save(user);
    }
    public String findNickname(Long id){
        return userRepository.findById(id).get().getNickname();
    }
}
