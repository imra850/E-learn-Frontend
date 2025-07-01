package com.elearn.app.service;

import com.elearn.app.dtos.UserDto;

public interface UserService {

    public UserDto create(UserDto userDto);

    public UserDto getById(String userId);
}
