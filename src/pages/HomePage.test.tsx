import { render, screen } from '@testing-library/react';
import React from 'react';
import HomePage from './HomePage';

test('when render expect Banner to be in the document', () => {
  render(<HomePage />);

  expect(screen.getByText('A place to share your knowledge.')).toBeInTheDocument();
});

test('when render expect SideBar to be in the document', () => {
  render(<HomePage />);

  expect(screen.getByText('Popular Tags')).toBeInTheDocument();
});
