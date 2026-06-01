package org.forum_tntu.forum_tntu.repositories;

import org.forum_tntu.forum_tntu.models.Comment;
import org.forum_tntu.forum_tntu.models.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    Iterable<Comment> findByParentId(Post parent);
    Iterable<Comment> findByParentCommentId(Comment parent);
}
