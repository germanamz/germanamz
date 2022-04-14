import { nanoid } from '@reduxjs/toolkit';
import classNames from 'classnames';
import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../store';
import { selectNewsByTarget } from '../../store/selectors/news';
import News from '../../types/News';
import styles from './NewsRow.module.scss';

export type NewsRowProps = {
  id: string;
  label?: string;
  preSubtitle?: ReactNode;
};

const Item: FC<{ item: News; preSubtitle?: ReactNode; exit?: boolean }> = ({
  item,
  preSubtitle,
  exit
}) => {
  const content = (
    <>
      <div className={styles.itemTitle}>{item.title}</div>
      <div className={styles.itemSubtitle}>{preSubtitle}{item.subtitle}</div>
    </>
  );

  if (item.target) {
    return (
      <a className={classNames(styles.item, exit ? styles.itemExit : '')}
         href={item.target}
         target={item.blank ? '_blank' : ''} rel="noreferrer">{content}</a>
    );
  }
  return (
    <div className={classNames(styles.item, exit ? styles.itemExit : '')}>
      {content}
    </div>
  );
};

const NewsRow: FC<NewsRowProps> = ({ id, preSubtitle, label }) => {
  const list = useSelector<RootState, News[]>(state => selectNewsByTarget(state, id));
  const wrapperRef = useRef<null | HTMLDivElement>(null);
  const [displayList, setDisplayList] = useState<News[]>(list.slice());
  const [timeoutId, setTimeoutId] = useState<any>(null);
  const [hovering, setHovering] = useState(false);
  const onItemExited = () => {
    const first = displayList.shift() as News;
    setDisplayList([...displayList, first]);
    wrapperRef.current?.classList.remove(styles.itemExit);
  };
  const onMouseEnter = () => {
    clearTimeout(timeoutId);
    setTimeoutId(null);
    setHovering(true);
  };
  const onMouseLeave = () => {
    setHovering(false);
  };

  useEffect(() => {
    if (!hovering) {
      setTimeoutId(setTimeout(() => {
        wrapperRef.current?.classList.add(styles.itemExit);
      }, 4000));
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [displayList, hovering]);

  return (
    <div className={styles.newsRowRoot} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {label?.length && <span className="text-xs font-thin">{label}</span>}
      <div className={styles.newsRow}>
        <div className={styles.itemsWrapper} ref={wrapperRef} onTransitionEnd={onItemExited}>
          {displayList.map((item) => (
            <Item key={nanoid()} item={item} preSubtitle={preSubtitle} />))}
        </div>
      </div>
    </div>
  );
};

export default NewsRow;
