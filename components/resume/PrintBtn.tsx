import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';

import styles from './PrintBtn.module.scss';

const PrintBtn: FC = () => {
  const [isTopRight, setIsTopRight]= useState(false);
  const onClick = () => {
    window.print();
  };

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 300) {
        setIsTopRight(true);
      } else {
        setIsTopRight(false);
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  console.log(isTopRight);
  return (
    <div className={classNames(styles.printBtn, {
      [styles.topRight]: isTopRight,
    })}>
      <button type="button" onClick={onClick} className={styles.printBtnButton}>Get as PDF</button>
    </div>
  );
};

export default PrintBtn;
