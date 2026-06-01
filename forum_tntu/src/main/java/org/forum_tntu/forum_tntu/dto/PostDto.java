package org.forum_tntu.forum_tntu.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class PostDto {

    @JsonProperty("user_id")
    private Long userId;

    @JsonProperty("title")
    private String title;

    @JsonProperty("text")
    private String text;


    public Long getUserId() {
        return userId;
    }

    public String getTitle() {
        return title;
    }

    public String getText() {
        return text;
    }
}
