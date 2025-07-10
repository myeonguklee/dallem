import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Sort } from './Sort';

const options = [
  { label: '마감 임박', value: 'deadline' },
  { label: '최신순', value: 'latest' },
  { label: '인기순', value: 'popular' },
];

describe('Sort', () => {
  it('드롭다운 열고 옵션 선택 시 onChange가 호출된다', async () => {
    const onChange = jest.fn();
    render(
      <Sort
        options={options}
        selected={options[0].value}
        onChange={onChange}
      />,
    );
    const button = screen.getByRole('button');
    // 드롭다운 열기
    await userEvent.click(button);
    // 옵션 클릭
    const optionBtn = screen.getByRole('button', { name: '최신순' });
    await userEvent.click(optionBtn);
    expect(onChange).toHaveBeenCalledWith('latest');
  });

  it('외부 클릭 시 드롭다운이 닫힌다', async () => {
    const onChange = jest.fn();
    render(
      <div>
        <Sort
          options={options}
          selected={options[0].value}
          onChange={onChange}
        />
        <button data-testid="outside">outside</button>
      </div>,
    );
    const button = screen.getByRole('button', { name: /마감 임박/ });
    await userEvent.click(button);
    expect(screen.getByRole('button', { name: '최신순' })).toBeInTheDocument();
    // 바깥 클릭
    await userEvent.click(screen.getByTestId('outside'));
    expect(screen.queryByRole('button', { name: '최신순' })).not.toBeInTheDocument();
  });

  it('키보드로 드롭다운 내비게이션이 가능하다', async () => {
    const onChange = jest.fn();
    render(
      <Sort
        options={options}
        selected={options[0].value}
        onChange={onChange}
      />,
    );
    const button = screen.getByRole('button');
    // 드롭다운 열기
    await userEvent.click(button);
    // ↓ 키로 두 번째 옵션으로 이동
    fireEvent.keyDown(button.parentElement!, { key: 'ArrowDown' });
    fireEvent.keyDown(button.parentElement!, { key: 'ArrowDown' });
    // Enter로 선택
    fireEvent.keyDown(button.parentElement!, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith('popular');
  });
});
