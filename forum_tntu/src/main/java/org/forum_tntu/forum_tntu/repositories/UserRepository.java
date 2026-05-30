package org.forum_tntu.forum_tntu.repositories;

import org.forum_tntu.forum_tntu.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsernameAndPasswordHash(String username, Integer passwordHash);
    boolean existsByUsername(String username);
}
