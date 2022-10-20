import { flatten, uniq } from 'lodash';

import EXPERIENCE from '../../constants/EXPERIENCE';

const Technologies = () => (
  <>
    <h3 className="mt-0">Technologies</h3>
    <div className="flex flex-row flex-wrap gap-1">
      {uniq(flatten(EXPERIENCE.map(({ technologies }) => technologies))).map((tech) => (
        <span className="badge badge-sm">{tech}</span>
      ))}
    </div>
  </>
);

export default Technologies;
