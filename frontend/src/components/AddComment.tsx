import { useState } from 'react';
import { commentsApi } from '../services/api';
import styles from './AddComment.module.css';

interface AddCommentProps {
  postId: number;
  currentUser: { id: number; username: string };
  onCommentCreated?: () => void;
}

export default function AddComment({ postId, currentUser, onCommentCreated }: AddCommentProps) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    setError('');
    setLoading(true);

    try {
      await commentsApi.create(currentUser.id, text, postId);
      setText('');
      onCommentCreated && onCommentCreated();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {error && <div className={styles.error}>{error}</div>}
      <textarea
        placeholder="Write a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className={styles.textarea}
        rows={3}
      />
      <div className={styles.actions}>
        <button type="submit" disabled={loading} className={styles.submitBtn}>
          {loading ? 'Posting...' : 'Add Comment'}
        </button>
      </div>
    </form>
  );
}
