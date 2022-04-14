import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { nanoid } from '@reduxjs/toolkit';

import MY_SKILLS from '../../constants/MY_SKILLS';
import styles from './Skills.module.scss';

const Skills = () => (
  <div className={styles.profileSkills}>
    {MY_SKILLS.map((skill) => (
      <div className={styles.profileSkill} key={nanoid()}><FontAwesomeIcon icon={faCheck} color="#a5d6a7" />{skill}</div>))}
  </div>
);

export default Skills;
