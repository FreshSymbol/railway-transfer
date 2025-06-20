import {
  useEffect,
  useState,
  type MouseEventHandler,
  type ReactElement,
} from 'react';
import styles from './transfer-info.module.css';
import {
  checkIsCloseTransfer,
  getDiffTime,
  getMoscowTime,
  pluralize,
} from '../../utils';
import refreshPicture from '../../../public/refresh.png';
import { intervals } from '../../data';

type TransferInfoProps = {
  isClose: boolean;
};

const TransferInfo = ({ isClose }: TransferInfoProps): ReactElement => {
  const [diffTime, setDiffTime] = useState<string>(getDiffTime());

  const refreshTransferInfo: MouseEventHandler<
    HTMLButtonElement
  > = (): void => {
    setDiffTime(getDiffTime());
    checkIsCloseTransfer(getMoscowTime(), intervals);
  };
  checkIsCloseTransfer(getMoscowTime(), intervals);
  useEffect(() => {
    const timeInterval = setInterval(() => {
      setDiffTime(getDiffTime());
    }, 60000);
    return () => clearInterval(timeInterval);
  }, []);
  return (
    <section className={styles.transfer}>
      <div className={styles.container}>
        <p className={styles.title}>{isClose ? 'Закрыт' : 'Открыт'} </p>
        <button className={styles.button} onClick={refreshTransferInfo}>
          <img
            className={styles.img}
            src={refreshPicture}
            alt="черная стрелка по часовой"
          />
        </button>
      </div>
      {isClose ? (
        <span
          className={`${styles.text} ${
            +diffTime <= 10 ? styles.accentOpen : ''
          } `}
        >{`откроется через: ${diffTime} ${pluralize(+diffTime)}`}</span>
      ) : (
        <span
          className={`${styles.text} ${
            +diffTime <= 10 ? styles.accentClose : ''
          } `}
        >
          {`закроется через: ${diffTime} ${pluralize(+diffTime)}`}
        </span>
      )}
    </section>
  );
};

export default TransferInfo;
