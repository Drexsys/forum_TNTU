package org.forum_tntu.forum_tntu.repositories;

import org.forum_tntu.forum_tntu.models.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
}
