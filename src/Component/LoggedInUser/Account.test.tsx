import React from 'react';
import { render, screen } from '@testing-library/react';
import { Account } from './Account';

test('renders learn react link', () => {
  render(<Account/>);
  const linkElement = screen.getByText(/Update your personal information/i);
  expect(linkElement).toBeInTheDocument();
});
