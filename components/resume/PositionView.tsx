import format from 'date-fns/format';
import { union, uniqueId } from 'lodash';
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
      {position.bulletPoints && (
        <ul className="list-disc">
          {position.bulletPoints.map((point) => (<li key={uniqueId()}>{point}</li>))}
        </ul>
      )}
    </div>
  );
};

export default PositionView;
