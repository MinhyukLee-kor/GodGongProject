package com.gg.repository;

import com.gg.domain.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    Room findRoomByRoomNumber(String roomNumber);
    List<Room> findAllByRoomValidTrue();

    void deleteAllByUserId(Long Id);
}
