package org.forum_tntu.forum_tntu.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;

@Entity
public class Post extends Content {

    @Column(nullable = false)
    private String title;

    public Post() {
    }

    public Post(User author, String title, String text) {
        super(author, text);
        this.title = title;
    }

    public String getTitle() {
        return title;
    }

}
