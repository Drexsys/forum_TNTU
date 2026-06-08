package org.forum_tntu.forum_tntu.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

@MappedSuperclass
public abstract class Content {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, updatable = false)
    private ZonedDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User author;

    @Column(nullable = false, length = 5000)
    private String text;

    protected Content() {
    }

    protected Content(User author, String text) {
        this.author = author;
        this.text = text;

        var zoneId = ZoneId.of("Europe/Kyiv");
        var timeTmp = LocalDateTime.now();
        createdAt = timeTmp.atZone(zoneId);
    }

    public Long getId() {
        return id;
    }

    public ZonedDateTime getCreatedAt() {
        return createdAt;
    }

    public String getText() {
        return text;
    }

    public User getAuthor() {
        return author;
    }
}
