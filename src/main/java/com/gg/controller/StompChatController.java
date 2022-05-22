package com.gg.controller;

import com.gg.domain.Todo;
import com.gg.dto.ChatMessageDTO;
import com.gg.service.RoomlogService;
import com.gg.service.StudylogService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class StompChatController {
    private final SimpMessageSendingOperations simpMessageSendingOperations;

    private final RoomlogService roomlogService;

    @MessageMapping("/chat/enter")
    public void enter(ChatMessageDTO message){
        roomlogService.enterRoom(message.getUserNickname(), message.getRoomNumber());
        message.setMessage(message.getUserNickname() + "님이 방에 입장했습니다.");
        simpMessageSendingOperations.convertAndSend("/sub/room/" + message.getRoomNumber(), message);
    }

    @MessageMapping("/chat/exit")
    public void exit(ChatMessageDTO message){
        roomlogService.exitRoom(message.getUserNickname());
        message.setMessage(message.getUserNickname() + "님이 방에서 퇴장했습니다.");
        simpMessageSendingOperations.convertAndSend("/sub/room/" + message.getRoomNumber(), message);
    }

    @MessageMapping("/chat/message")
    public void message(ChatMessageDTO message){
        simpMessageSendingOperations.convertAndSend("/sub/room/" + message.getRoomNumber(), message);
    }
}
