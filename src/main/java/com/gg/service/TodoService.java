package com.gg.service;

import com.gg.domain.Room;
import com.gg.domain.Todo;
import com.gg.domain.User;
import com.gg.repository.RoomRepository;
import com.gg.repository.TodoRepository;
import com.gg.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TodoService {

    private final TodoRepository todoRepository;

    private final UserRepository userRepository;

    private final RoomRepository roomRepository;

    public List<Todo> findByUserId(String nickname){
        User user = userRepository.findByNickname(nickname);
        return todoRepository.findByUserId(user.getId());
    }

    public Todo insertTodo(String nickname, String content, String roomNumber){
        User user = userRepository.findByNickname(nickname);
        Room room = roomRepository.findRoomByRoomNumber(roomNumber);
        Todo todo = new Todo();
        todo.setUser(user);
        todo.setRoom(room);
        todo.setTodoContent(content);
        todo.setTodoCheck(false);
        todoRepository.save(todo);

        return todo;
    }

    public void checkTodo(Todo todo){
        todo.setTodoCheck(!(todo.getTodoCheck()));
        todoRepository.save(todo);
    }

    public List<Todo> findUserTodos(String userNickname, String roomNumber){
        User user = userRepository.findByNickname(userNickname);
        Room room = roomRepository.findRoomByRoomNumber(roomNumber);
        return todoRepository.findAllByUserAndRoom(user, room);
    }

    public List<Todo> findTodos(String roomNumber){
        Room room = roomRepository.findRoomByRoomNumber(roomNumber);
        return todoRepository.findTodos(room.getRoomId());
    }

    public void deleteTodo(String userNickname, String roomNumber) {
        User user = userRepository.findByNickname(userNickname);
        Room room = roomRepository.findRoomByRoomNumber(roomNumber);

        todoRepository.deleteAllByUserAndRoom(user, room);
    }

}
