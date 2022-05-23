package com.gg.repository;

import com.gg.domain.Diary;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DiaryRepository extends JpaRepository<Diary, Long> {
    List<Diary> findByUserNicknameOrderByDiaryCreatedDesc(String nickname);

    Diary findByDiaryId(Long diaryId);

    Diary findTop1ByUserNicknameOrderByDiaryCreatedDesc(String nickname);

    void deleteAllByUserId(Long Id);
}
