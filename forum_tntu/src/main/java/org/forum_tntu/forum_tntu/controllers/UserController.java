package org.forum_tntu.forum_tntu.controllers;

import org.forum_tntu.forum_tntu.dto.UserDto;
import org.forum_tntu.forum_tntu.models.User;
import org.forum_tntu.forum_tntu.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    private class UserResponce {

        private Long id;
        private String username;

        public UserResponce(Long id, String username) {
            this.id = id;
            this.username = username;
        }

        public Long getId() {
            return id;
        }
        public String getUsername() {
            return username;
        }

    }

    @PostMapping("/login")
    public ResponseEntity<?> registerUser(
            @RequestBody UserDto body
            ) {
        User user = userRepository.findByUsernameAndPasswordHash(body.getUsername(),
                body.getPassword().hashCode());
        if (user == null)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Wrong username or password");

        return ResponseEntity.ok(new UserResponce(user.getId(), user.getUsername()));
    }

    @PostMapping
    public ResponseEntity<?> loginUser(
            @RequestBody UserDto body
    ) {
        if (userRepository.count() > 0)
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already exists");

        var user = new User(body.getUsername(), body.getPassword());
        userRepository.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(
                new UserResponce(user.getId(), user.getUsername()));
    }

    @GetMapping("/count")
    public Integer getCount() {
        return (int) userRepository.count();
    }

}
