import { useState } from 'react';
import { postsApi } from '../services/api';
import styles from './CreatePost.module.css';

interface CreatePostProps {
  currentUser: { id: number; username: string };
  onPostCreated: () => void;
}

export default function CreatePost({ currentUser, onPostCreated }: CreatePostProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await postsApi.create(currentUser.id, title, text);
      setTitle('');
      setText('');
      setIsOpen(false);
      onPostCreated();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {!isOpen ? (
        <button onClick={() => setIsOpen(true)} className={styles.openBtn}>
          + Create New Post
        </button>
      ) : (
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2>Create a New Post</h2>

          {error && <div className={styles.error}>{error}</div>}

          <input
            type="text"
            placeholder="Post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className={styles.input}
            autoFocus
          />

          <textarea
            placeholder="What's on your mind?"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            className={styles.textarea}
            rows={6}
          />

          <div className={styles.actions}>
            <button type="submit" disabled={loading} className={styles.submitBtn}>
              {loading ? 'Posting...' : 'Post'}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                setTitle('');
                setText('');
                setError('');
              }}
              className={styles.cancelBtn}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
