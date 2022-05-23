package com.gg.service;

import com.gg.domain.Room;
import com.gg.domain.Roomlog;
import com.gg.domain.User;
import com.gg.repository.RoomRepository;
import com.gg.repository.RoomlogRepository;
import com.gg.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RoomlogService {
    private final RoomlogRepository roomlogRepository;
    private final RoomRepository roomRepository;
    private final UserRepository userRepository;


    public Roomlog checkRoomlog(String nickName) {
        User user = userRepository.findByNickname(nickName);
        return roomlogRepository.findByUser(user);
    }
    public Roomlog enterRoom(String userNickname, String roomNumber){
        Roomlog roomlog = new Roomlog();
        roomlog.setRoom(roomRepository.findRoomByRoomNumber(roomNumber));
        roomlog.setUser(userRepository.findByNickname(userNickname));

        roomlogRepository.save(roomlog);

        return roomlog;
    }

    public void exitRoom(String userNickName) {
        User user = userRepository.findByNickname(userNickName);
        Room room = roomlogRepository.findByUser(user).getRoom();
        if(room.getUser().getNickname().equals(userNickName)){
            if(Math.toIntExact(roomlogRepository.count()) == 1) {
                room.setRoomValid(false);
                roomRepository.save(room);
            } else {
                room.setUser(roomlogRepository.findNextUser().getUser());
                roomRepository.save(room);
            }
        }
        roomlogRepository.deleteByUser(user);
    }
}
