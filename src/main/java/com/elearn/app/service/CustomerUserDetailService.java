package com.elearn.app.service;

import com.elearn.app.dtos.CustomerUserDetail;
import com.elearn.app.entities.User;
import com.elearn.app.repositories.UserRepo;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomerUserDetailService implements UserDetailsService {

    private UserRepo userRepo;

    public CustomerUserDetailService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user=userRepo.findByEmail(username).orElseThrow(()->new BadCredentialsException("User not Found"));
        System.out.println("user load from db"+ user.getEmail());
        return new  CustomerUserDetail(user);
    }
}
