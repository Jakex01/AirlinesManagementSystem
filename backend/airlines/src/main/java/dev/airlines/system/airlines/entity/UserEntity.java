package dev.airlines.system.airlines.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;


import java.util.Collection;
import java.util.List;

@Entity
@Data
@Table(name="users")
@Getter
@Setter
public class UserEntity  {
    @Id
    @Column(name="user_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @Column(name="email")
    private String email;
    @Column(name="password")
    private String password;
    @Column(name="name")
    private String name;
    @Column(name="role")
    @Enumerated(EnumType.STRING)
    private Role role;

}
