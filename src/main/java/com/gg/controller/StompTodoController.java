package com.gg.controller;

import com.gg.domain.Todo;
import com.gg.dto.ResultDTO;
import com.gg.service.TodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class StompTodoController {
    private final SimpMessageSendingOperations simpMessageSendingOperations;

    private final TodoService todoService;

    @MessageMapping("/todo/add")
    public void addTodo(ResultDTO resultDTO){
        resultDTO.setResult("done");
        simpMessageSendingOperations.convertAndSend("/sub/room/" + resultDTO.getRoomNumber(), resultDTO);
    }

    @MessageMapping("/todo/check")
    public void checkTodo(Todo todo){
        todoService.checkTodo(todo);
        ResultDTO resultDTO = new ResultDTO();
        resultDTO.setUserNickname(todo.getUser().getNickname());
        resultDTO.setRoomNumber(todo.getRoom().getRoomNumber());
        resultDTO.setResult("done");
        simpMessageSendingOperations.convertAndSend("/sub/room/" + resultDTO.getRoomNumber(), resultDTO);
    }

    @MessageMapping("/todo/delete")
    public void deleteTodo(ResultDTO resultDTO){
        todoService.deleteTodo(resultDTO.getUserNickname(), resultDTO.getRoomNumber());
        resultDTO.setResult("done");
        simpMessageSendingOperations.convertAndSend("/sub/room/" + resultDTO.getRoomNumber(), resultDTO);
    }
}
