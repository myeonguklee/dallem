import { render, screen } from '@testing-library/react';
import HomePage from './page';

describe('Home Page', () => {
  it('renders home page text', () => {
    render(<HomePage />);

    const text = screen.getByText('홈페이지');
    expect(text).toBeInTheDocument();
  });
});
