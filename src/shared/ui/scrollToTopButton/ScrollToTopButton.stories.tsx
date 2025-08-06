import type { Meta, StoryObj } from '@storybook/nextjs';
import { ScrollToTopButton } from './ScrollToTopButton';

const meta = {
  title: 'shared/ui/ScrollToTopButton',
  component: ScrollToTopButton,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ height: '1400px', paddingTop: '800px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicScrollToTopButton: Story = {};
