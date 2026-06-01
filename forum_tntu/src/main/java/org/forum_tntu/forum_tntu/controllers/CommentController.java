package org.forum_tntu.forum_tntu.controllers;

import org.forum_tntu.forum_tntu.dto.CommentDto;
import org.forum_tntu.forum_tntu.models.Comment;
import org.forum_tntu.forum_tntu.models.Post;
import org.forum_tntu.forum_tntu.repositories.CommentRepository;
import org.forum_tntu.forum_tntu.repositories.PostRepository;
import org.forum_tntu.forum_tntu.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/comments")
public class CommentController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private PostRepository postRepository;

    @PostMapping
    public ResponseEntity<String> createComment(@RequestBody CommentDto body) {
        var author = userRepository.findById(body.getUserId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        Post parent = null;
        Comment parentC = null;
        if (body.getParent() != null) {
            parent = postRepository.findById(body.getParent())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Post not found"));
        }
        else if (body.getParentC() != null) {
            parentC = commentRepository.findById(body.getParentC())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Comment not found"));
        }
        else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Parent do not set");
        }

        commentRepository.save(new Comment(author, body.getText(), parent, parentC));

        return ResponseEntity.ok("Created successfully");
    }

    @GetMapping
    public Iterable<Comment> getComments(
            @RequestParam(required = false) Long parentId,
            @RequestParam(required = false) Long parentCommentId) {

        if (parentId != null) {
            var parent = postRepository.findById(parentId)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Post not found"));

            return commentRepository.findByParentId(parent);
        }
        if (parentCommentId != null) {
            var parent = commentRepository.findById(parentCommentId)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Comment not found"));

            return commentRepository.findByParentCommentId(parent);
        }

        return null;
    }

}
