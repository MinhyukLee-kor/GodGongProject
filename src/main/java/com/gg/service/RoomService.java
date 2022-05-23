package com.gg.service;

import com.gg.domain.Room;
import com.gg.domain.User;
import com.gg.repository.RoomRepository;
import com.gg.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RoomService {
    private final RoomRepository roomRepository;

    private final UserRepository userRepository;

    public List<Room> findAllRooms(){
        List<Room> rooms = roomRepository.findAllByRoomValidTrue();
        Collections.reverse(rooms);

        return rooms;
    }

    public Room findRoomByRoomNumber(String roomNumber){
        return roomRepository.findRoomByRoomNumber(roomNumber);
    }

    public Room createRoom(String roomCategory, String roomTitle, String userNickname){
        User user = userRepository.findByNickname(userNickname);
        Room room = Room.create(roomCategory, roomTitle, user);
        roomRepository.save(room);

        return room;
    }
}
