package com.elearn.app.Controller;

import com.elearn.app.dtos.ResponseDto;
import com.elearn.app.dtos.UserDto;
import com.elearn.app.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public UserDto create(@RequestBody UserDto userDto){
        return userService.create(userDto);
    }

    @GetMapping("/{userId}")
    public UserDto getById(@PathVariable  String userId){
        return userService.getById(userId);
    }


}
