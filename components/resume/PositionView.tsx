import { nanoid } from '@reduxjs/toolkit';
import format from 'date-fns/format';
import { union } from 'lodash';
import { FC } from 'react';

import Position from '../../types/Position';
import styles from './PositionView.module.scss';

const getFormatedDateRange = (from?: Date, to?: Date) => {
  if (!from) {
    return '';
  }
  if (!to) {
    return `${format(from, 'MMM yyyy')} - Present`;
  }
  return `${format(from, 'MMM yyyy')} - ${format(to, 'MMM yyyy')}`;
};

export type PositionViewProps = {
  position: Partial<Position>;
};

const PositionView: FC<PositionViewProps> = ({ position }) => {
  const technologies = union(
    position.technologies || [],
    ...(position.projects?.map((item) => item.technologies) || [])
  );
  return (
    <div className={styles.positionRoot}>
      {position.companyName && (<div className={styles.companyName}>{position.companyName}</div>)}
      {position.title && (<div className={styles.title}>{position.title}</div>)}
      <div className={styles.timeRange}>{getFormatedDateRange(position.from, position.to)}</div>
      {technologies?.length && (<div className={styles.technologies}>{technologies.join(', ')}</div>)}
      {position.description && (<p className={styles.description}>{position.description}</p>)}
      {position.projects?.length && (
        <>
          <div className={styles.projectsTitleWrapper}>
            <span className={styles.projectsTitle}>Projects</span>
          </div>
          <div className={styles.projects}>
            {position.projects.map((item) => (
              <div className={styles.project} key={nanoid()}>
                <div className={styles.projectTitle}>{item.title}</div>
                <div className={styles.projectRange}>{getFormatedDateRange(item.from, item.to)}</div>
                {item.technologies?.length && (<div className={styles.technologies}>{item.technologies.join(', ')}</div>)}
                <div className={styles.projectDescription}>{item.description}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PositionView;
