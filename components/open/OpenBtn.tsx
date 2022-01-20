import Link from 'next/link';
import { FC } from 'react';

export type OpenBtnProps = FC['defaultProps'] & {
  href: string
};

const OpenBtn: FC<OpenBtnProps> = ({ href }) => (
  <div className="justify-end card-actions">
    <Link href={href}>
      <button type="button" className="btn">
        Open
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
             className="inline-block w-6 h-6 ml-2 stroke-current">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </Link>
  </div>
);

export default OpenBtn;
