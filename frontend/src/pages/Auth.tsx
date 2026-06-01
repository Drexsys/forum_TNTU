import { useState } from 'react';
import { userApi } from '../services/api';
import styles from './Auth.module.css';

interface AuthProps {
  onLoginSuccess: (user: { id: number; username: string }) => void;
}

export default function Auth({ onLoginSuccess }: AuthProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await userApi.login(username, password);
        const count = await userApi.getCount();
        onLoginSuccess({ id: count, username });
      } else {
        await userApi.register(username, password);
        setIsLogin(true);
        setPassword('');
        setError('');
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Forum TNTU</h1>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2>{isLogin ? 'Login' : 'Register'}</h2>
          
          {error && <div className={styles.error}>{error}</div>}
          
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className={styles.input}
          />
          
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
          />
          
          <button type="submit" disabled={loading} className={styles.button}>
            {loading ? 'Loading...' : (isLogin ? 'Login' : 'Register')}
          </button>
        </form>

        <div className={styles.toggle}>
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
              setPassword('');
            }}
            className={styles.toggleButton}
          >
            {isLogin ? 'Register' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
}
