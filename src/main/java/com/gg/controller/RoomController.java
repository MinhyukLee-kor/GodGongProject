package com.gg.controller;


import com.gg.domain.Room;
import com.gg.domain.Roomlog;
import com.gg.service.RoomService;
import com.gg.service.RoomlogService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/chat/")
public class RoomController {
    private final RoomService roomService;

    private final RoomlogService roomlogService;


    @GetMapping(value = "/rooms")
    public List<Room> rooms(){

        return roomService.findAllRooms();
    }

    @GetMapping(value = "/room")
    public Room findRoom(@RequestParam  String roomNumber){

        return roomService.findRoomByRoomNumber(roomNumber);
    }

    @PostMapping(value = "/room")
    public Room create(@RequestParam String roomCategory, @RequestParam String roomTitle, @RequestParam String userNickname) {
        return roomService.createRoom(roomCategory, roomTitle, userNickname);
    }

    @GetMapping(value = "/room/check")
    public Roomlog checkRoomlog(@RequestParam String userNickname) {
        return roomlogService.checkRoomlog(userNickname);
    }

}
