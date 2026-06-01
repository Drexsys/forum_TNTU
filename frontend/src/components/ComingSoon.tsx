import styles from './ComingSoon.module.css';

interface ComingSoonProps {
  feature: string;
  compact?: boolean;
}

export default function ComingSoon({ feature, compact = false }: ComingSoonProps) {
  if (compact) {
    return (
      <div className={`${styles.container} ${styles.compact}`}>
        <p className={styles.message}>🚀 {feature} - Coming Soon</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.icon}>🚀</div>
        <h2 className={styles.title}>{feature}</h2>
        <p className={styles.message}>This feature is coming soon!</p>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Planned Features</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{feature}</td>
              <td className={styles.statusComing}>Coming Soon</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
