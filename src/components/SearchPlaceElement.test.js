import { render, screen } from '@testing-library/react';
import SearchPlaceElement from './SearchPlaceElement'

test('renders a search button', () => {
  render(<SearchPlaceElement />);
  const buttonElement = screen.getByText(/Hledej/i);
  expect(buttonElement).toBeInTheDocument();
});

test('1 + 1 = 2', () => {
  expect(1 + 1).toEqual(2);
});