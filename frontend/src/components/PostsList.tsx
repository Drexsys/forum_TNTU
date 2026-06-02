import { Post } from '../services/api';
import PostItem from './PostItem';
import styles from './PostsList.module.css';

interface PostsListProps {
  posts: Post[];
  currentUser: { id: number; username: string };
}

export default function PostsList({ posts, currentUser }: PostsListProps) {
  return (
    <div className={styles.container}>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} currentUser={currentUser} />
      ))}
    </div>
  );
}
