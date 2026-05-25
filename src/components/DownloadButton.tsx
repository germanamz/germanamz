'use client';

import { FaPrint } from 'react-icons/fa6';

export const DownloadButton = () => {
  const handleDownload = () => {
    window.print();
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      aria-label="Download as PDF"
      title="Download as PDF"
      className="btn btn-xs btn-ghost"
    >
      <FaPrint className="w-4 h-4" />
    </button>
  );
};
