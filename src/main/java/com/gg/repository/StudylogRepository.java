package com.gg.repository;

import com.gg.domain.Studylog;
import com.gg.dto.StudylogInterface;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface StudylogRepository extends JpaRepository<Studylog, Long> {

    @Query(value= "select sum(studylog_time) from studylog where user_id=?1 and date(studylog_created) = date(now()) group by user_id", nativeQuery = true)
    Integer oneDayTime(Long userId);

    @Query(value= "select sum(studylog_time) from studylog where user_id=?1 and date(studylog_created) >= DATE_SUB(now(), interval 7 day) group by user_id", nativeQuery = true)
    Integer oneWeekTime(Long userId);

    @Query(value= "select sum(studylog_time) from studylog where user_id=?1 and date(studylog_created) >= date_format(now(), '%Y-%m-01') group by user_id", nativeQuery = true)
    Integer oneMonthTime(Long userId);

    @Query(value= "select date(studylog_created) as day, sum(studylog_time) from studylog where user_id=?1 and date(studylog_created) = date(?2) group by date(studylog_created) order by day asc;", nativeQuery = true)
    List<String> calendarTime(Long userId, String date);

    @Query(value="select sum(studylog_time) from studylog where user_id=?1 group by user_id", nativeQuery = true)
    Integer totalStudyTime(long id);

    @Query(value="select user_id as id, sum(studylog_time) as time from studylog where date(studylog_created) >= date_format(now(), '%Y-%m-01')" +
            "group by user_id order by sum(studylog_time) DESC limit 10", nativeQuery = true)
    List<StudylogInterface> Monthtop10studyTime();

    @Query(value="select user_id as id, sum(studylog_time) as time from studylog where date(studylog_created) >= DATE_SUB(now(), interval 7 day)" +
            "group by user_id order by sum(studylog_time) DESC limit 10", nativeQuery = true)
    List<StudylogInterface> Weektop10studyTime();

    @Query(value="select user_id as id, sum(studylog_time) as time from studylog where date(studylog_created) = date(now())" +
            "group by user_id order by sum(studylog_time) DESC limit 10", nativeQuery = true)
    List<StudylogInterface> Daytop10studyTime();

    @Query(value="select studylog_time from studylog where user_id=?1 order by studylog_created DESC limit 1", nativeQuery = true)
    Integer recentStudyTime(Long id);

    void deleteAllByUserId(Long Id);
}
