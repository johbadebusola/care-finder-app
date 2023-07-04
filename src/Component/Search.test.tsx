import React from 'react';
import { render, screen } from '@testing-library/react';
import Search from './Search';


test('renders learn react link', () => {
  render(<Search/>);
  const linkElement = screen.getByText(/Search by Hospital name or Location/i);
  expect(linkElement).toBeInTheDocument();
});
