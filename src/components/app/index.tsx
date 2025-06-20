import { useEffect, useState, type ReactElement } from 'react';
import Clock from '../clock';
import styles from './app.module.css';
import { checkIsCloseTransfer, getMoscowTime } from '../../utils';
import { intervals } from '../../data';
import TransferInfo from '../transfer-info';
import Table from '../table';
import Contacts from '../contacts';

function App(): ReactElement {
  const [isClose, setIsClose] = useState<boolean>(
    checkIsCloseTransfer(getMoscowTime(), intervals)
  );

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setIsClose(checkIsCloseTransfer(getMoscowTime(), intervals));
    }, 30000);

    return () => clearInterval(timeInterval);
  }, [isClose]);

  return (
    <div className={`${styles.app} ${isClose ? styles.close : ''}`}>
      <Clock />
      <TransferInfo isClose={isClose} />
      <Table />
      <Contacts />
    </div>
  );
}
export default App;
