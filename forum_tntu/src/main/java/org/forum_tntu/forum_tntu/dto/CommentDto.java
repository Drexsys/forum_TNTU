package org.forum_tntu.forum_tntu.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class CommentDto {

    @JsonProperty("user_id")
    private Long userId;

    @JsonProperty("text")
    private String text;

    @JsonProperty("parent")
    private Long parent;

    @JsonProperty("parent_comment")
    private Long parentC;


    public Long getUserId() {
        return userId;
    }

    public String getText() {
        return text;
    }

    public Long getParent() {
        return parent;
    }

    public Long getParentC() {
        return parentC;
    }

}
