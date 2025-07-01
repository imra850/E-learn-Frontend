package com.elearn.app.Controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class TestConntroller {

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public String testing(){
        return "testing";
    }

    @GetMapping
    @PreAuthorize("hasRole('GUEST')")
    public String testing1(){
        return "testing1";
    }
}
