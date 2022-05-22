package com.gg.controller;

import com.gg.config.CurrentUser;
import com.gg.domain.Room;
import com.gg.domain.Roomlog;
import com.gg.domain.User;
import com.gg.payload.UserSummary;
import com.gg.repository.UserRepository;
import com.gg.service.PrincipalDetails;
import com.gg.service.RoomService;
import com.gg.service.RoomlogService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/chat/")
@Log4j2
public class RoomController {
    private final RoomService roomService;

    private final RoomlogService roomlogService;


    @GetMapping(value = "/rooms")
    public List<Room> rooms(){
        log.info("# All Chat Rooms");

        return roomService.findAllRooms();
    }

    @GetMapping(value = "/room")
    public Room findRoom(@RequestParam  String roomNumber){
        log.info("# find a room" + roomNumber);

        return roomService.findRoomByRoomNumber(roomNumber);
    }

    @PostMapping(value = "/room")
    public Room create(@RequestParam String roomCategory, @RequestParam String roomTitle, @RequestParam String userNickname) {
        log.info("# Create Chat Room, category : " + roomCategory + "title" + roomTitle + "user" + userNickname );
        return roomService.createRoom(roomCategory, roomTitle, userNickname);
    }

    @GetMapping(value = "/room/check")
    public Roomlog checkRoomlog(@RequestParam String userNickname) {
        return roomlogService.checkRoomlog(userNickname);
    }

    @PostMapping(value = "/room/enter")
    public Roomlog enterRoom(@RequestParam String userNickname, @RequestParam String roomNumber) {
        return roomlogService.enterRoom(userNickname, roomNumber);
    }

    @DeleteMapping(value = "/room/exit")
    public void exitRoom(@RequestParam String userNickname) {
        roomlogService.exitRoom(userNickname);
    }

}
