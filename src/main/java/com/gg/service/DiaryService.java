package com.gg.service;

import com.gg.domain.Diary;
import com.gg.domain.User;
import com.gg.repository.DiaryRepository;
import com.gg.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DiaryService {
    @Autowired
    DiaryRepository diaryRepository;

    @Autowired
    UserRepository userRepository;

    public List<Diary> findByUserNickname(String nickname){
        List<Diary> diary = diaryRepository.findByUserNickname(nickname);
        return diary;
    }

    public void postDiary(String content, String nickname, String sentiment){
        Diary diary = new Diary();
        User user =userRepository.findByNickname(nickname);
        diary.setDiaryContent(content);
        diary.setUser(user);
        diary.setDiarySentiment(sentiment);
        diaryRepository.save(diary);
    }

    public void editDiary(String content, Long diaryId, String sentiment){
        Diary diary = diaryRepository.findByDiaryId(diaryId);
        diary.setDiaryContent(content);
        diary.setDiarySentiment(sentiment);
        diaryRepository.save(diary);
    }

    public void deleteDiary(Long diaryId){
        Diary diary = diaryRepository.findByDiaryId(diaryId);
        diaryRepository.delete(diary);
    }

    public Diary findByDiaryId(Long diaryId){
        return diaryRepository.findByDiaryId(diaryId);
    }

    public Diary recentDiary(String nickname){
        return diaryRepository.findTop1ByUserNicknameOrderByDiaryCreatedDesc(nickname);
    }

    ///네이버 api 시작
    public String sentiment(String content){
        String clientId = "z2528dw8cg"; // 애플리케이션 클라이언트 아이디
        String clientSecret = "MhcqCVAfCOh4z7pTTnjSfK6LuAkVv1BT82kFta3Z"; // 애플리케이션 클라이언트 시크릿

        String apiUrl = "https://naveropenapi.apigw.ntruss.com/sentiment-analysis/v1/analyze";

        Map<String, String> requestHeaders = new HashMap<>();
        requestHeaders.put("X-NCP-APIGW-API-KEY-ID", clientId);
        requestHeaders.put("X-NCP-APIGW-API-KEY", clientSecret);
        requestHeaders.put("Content-Type", "application/json");

        String requestBody = "{\"content\":\""+content+"\"}";

        String responseBody = post(apiUrl, requestHeaders, requestBody);
        String neu = "neu";
        String result;
        if(responseBody.substring(26,29).equals(neu)) {
            result = responseBody.substring(26,33);
        } else {
            result = responseBody.substring(26,34);
        }
        return result;
    }

    private static String post(String apiUrl, Map<String, String> requestHeaders, String requestBody) {
        HttpURLConnection con = connect(apiUrl);

        try {
            con.setRequestMethod("POST");
            for(Map.Entry<String, String> header :requestHeaders.entrySet()) {
                con.setRequestProperty(header.getKey(), header.getValue());
            }

            con.setDoOutput(true);
            try (DataOutputStream wr = new DataOutputStream(con.getOutputStream())) {
                wr.write(requestBody.getBytes());
                wr.flush();
            }

            int responseCode = con.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) { // 정상 응답
                return readBody(con.getInputStream());
            } else {  // 에러 응답
                return readBody(con.getErrorStream());
            }
        } catch (IOException e) {
            throw new RuntimeException("API 요청과 응답 실패", e);
        } finally {
            con.disconnect(); // Connection을 재활용할 필요가 없는 프로세스일 경우
        }
    }

    private static HttpURLConnection connect(String apiUrl) {
        try {
            URL url = new URL(apiUrl);
            return (HttpURLConnection) url.openConnection();
        } catch (MalformedURLException e) {
            throw new RuntimeException("API URL이 잘못되었습니다. : " + apiUrl, e);
        } catch (IOException e) {
            throw new RuntimeException("연결이 실패했습니다. : " + apiUrl, e);
        }
    }

    private static String readBody(InputStream body) {
        InputStreamReader streamReader = new InputStreamReader(body, StandardCharsets.UTF_8);

        try (BufferedReader lineReader = new BufferedReader(streamReader)) {
            StringBuilder responseBody = new StringBuilder();

            String line;
            while ((line = lineReader.readLine()) != null) {
                responseBody.append(line);
            }

            return responseBody.toString();
        } catch (IOException e) {
            throw new RuntimeException("API 응답을 읽는데 실패했습니다.", e);
        }
    }
    ///네이버 api 끝
}
