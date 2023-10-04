import { flatten, uniq, uniqueId } from 'lodash';

import EXPERIENCE from '../../constants/EXPERIENCE';

const Technologies = () => (
  <>
    <span className="text-lg font-[400]">Technologies</span>
    <div className="flex flex-row flex-wrap gap-1">
      {uniq(flatten(EXPERIENCE.map(({ technologies }) => technologies))).map((tech) => (
        <span className="badge badge-sm px-0.5" key={uniqueId()}>{tech}</span>
      ))}
    </div>
  </>
);

export default Technologies;
