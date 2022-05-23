
insert into roles(name) values('ROLE_USER');
insert into roles(name) values('ROLE_ADMIN');

insert into users(birth, email, nickname, password) values("950117","aaaa@aaaa.com", "같공", "$2a$10$.mkPounQ.21xk7YLmY7me.A8QmLtx1lfdv.l1b3OfUNfI27.QU0YW");
insert into users(birth, email, nickname, password) values("950117","hanchan200@naver.com", "찬찬", "$2a$10$.mkPounQ.21xk7YLmY7me.A8QmLtx1lfdv.l1b3OfUNfI27.QU0YW");
insert into users(birth, email, nickname, password) values("950117","alsgurdl1993@naver.com", "민민", "$2a$10$.mkPounQ.21xk7YLmY7me.A8QmLtx1lfdv.l1b3OfUNfI27.QU0YW");
insert into users(birth, email, nickname, password) values("970512","bbbb@bbbb.com", "핳", "$2a$10$SF8DLsuB42mCZ6IwagbuZeTWWSejLc7MQf1E9xG5Xqmb6ScmQG1oG");
insert into users(birth, email, nickname, password) values("970512","cccc@cccc.com", "진진", "$2a$10$SF8DLsuB42mCZ6IwagbuZeTWWSejLc7MQf1E9xG5Xqmb6ScmQG1oG");
insert into users(birth, email, nickname, password) values("970512","dddd@dddd.com", "신주", "$2a$10$SF8DLsuB42mCZ6IwagbuZeTWWSejLc7MQf1E9xG5Xqmb6ScmQG1oG");
insert into users(birth, email, nickname, password) values("970512","eeee@eeee.com", "구주", "$2a$10$SF8DLsuB42mCZ6IwagbuZeTWWSejLc7MQf1E9xG5Xqmb6ScmQG1oG");


insert into studylog(studylog_created, studylog_time, user_id) values ("2022-05-20 13:23:13", 3600, 1);
insert into studylog(studylog_created, studylog_time, user_id) values ("2022-05-20 13:23:13", 4000, 2);
insert into studylog(studylog_created, studylog_time, user_id) values ("2022-05-20 13:23:13", 5000, 3);
insert into studylog(studylog_created, studylog_time, user_id) values ("2022-05-20 13:23:13", 200000, 4);
insert into studylog(studylog_created, studylog_time, user_id) values ("2022-05-20 13:23:13", 548000, 5);

insert into studylog(studylog_created, studylog_time, user_id) values ("2022-05-02 13:23:13", 360, 1);
insert into studylog(studylog_created, studylog_time, user_id) values ("2022-05-02 13:23:13", 4400, 2);
insert into studylog(studylog_created, studylog_time, user_id) values ("2022-05-02 13:23:13", 54400, 3);
insert into studylog(studylog_created, studylog_time, user_id) values ("2022-05-02 13:23:13", 200, 4);
insert into studylog(studylog_created, studylog_time, user_id) values ("2022-05-02 13:23:13", 10400, 5);

insert into studylog(studylog_created, studylog_time, user_id) values ("2022-05-23 13:23:13", 5000, 1);
insert into studylog(studylog_created, studylog_time, user_id) values ("2022-05-23 13:23:13", 4000, 2);
insert into studylog(studylog_created, studylog_time, user_id) values ("2022-05-23 13:23:13", 43030, 3);
insert into studylog(studylog_created, studylog_time, user_id) values ("2022-05-23 13:23:13", 2000, 4);
insert into studylog(studylog_created, studylog_time, user_id) values ("2022-05-23 13:23:13", 10030, 5);

insert into diary(diary_content, diary_sentiment, diary_created ,user_id) values("오늘 처음 갓공을 시작했는데 집중이 잘됐다.", "positive", "2022-05-18 13:23:13", 1);
insert into diary(diary_content, diary_sentiment, diary_created ,user_id) values("작심삼일 중 이틀째! 목표했던걸 모두 끝냈다!", "positive", "2022-05-19 13:23:13", 1);
insert into diary(diary_content, diary_sentiment, diary_created ,user_id) values("오늘은 공부가 잘됐다.", "positive", "2022-05-20 13:23:13", 1);
insert into diary(diary_content, diary_sentiment, diary_created ,user_id) values("오늘은 목표의 80%만 이뤘다. 좀 아쉽다. 다음엔 더 잘해야지!", "neutral", "2022-05-21 13:23:13", 1);
insert into diary(diary_content, diary_sentiment, diary_created ,user_id) values("오늘은 투두리스트를 모두 완료했다! 너무 행복하다!", "positive", "2022-05-22 13:23:13", 1);
insert into diary(diary_content, diary_sentiment, diary_created ,user_id) values("오늘은 집중이 잘 안되서 힘들었다. 목표했던 만큼 공부를 했어야 하는데 내일은 더 집중할 수 있겠찌?", "negative","2022-05-23 13:23:13", 1);

