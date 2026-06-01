import { Comment } from '../services/api';
import styles from './CommentsList.module.css';

interface CommentsListProps {
  comments: Comment[];
  currentUser: { id: number; username: string };
  postId: number;
}

export default function CommentsList({ comments }: CommentsListProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <div className={styles.comments}>
      {comments.map((comment) => (
        <div key={comment.id} className={styles.comment}>
          <div className={styles.commentHeader}>
            <span className={styles.commentDate}>{formatDate(comment.createdAt)}</span>
          </div>
          <p className={styles.commentText}>{comment.text}</p>
        </div>
      ))}
    </div>
  );
}
