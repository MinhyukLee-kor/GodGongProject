# Am2zing_GodGong_Project

멀티캠퍼스에서 진행한 지능형 웹서비스 풀스택 과정 7회차 2조의 팀 프로젝트 입니다.

## 팀 소개

- <img src="https://img.shields.io/badge/backend-6DB33F?style=flat-square&logo=SpringBoot&logoColor=white"/></a> 한찬희 🏅
- <img src="https://img.shields.io/badge/backend-6DB33F?style=flat-square&logo=SpringBoot&logoColor=white"/></a> 이민혁
- <img src="https://img.shields.io/badge/backend-6DB33F?style=flat-square&logo=SpringBoot&logoColor=white"/></a> 유하영
- <img src="https://img.shields.io/badge/frontend-61DAFB?style=flat-square&logo=React&logoColor=white"/></a> 신주희
- <img src="https://img.shields.io/badge/frontend-61DAFB?style=flat-square&logo=React&logoColor=white"/></a> 구주애
- <img src="https://img.shields.io/badge/frontend-61DAFB?style=flat-square&logo=React&logoColor=white"/></a> 이유진

# SpringBoot_React_Web_Project

Spring Boot의 MVC패턴과 React를 기반으로 만든 스터디 공유 플랫폼입니다. 난무하는 화상 스터디로 피곤해진 사람들이 혼자서 편하게 하지만 정확하게 공부시간을 측정하고 
타인과 Todo를 공유하며 실시간 채팅을 통해 정보를 공유하고 동기를 부여받을 수 있는 플랫폼을 생각하며 개발했습니다. 

# 사용기술

### Back-end
<img src="https://img.shields.io/badge/Java-007396?style=flat-square&logo=Java&logoColor=white"/></a>
<img src="https://img.shields.io/badge/SpringBoot-6DB33F?style=flat-square&logo=SpringBoot&logoColor=white"/></a>
<img src="https://img.shields.io/badge/SpringSecurity-6DB33F?style=flat-square&logo=SpringBoot&logoColor=white"/></a>
<img src="https://img.shields.io/badge/JWT-6DB33F?style=flat-square&logo=JSONWebTokens&logoColor=white"/></a>


### Front-end
<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/></a>
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white"/></a>
<img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=CSS3&logoColor=white"/></a>
<img src="https://img.shields.io/badge/Bootstrap-7952B3?style=flat-square&logo=Bootstrap&logoColor=white"/></a>
<img src="https://img.shields.io/badge/Styled-components-DB7093?style=flat-square&logo=tyledcomponents&logoColor=white"/></a>

### DB
<img src="https://img.shields.io/badge/Redis-DC382D?style=flat-square&logo=Redis&logoColor=white"/></a>
<img src="https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=MySQL&logoColor=white"/></a>
<img src="https://img.shields.io/badge/Hibernate-59666C?style=flat-square&logo=Hibernate&logoColor=white"/></a>


### API
<img src="https://img.shields.io/badge/Naver_Sentiment_API-03C75A?style=flat-square&logo=Naver&logoColor=white"/></a>
<img src="https://img.shields.io/badge/Teachable_machine-4285F4?style=flat-square&logo=Google&logoColor=white"/></a>

# 사용 툴

<img src="https://img.shields.io/badge/IntelliJ_IDEA-000000?style=flat-square&logo=IntelliJIDEA&logoColor=white"/></a>
<img src="https://img.shields.io/badge/Visual_Studio_Code-007ACC?style=flat-square&logo=VisualStudioCode&logoColor=white"/></a>
<img src="https://img.shields.io/badge/Slack-4A154B?style=flat-square&logo=Slack&logoColor=white"/></a>
<img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=Slack&logoColor=white"/></a>



# 기능설명

- ## 회원가입 및 로그인

  - 회원가입 진행시 이메일, 패스워드, 닉네임, 생년월일 을 입력합니다.
  - 패스워드는 패스워드 확인을 이용해 체크하며 `BCryptPasswordEncoder`를 이용해 암호화 하여 DB에 저장하였습니다.
  - 로그인시 JWT 토큰을 발행합니다. 
  - 비밀번호 찾기를 진행할 때 가입한 이메일로 비밀번호 변경 링크를 전송하고 redis를 통해 전송된 링크의 유효성을 검증합니다. 
  
- ## 회원

  - 회원은 `Member`라는 Role을 소유하고 있습니다.
  - 회원은 마이페이지에서 본인의 공부시간을 일별, 주별, 월별, 총 공부시간 단위로 확인할 수 있습니다.
  - 회원은 마이페이지에서 본인이 참여중인 TODO 공부방과 작성한 TODO 리스트를 확인할 수 있습니다.
  - 회원은 마이페이지에서 본인이 작성한 공부일기를 확인 할 수 있으며 작성된 공부일기는 `Naver Sentiment API`를 통해 감정 분석되고 하단에 표시됩니다. 
  - 회원은 개인정보관리 페이지에서 패스워드 및 회원정보를 수정 할 수 있습니다. 이때 패스워드 변경 시 기존 패스워드를 한번 더 체크합니다.


<details>
  <summary>🔽 로그인</summary>

![login](https://user-images.githubusercontent.com/79136087/170861912-bcbcfcd7-c153-4cc7-a176-a6abeb0b6d5d.gif)

</details>

<details>
  <summary>🔽 비밀번호 찾기</summary>

<img width="961" alt="image" src="https://user-images.githubusercontent.com/79136087/170861642-e0cdc700-893c-4797-9d7b-1a0cf8929859.png">
<img width="556" alt="image" src="https://user-images.githubusercontent.com/79136087/170861682-7c3a718f-9866-4b02-a1aa-fbd817a9a931.png">
<img width="776" alt="image" src="https://user-images.githubusercontent.com/79136087/170861706-2c6629a3-92c3-4d5c-94ce-2b4f82b142bf.png">


</details>

<details>
  <summary>🔽 마이페이지</summary>

![mypage](https://user-images.githubusercontent.com/79136087/170861917-e6857bb1-cce7-4a03-83db-706df1177a0f.gif)
  
</details>

- ## 메인페이지

- 메인페이지에서는 오늘 공부한 시간, 작성된 최신 공부일기, 회원 공부시간 랭킹, TODO 공부방 리스트를 확인 할 수 있습니다.

<details>
    <summary>🔽 메인페이지</summary>


<img width="949" alt="image" src="https://user-images.githubusercontent.com/79136087/170862049-554f47ad-fdca-40fc-964d-397cdbd4f117.png">
  
</details>


- ## 챌린지

- `Teachabel Machine`을 학습시켜 사용자가 현재 자리에서 공부중인지를 확인해 자리비움 상태일 때는 타이머 작동을 중지 시킵니다. 
- 공부가 완료되면 공부한 시간이 DB에 저장됩니다.
<details>
    <summary>🔽 챌린지</summary>

![챌린지](https://user-images.githubusercontent.com/79136087/170862151-207186ab-14c8-45cf-bf27-05d77e2d3253.gif)

</details>


- ## TODO 공부방

  - 회원은 공부방을 생성할 수 있습니다. 
  - 공부방을 생성후 TODO 리스틀를 작성해 공부방에 참여합니다. 작성된 TODO 리스트는 `Web Socket` 을 이용해 실시간으로 공유됩니다.
  - 회원인 TODO 공부방에 입장할 때, TODO 리스트를 완료했을 때, 퇴장할 때 채팅방에 메세지가 전송됩니다.
  - `Web Socket`과 `Stomp` 을 사용해 공부방에 입장한 회원들 간의 실시간 채팅이 가능합니다.  

<details>
  <summary>🔽 TODO 공부방 생성</summary>

![공부방 생성](https://user-images.githubusercontent.com/79136087/170862733-8cea1f48-3f78-43be-ae64-5fe1e7b28316.gif)

</details>
<details>
  <summary>🔽 TODO 리스트 생성및 입장</summary>

![공부방 입장 및 TODO 리스트 생성](https://user-images.githubusercontent.com/79136087/170862737-bd63b3e2-c456-4fb4-a23a-5db6d670df54.gif)

</details>

<details>
  <summary>🔽 TODO 리스트 공유 및 참여 알림 메세지</summary>

![TODO 리스트 공유 및 알림 메세지](https://user-images.githubusercontent.com/79136087/170862741-5c58d0bb-375d-4ad8-8f47-db51b6072a6d.gif)

</details>

<details>
  <summary>🔽 실시간 채팅</summary>

![실시간 채팅](https://user-images.githubusercontent.com/79136087/170862738-ba652191-d0b3-4e3d-8cfc-6846ec938c8e.gif)

</details>


- ## 공부일 작성

  - 공부가 끝나면 공부 일기를 작성할 수 있습니다.
  - 공부일기를 작성하면 `Naver Sentiment API`를 통해 작성된 문장의 감정분석을 실시합니다.
  - 작성된 일기의 감정분석 결과를 출력합니다.
  - 일기를 수정하면 갑정분석을 다시 실시합니다.

<details>
    <summary>🔽 공부일기</summary>

![공부일기작성](https://user-images.githubusercontent.com/79136087/170863010-2976781c-aa8a-4b92-9038-51947a829ebc.gif)

</details>
