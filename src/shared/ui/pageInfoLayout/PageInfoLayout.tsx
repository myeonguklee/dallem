import React from 'react';

interface PageInfoLayout {
  infoImg: React.ReactNode;
  title: string;
  subtitle: string;
}

export const PageInfoLayout = ({ infoImg, title, subtitle }: PageInfoLayout) => {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-gray-100">
        {infoImg}
      </div>
      <div className="">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
    </div>
  );
};
