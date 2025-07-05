import { render, screen } from '@testing-library/react';
import Page from './page';

describe('Home Page', () => {
  it('renders get started text', () => {
    render(<Page />);

    const text = screen.getByText(/get started by editing/i);
    expect(text).toBeInTheDocument();
  });
});
