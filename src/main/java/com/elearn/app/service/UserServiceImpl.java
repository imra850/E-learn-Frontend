package com.elearn.app.service;

import com.elearn.app.configuration.AppConstant;
import com.elearn.app.dtos.UserDto;
import com.elearn.app.entities.Role;
import com.elearn.app.entities.User;
import com.elearn.app.exception.ResourceNotFoundException;
import com.elearn.app.repositories.RoleRepo;
import com.elearn.app.repositories.UserRepo;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService{

    private UserRepo userRepo;

    private ModelMapper modelMapper;

   private PasswordEncoder passwordEncoder;

   private RoleRepo roleRepo;


    public UserServiceImpl(UserRepo userRepo, ModelMapper modelMapper, PasswordEncoder passwordEncoder, RoleRepo roleRepo) {
        this.userRepo = userRepo;
        this.modelMapper = modelMapper;
        this.passwordEncoder = passwordEncoder;
        this.roleRepo = roleRepo;
    }

    @Override
    public UserDto create(UserDto userDto) {
        User user=modelMapper.map(userDto, User.class);

        user.setId(UUID.randomUUID().toString());
        user.setCreatedAt(new Date());
        user.setActive(false);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setProfilePath(AppConstant.Profile_Path);
        user.setSmsVerified(false);

        Role role=roleRepo.findByRoleName(AppConstant.ROLE_GUEST).orElseThrow(()->new ResourceNotFoundException("Role not found !!"));
        user.assignRole(role);

        User SavedUser= userRepo.save(user);

        return modelMapper.map(SavedUser, UserDto.class);
    }

    @Override
    public UserDto getById(String userId) {
      User user  = userRepo.findById(userId).orElseThrow(()->new ResourceNotFoundException("user not found"));
      return modelMapper.map(user,UserDto.class);
    }
}
