package org.forum_tntu.forum_tntu.models;

import jakarta.persistence.*;

@Entity
public class Comment extends Content {

    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "parent_comment_id")
    private Post parentId;

    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "parent_ccomment_id")
    private Comment parentCommentId;

    public Comment() {}

    public Comment(User author, String text, Post parent, Comment cParent) {
        super(author, text);
        this.parentId = parent;
        this.parentCommentId = cParent;
    }

}
