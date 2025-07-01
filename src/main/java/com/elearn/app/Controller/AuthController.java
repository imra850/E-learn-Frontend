package com.elearn.app.Controller;

import com.elearn.app.configuration.security.JwtUtil;
import com.elearn.app.dtos.CustomerUserDetail;
import com.elearn.app.dtos.JwtResponse;
import com.elearn.app.dtos.LoginRequest;
import com.elearn.app.dtos.UserDto;
import com.elearn.app.entities.User;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private UserDetailsService userDetailsService;

    private AuthenticationManager manager;
    private JwtUtil util;

    private ModelMapper modelMapper;

    public AuthController(UserDetailsService userDetailsService, AuthenticationManager manager, JwtUtil util, ModelMapper modelMapper) {
        this.userDetailsService = userDetailsService;
        this.manager = manager;
        this.util = util;
        this.modelMapper = modelMapper;
    }

    @PostMapping("/login")
    public ResponseEntity<?> createToken(@RequestBody LoginRequest loginRequest){

        try {
            UsernamePasswordAuthenticationToken authenticationToken=new UsernamePasswordAuthenticationToken(loginRequest.getEmail(),loginRequest.getPassword());
            Authentication authentication=manager.authenticate(authenticationToken);
        } catch (AuthenticationException ex){
            throw new BadCredentialsException("Incorrect email or password !!");
        }

        CustomerUserDetail userDetail=(CustomerUserDetail) userDetailsService.loadUserByUsername(loginRequest.getEmail());
        String token=util.generateToken(userDetail.getUsername());

        User user=userDetail.getUser();

        JwtResponse build= JwtResponse.builder().token(token).user(modelMapper.map(user, UserDto.class)).build();

        return ResponseEntity.ok(build);
    }


}
