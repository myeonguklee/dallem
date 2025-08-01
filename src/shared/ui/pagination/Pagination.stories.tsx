import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { Pagination } from './Pagination';

const meta = {
  title: 'shared/ui/pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    totalPages: {
      control: { type: 'number' },
      description: ' 총 페이지 수 (예: 5는 1~5까지) ',
    },
    currentPage: {
      control: { type: 'number' },
      description: '현재페이지번호',
    },
    onPageChange: {
      action: 'clicked',
      description: '페이지 넘버 전달 함수 ',
    },
  },
  args: {
    currentPage: 1,
    totalPages: 5,
    disabled: false,
    onPageChange: () => console.log('페이지'),
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const BasicPagination: Story = {
  render: (args) => {
    // 진짜 리액트 컴포넌트를 만들어서 그 안에서 useState 사용
    const PaginationWithState = () => {
      const { currentPage: currentPageProp = 1 } = args;
      const [currentPage, setCurrentPage] = useState(currentPageProp);

      useEffect(() => {
        setCurrentPage(currentPageProp);
      }, [currentPageProp]);

      const handleChangePage = (page: number) => {
        setCurrentPage(page);
      };

      return (
        <Pagination
          {...args}
          currentPage={currentPage}
          onPageChange={handleChangePage}
        />
      );
    };

    return <PaginationWithState />;
  },
  args: {
    currentPage: 1,
    totalPages: 5,
  },
};

export const StartEllipsisPagination: Story = {
  args: {
    currentPage: 2,
    totalPages: 10,
    onPageChange: () => console.log('페이지'),
  },
};

export const EllipsisPagination: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
    onPageChange: () => console.log('페이지'),
  },
};

export const EndEllipsisPagination: Story = {
  args: {
    currentPage: 9,
    totalPages: 10,
  },
};
