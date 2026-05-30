package org.forum_tntu.forum_tntu.controllers;

import org.forum_tntu.forum_tntu.dto.PostDto;
import org.forum_tntu.forum_tntu.models.Post;
import org.forum_tntu.forum_tntu.repositories.PostRepository;
import org.forum_tntu.forum_tntu.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/posts")
public class PostController {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<String> createPost(@RequestBody PostDto body) {
        var author = userRepository.findById(body.getUserId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        postRepository.save(new Post(author, body.getTitle(), body.getText()));

        return ResponseEntity.ok("Created successfully");
    }

    @GetMapping
    public Iterable<Post> getList(
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "10") Integer pageSize) {
        return postRepository.findAll(PageRequest.of(page, pageSize));
    }

}
