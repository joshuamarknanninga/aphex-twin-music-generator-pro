// src/App.test.js
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Aphex Twin Music Generator Pro/i);
  expect(headerElement).toBeInTheDocument();
});
