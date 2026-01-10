'use client';

export const DownloadButton = () => {
  const handleDownload = () => {
    window.print();
  };

  return (
    <button className="btn btn-md" onClick={handleDownload}>Download as PDF</button>
  );
};
