import { useEffect, useState, type ReactElement } from 'react';
import styles from './clock.module.css';
import { getMoscowTime } from '../../utils';

const Clock = (): ReactElement => {
  const [time, setTime] = useState<string>(getMoscowTime());

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setTime(getMoscowTime());
    }, 1000);

    return () => clearInterval(timeInterval);
  });

  return (
    <header className={styles.clock}>
      {time}
      <p className={styles.text}>Московское время</p>
    </header>
  );
};

export default Clock;
