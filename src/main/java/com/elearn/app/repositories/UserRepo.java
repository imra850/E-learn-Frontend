package com.elearn.app.repositories;

import com.elearn.app.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepo extends JpaRepository<User,String> {

    Optional<User> findByEmail(String email);
}
