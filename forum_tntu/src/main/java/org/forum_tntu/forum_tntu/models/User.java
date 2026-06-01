package org.forum_tntu.forum_tntu.models;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long id;

    @Column(unique = true)
    private String  username;
    private int passwordHash;

    public User() {}

    public User(String username, String password) {
        this.username = username;
        this.passwordHash = password.hashCode();
    }

    public int getPasswordHash() {
        return passwordHash;
    }

    public String getUsername() {
        return username;
    }

}
