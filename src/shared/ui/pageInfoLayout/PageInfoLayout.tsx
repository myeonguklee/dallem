import React from 'react';

interface PageInfoLayout {
  infoImg: React.ReactNode;
  title: string;
  subtitle: string;
}

export const PageInfoLayout = ({ infoImg, title, subtitle }: PageInfoLayout) => {
  return (
    <div
      role="페이지정보"
      aria-label={`${title} 정보 영역`}
      className="flex items-center gap-4"
    >
      <div
        role="img"
        aria-hidden="true"
        className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-gray-100"
      >
        {infoImg}
      </div>
      <div>
        <h2
          className="text-xl font-semibold"
          aria-label={title}
        >
          {title}
        </h2>
        <p
          className="text-sm text-gray-500"
          aria-label={subtitle}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
};
