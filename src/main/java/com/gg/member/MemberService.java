package com.gg.member;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.gg.domain.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;



import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class MemberService {

	@Autowired
	private MemberRepository memberRepository;
	
	@Autowired
	private MemberCustomRepository memberCustomRepository;

	public Member memberInfo(String memEmail) {
		Member member = memberCustomRepository.findByMemEmail(memEmail);
		return member;
	}
	
	

	// 이메일 중복 검사
	public HashMap<String, Object> memEmailCheck(String memEmail) {
		HashMap<String, Object> map = new HashMap<>();
		map.put("result", memberRepository.existsByMemEmail(memEmail));
		return map;
	}

	// 닉네임 중복 검사
	public HashMap<String, Object> memNicknameCheck(String memNickname) {
		HashMap<String, Object> map = new HashMap<>();
		map.put("result", memberRepository.existsByMemNickname(memNickname));
		return map;
	}
	
	//닉네임 수정 중복 검사
    public HashMap<String, Object> memNicknameEdit(String memNickname, Long memId) {
        List<String> findMemNickname = memberCustomRepository.findExistMemNickname(memId);

        HashMap<String, Object> map = new HashMap<>();
        map.put("result", findMemNickname.contains(memNickname));
        System.out.println("result");
        return map;
    }
	
	
    
    //마이페이지 정보 
    public Member mypage(String memEmail) {
        Member member = memberCustomRepository.findByMemEmail(memEmail);
        return member;
    }
    
    //내정보 수정
    public void updateMember(Member member) {
        memberCustomRepository.updateMember(member);
    }
    
    //패스워드 변경 전 기존 패스워드 검사
    public HashMap<String, Object> pwCheck(Authentication authentication, String original_Pw) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String db_Pw = memberInfo(authentication.getName()).getMemPassword();
        HashMap<String, Object> map = new HashMap<>();
        map.put("result", passwordEncoder.matches(original_Pw, db_Pw));
        return map;
    }
    
    //패스워드 변경
    public void passwordUpdate(Member member) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        member.setMemPassword(passwordEncoder.encode(member.getMemPassword()));
        memberCustomRepository.updateMemPassword(member);
    }
    
    // 회원 탈퇴
    public void deleteMember(Long memId) {    
        memberRepository.deleteById(memId);
    }

    
 
		
	}

