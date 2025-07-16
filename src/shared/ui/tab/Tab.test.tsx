import { fireEvent, render, screen } from '@testing-library/react';
import { Tab } from './Tab';

const mockItems = [
  {
    id: 'dallaemfit',
    label: '달램핏',
    icon: <span data-testid="dallaemfit-icon">🧘</span>,
  },
  {
    id: 'workation',
    label: '워케이션',
    icon: <span data-testid="workation-icon">🏖️</span>,
  },
];

const mockOnSelect = jest.fn();

describe('Tab', () => {
  beforeEach(() => {
    mockOnSelect.mockClear();
  });

  it('모든 탭 아이템들을 렌더링한다', () => {
    render(
      <Tab
        items={mockItems}
        selectedId="dallaemfit"
        onSelect={mockOnSelect}
      />,
    );

    expect(screen.getByText('달램핏')).toBeInTheDocument();
    expect(screen.getByText('워케이션')).toBeInTheDocument();
  });

  it('아이콘이 제공되면 아이콘을 렌더링한다', () => {
    render(
      <Tab
        items={mockItems}
        selectedId="dallaemfit"
        onSelect={mockOnSelect}
      />,
    );

    expect(screen.getByTestId('dallaemfit-icon')).toBeInTheDocument();
    expect(screen.getByTestId('workation-icon')).toBeInTheDocument();
  });

  it('탭을 클릭하면 onSelect를 호출한다', () => {
    render(
      <Tab
        items={mockItems}
        selectedId="dallaemfit"
        onSelect={mockOnSelect}
      />,
    );

    fireEvent.click(screen.getByText('워케이션'));
    expect(mockOnSelect).toHaveBeenCalledWith('workation');
  });

  it('커스텀 className을 적용한다', () => {
    render(
      <Tab
        items={mockItems}
        selectedId="dallaemfit"
        onSelect={mockOnSelect}
        className="custom-class"
      />,
    );

    const container = screen.getByText('달램핏').closest('div')?.parentElement;
    expect(container).toHaveClass('custom-class');
  });

  it('아이콘 없이도 동작한다', () => {
    const itemsWithoutIcons = [
      { id: 'option1', label: '옵션 1' },
      { id: 'option2', label: '옵션 2' },
    ];

    render(
      <Tab
        items={itemsWithoutIcons}
        selectedId="option1"
        onSelect={mockOnSelect}
      />,
    );

    expect(screen.getByText('옵션 1')).toBeInTheDocument();
    expect(screen.getByText('옵션 2')).toBeInTheDocument();
  });

  it('크기 변형을 올바르게 적용한다', () => {
    render(
      <Tab
        items={mockItems}
        selectedId="dallaemfit"
        onSelect={mockOnSelect}
        size="lg"
      />,
    );

    const tabButton = screen.getByText('달램핏').closest('button');
    expect(tabButton).toHaveClass('text-lg');
  });

  it('방향 변형을 올바르게 적용한다', () => {
    render(
      <Tab
        items={mockItems}
        selectedId="dallaemfit"
        onSelect={mockOnSelect}
        orientation="vertical"
      />,
    );

    const container = screen.getByText('달램핏').closest('div')?.parentElement;
    expect(container).toHaveClass('flex-col');
  });

  it('개별 탭 아이템을 비활성화한다', () => {
    const itemsWithDisabled = [
      { id: 'dallaemfit', label: '달램핏', icon: <span>🧘</span> },
      { id: 'workation', label: '워케이션', icon: <span>🏖️</span>, disabled: true },
    ];

    render(
      <Tab
        items={itemsWithDisabled}
        selectedId="dallaemfit"
        onSelect={mockOnSelect}
      />,
    );

    const disabledTab = screen.getByText('워케이션').closest('button');
    expect(disabledTab).toHaveClass('opacity-50');
    expect(disabledTab).toHaveClass('cursor-not-allowed');
  });

  it('disabled prop이 true일 때 모든 탭을 비활성화한다', () => {
    render(
      <Tab
        items={mockItems}
        selectedId="dallaemfit"
        onSelect={mockOnSelect}
        disabled={true}
      />,
    );

    const allTabs = screen.getAllByRole('button');
    allTabs.forEach((tab) => {
      expect(tab).toHaveClass('opacity-50');
      expect(tab).toHaveClass('cursor-not-allowed');
    });
  });

  it('탭이 비활성화되어 있으면 onSelect를 호출하지 않는다', () => {
    const itemsWithDisabled = [
      { id: 'dallaemfit', label: '달램핏', icon: <span>🧘</span> },
      { id: 'workation', label: '워케이션', icon: <span>🏖️</span>, disabled: true },
    ];

    render(
      <Tab
        items={itemsWithDisabled}
        selectedId="dallaemfit"
        onSelect={mockOnSelect}
      />,
    );

    fireEvent.click(screen.getByText('워케이션'));
    expect(mockOnSelect).not.toHaveBeenCalled();
  });

  it('HTML 속성들을 전달한다', () => {
    render(
      <Tab
        items={mockItems}
        selectedId="dallaemfit"
        onSelect={mockOnSelect}
        data-testid="tab-container"
      />,
    );

    const container = screen.getByTestId('tab-container');
    expect(container).toBeInTheDocument();
  });
});
