import type { ReactElement } from 'react';
import styles from './contacts.module.css';

const Contacts = (): ReactElement => {
  return (
    <footer className={styles.footer}>
      <span className={styles.text}>
        По вопросам и предложениям:{' '}
        <a className={styles.link} href="https://t.me/freshsymbol">
          сюда
        </a>
      </span>
    </footer>
  );
};
export default Contacts;
