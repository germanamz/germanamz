import { nanoid } from '@reduxjs/toolkit';
import { FC } from 'react';

import Position from '../../types/Position';
import styles from './Experience.module.scss';
import PositionView from './PositionView';

export type ExperienceProps = {
  items: Position[];
};

const Experience: FC<ExperienceProps> = ({ items }) => (
    <div className={styles.experienceRoot}>
      <h3 className={styles.experienceTitle}>My experience</h3>
      <div className={styles.positions}>
        {items.map((item) => (
          <PositionView key={nanoid()} position={item} />
        ))}
      </div>
    </div>
  );

export default Experience;
