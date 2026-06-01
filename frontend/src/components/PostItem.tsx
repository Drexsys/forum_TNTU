import { useState } from 'react';
import { Post, commentsApi, Comment } from '../services/api';
import CommentsList from './CommentsList';
import ComingSoon from './ComingSoon';
import styles from './PostItem.module.css';

interface PostItemProps {
  post: Post;
  currentUser: { id: number; username: string };
}

export default function PostItem({ post, currentUser }: PostItemProps) {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(false);

  const loadComments = async () => {
    if (showComments) {
      setShowComments(false);
      return;
    }

    try {
      setCommentsLoading(true);
      const data = await commentsApi.list(post.id);
      setComments(data || []);
      setShowComments(true);
    } catch (err) {
      console.error('Failed to load comments:', err);
    } finally {
      setCommentsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <div className={styles.post}>
      <div className={styles.header}>
        <h2 className={styles.title}>{post.title}</h2>
        <span className={styles.date}>{formatDate(post.createdAt)}</span>
      </div>

      <p className={styles.text}>{post.text}</p>

      <div className={styles.actions}>
        <button onClick={loadComments} className={styles.actionBtn}>
          {showComments ? '✕ Hide Comments' : '💬 Show Comments'}
        </button>
        <button className={styles.actionBtn} disabled>
          👍 Like (Coming Soon)
        </button>
        <button className={styles.actionBtn} disabled>
          ⭐ Save (Coming Soon)
        </button>
      </div>

      {showComments && (
        <div className={styles.commentsSection}>
          {commentsLoading ? (
            <div className={styles.loading}>Loading comments...</div>
          ) : (
            <>
              {comments.length > 0 ? (
                <CommentsList comments={comments} currentUser={currentUser} postId={post.id} />
              ) : (
                <div className={styles.empty}>No comments yet</div>
              )}
              <ComingSoon feature="Add Comment" compact />
            </>
          )}
        </div>
      )}
    </div>
  );
}
