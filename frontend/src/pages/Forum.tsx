import { useEffect, useState } from 'react';
import { postsApi, Post } from '../services/api';
import PostsList from '../components/PostsList';
import CreatePost from '../components/CreatePost';
import ComingSoon from '../components/ComingSoon';
import styles from './Forum.module.css';

interface ForumProps {
  currentUser: { id: number; username: string };
  onLogout: () => void;
}

export default function Forum({ currentUser, onLogout }: ForumProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [activeTab, setActiveTab] = useState<'posts' | 'notifications' | 'settings'>('posts');

  useEffect(() => {
    loadPosts();
  }, [page]);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const data = await postsApi.list(page, 10);
      setPosts(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handlePostCreated = async () => {
    setPage(0);
    await loadPosts();
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Forum TNTU</h1>
        <div className={styles.userInfo}>
          <span>{currentUser.username}</span>
          <button onClick={onLogout} className={styles.logoutBtn}>
            Logout
          </button>
        </div>
      </header>

      <div className={styles.content}>
        <div className={styles.sidebar}>
          <nav className={styles.nav}>
            <button
              className={`${styles.navItem} ${activeTab === 'posts' ? styles.active : ''}`}
              onClick={() => setActiveTab('posts')}
            >
              Posts
            </button>
            <button
              className={`${styles.navItem} ${activeTab === 'notifications' ? styles.active : ''}`}
              onClick={() => setActiveTab('notifications')}
            >
              Notifications
            </button>
            <button
              className={`${styles.navItem} ${activeTab === 'settings' ? styles.active : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              Settings
            </button>
          </nav>
        </div>

        <main className={styles.main}>
          {activeTab === 'posts' && (
            <>
              <CreatePost currentUser={currentUser} onPostCreated={handlePostCreated} />
              
              {error && <div className={styles.error}>{error}</div>}
              {loading && <div className={styles.loading}>Loading posts...</div>}
              
              {!loading && posts.length > 0 && (
                <PostsList posts={posts} currentUser={currentUser} />
              )}
              
              {!loading && posts.length === 0 && (
                <div className={styles.empty}>No posts yet. Be the first to post!</div>
              )}

              <div className={styles.pagination}>
                <button onClick={() => setPage(Math.max(0, page - 1))} disabled={page === 0}>
                  Previous
                </button>
                <span>Page {page + 1}</span>
                <button onClick={() => setPage(page + 1)} disabled={posts.length < 10}>
                  Next
                </button>
              </div>
            </>
          )}

          {activeTab === 'notifications' && <ComingSoon feature="Notifications" />}
          {activeTab === 'settings' && <ComingSoon feature="Settings" />}
        </main>
      </div>
    </div>
  );
}
