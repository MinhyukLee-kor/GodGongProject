package com.gg.repository;

import com.gg.domain.Roomlog;
import com.gg.domain.Todo;
import com.gg.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface RoomlogRepository extends JpaRepository<Roomlog, Long> {

    Roomlog findByUser(User user);

    @Query(value = "select * from roomlog order by roomlog_created limit 1,1", nativeQuery = true)
    Roomlog findNextUser();

    @Transactional
    void deleteByUser(User user);

    void deleteAllByUserId(Long Id);
}
