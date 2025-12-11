import { render, screen } from '@testing-library/react';
import App from './App';

test('renders welcome prompt', () => {
  render(<App />);
  const heading = screen.getByText(/Sur quoi travaillez-vous/i);
  expect(heading).toBeInTheDocument();
});
