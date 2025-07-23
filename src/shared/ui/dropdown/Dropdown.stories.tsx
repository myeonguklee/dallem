import type { Meta, StoryObj } from '@storybook/nextjs';
import { ArrowDownIcon } from '../icon/icons/ArrowDownIcon';
import { Dropdown } from './Dropdown';
import { DropdownItem } from './DropdownItem';
import { DropdownList } from './DropdownList';
import { DropdownTrigger } from './DropdownTrigger';

const meta: Meta<typeof Dropdown> = {
  title: 'shared/ui/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Dropdown defaultValue="option1">
      {({ isOpen, toggle, selectedValue, onSelect }) => (
        <div className="relative">
          <DropdownTrigger
            onClick={toggle}
            state="default"
          >
            <span>{selectedValue || '옵션을 선택하세요'}</span>
            <ArrowDownIcon className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </DropdownTrigger>

          {isOpen && (
            <DropdownList isOpen={isOpen}>
              <DropdownItem
                value="option1"
                selectedValue={selectedValue}
                onSelect={onSelect}
              >
                옵션 1
              </DropdownItem>
              <DropdownItem
                value="option2"
                selectedValue={selectedValue}
                onSelect={onSelect}
              >
                옵션 2
              </DropdownItem>
              <DropdownItem
                value="option3"
                selectedValue={selectedValue}
                onSelect={onSelect}
              >
                옵션 3
              </DropdownItem>
            </DropdownList>
          )}
        </div>
      )}
    </Dropdown>
  ),
};

export const Small: Story = {
  render: () => (
    <Dropdown defaultValue="option1">
      {({ isOpen, toggle, selectedValue, onSelect }) => (
        <div className="relative">
          <DropdownTrigger
            size="small"
            onClick={toggle}
            state="default"
          >
            <span>{selectedValue || '옵션을 선택하세요'}</span>
            <ArrowDownIcon className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </DropdownTrigger>

          {isOpen && (
            <DropdownList isOpen={isOpen}>
              <DropdownItem
                size="small"
                value="option1"
                selectedValue={selectedValue}
                onSelect={onSelect}
              >
                옵션 1
              </DropdownItem>
              <DropdownItem
                size="small"
                value="option2"
                selectedValue={selectedValue}
                onSelect={onSelect}
              >
                옵션 2
              </DropdownItem>
              <DropdownItem
                size="small"
                value="option3"
                selectedValue={selectedValue}
                onSelect={onSelect}
              >
                옵션 3
              </DropdownItem>
            </DropdownList>
          )}
        </div>
      )}
    </Dropdown>
  ),
};
