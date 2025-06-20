import type { ReactElement } from 'react';
import { intervals } from '../../data';
import styles from './table.module.css';

const Table = (): ReactElement => {
  return (
    <>
      <h2 className={styles.title}>Расписание</h2>
      <ul className={styles.table}>
        <li className={styles.item}>
          <span className={`${styles.coll} ${styles.header}`}>закрывается</span>
          <span className={`${styles.coll} ${styles.header}`}>открывается</span>
        </li>
        {intervals.map((interval, index) => (
          <li className={styles.item} key={index}>
            <span className={styles.coll}>{interval.close}</span>
            <span className={styles.coll}>{interval.open}</span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Table;
