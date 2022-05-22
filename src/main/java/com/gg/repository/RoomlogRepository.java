package com.gg.repository;

import com.gg.domain.Roomlog;
import com.gg.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface RoomlogRepository extends JpaRepository<Roomlog, Long> {

    Roomlog findByUser(User user);

    @Transactional
    void deleteByUser(User user);
}
