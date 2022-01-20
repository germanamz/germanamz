import cn from 'classnames';
import { FC } from 'react';

import OpenBtn from './OpenBtn';

type OpenCardProps = FC['defaultProps'] & {
  title: string;
  href: string;
  subtitle?: string;
  description: string;
};

const OpenCard: FC<OpenCardProps> = ({
  title,
  href,
  description,
  subtitle,
}) => (
  <div className="group card card-bordered w-5/12">
    <div className="card-body">
      <h2 className="card-title group-hover:underline">{title}</h2>
      <h4 className={cn('card-title text-sm', {
        'text-gray-600': subtitle?.length,
        'text-transparent': !subtitle?.length,
      })}>{subtitle?.length ? subtitle : '*'}</h4>
      <p>{description}</p>
      <OpenBtn href={href} />
    </div>
  </div>
);

export default OpenCard;
