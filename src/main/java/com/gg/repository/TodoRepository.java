package com.gg.repository;

import com.gg.domain.Room;
import com.gg.domain.Todo;
import com.gg.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface TodoRepository extends JpaRepository<Todo, Long> {
    List<Todo> findByUserId(Long userId);
    List<Todo> findAllByUserAndRoom(User user, Room room);

    @Transactional
    void deleteAllByUserAndRoom(User user, Room room);
    @Query(value = "select * from todo where user_id in (select user_id from roomlog where room_room_id = ?1) and room_room_id = ?1", nativeQuery = true)
    List<Todo> findTodos(long roomId);

    void deleteAllByUserId(Long Id);
}
