import { render, screen } from '@testing-library/react';
import { InputTextarea } from './InputTextarea';

describe('InputTextarea', () => {
  it('renders with placeholder', () => {
    render(<InputTextarea placeholder="내용을 입력하세요..." />);
    expect(screen.getByPlaceholderText('내용을 입력하세요...')).toBeInTheDocument();
  });

  it('applies disabled prop', () => {
    render(<InputTextarea disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('applies state="disabled" and disables textarea', () => {
    render(<InputTextarea state="disabled" />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeDisabled();
    expect(textarea).toHaveClass('cursor-not-allowed'); // cva에서 disabled state 적용 확인
  });

  it('merges external className', () => {
    render(<InputTextarea className="text-pink-500" />);
    expect(screen.getByRole('textbox')).toHaveClass('text-pink-500');
  });
});
