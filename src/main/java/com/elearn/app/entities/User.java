package com.elearn.app.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    private String id;

    private String name;

    @Column(unique = true)
    private String email;

    private String phoneNumber;

    private String password;

    private String about;

    private boolean active;

    private boolean emailVerified;

    private boolean smsVerified;

    private Date createdAt;

    private String profilePath;


    @ManyToMany(mappedBy = "users",cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    private Set<Role> roles=new HashSet<>();

    public void assignRole(Role role){
        this.roles.add(role);
        role.getUsers().add(this);
    }

    public void removeRole(Role role){
        this.roles.remove(role);
        role.getUsers().remove(this);
    }


}
