import { nanoid } from '@reduxjs/toolkit';
import { FC } from 'react';

import Project from '../../types/Project';
import styles from './Projects.module.scss';

const Projects: FC<{ list: Project[] }> = ({ list }) => (
    <div className={styles.projectsRoot}>
      <h3 className={styles.projectsProjectTitle}>Some of my projects</h3>
      <div className={styles.projectsWrapper}>
        {list.map((project) => (
          <div key={nanoid()} className={styles.projectsProject}>
            <div className={styles.projectsProjectTimeRange}>{project.from}-{project.to}</div>
            <h3 className={styles.projectsProjectTitle}>{project.title}</h3>
            <div className={styles.projectsProjectTechnologies}>{project.technologies}</div>
            <div className={styles.projectsProjectDescription}>{project.description}</div>
          </div>
        ))}
      </div>
    </div>
  );

export default Projects;
