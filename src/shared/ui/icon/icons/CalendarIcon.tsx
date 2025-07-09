import { IconProps } from '../IconType';
import { calculateIconSizeByWidth } from '../iconUtils';

export const CalendarIcon = ({ size = 18, ...props }: IconProps) => {
  const { width, height } = calculateIconSizeByWidth(size, 18 / 20); // width/height 비율

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 18 20"
      {...props}
    >
      <path
        fill="#111827"
        d="M14 11H9v5h5v-5ZM13 0v2H5V0H3v2H2C.89 2 .01 2.9.01 4L0 18a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2h-1V0h-2Zm3 18H2V7h14v11Z"
      />
    </svg>
  );
};
