import { useState } from 'react';
import styles from './App.module.css';
import Auth from './pages/Auth';
import Forum from './pages/Forum';

export default function App() {
  const [currentUser, setCurrentUser] = useState<{ id: number; username: string } | null>(null);

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <div className={styles.container}>
      {!currentUser ? (
        <Auth onLoginSuccess={setCurrentUser} />
      ) : (
        <Forum currentUser={currentUser} onLogout={handleLogout} />
      )}
    </div>
  );
}
