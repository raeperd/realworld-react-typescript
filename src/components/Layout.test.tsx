import React from 'react';
import { render, screen } from '@testing-library/react';

import Layout from './Layout';

test('when render expect guest nav items', () => {
  render(<Layout> </Layout>);

  expect(screen.getByText('Home')).toBeInTheDocument();
  expect(screen.getByText('Sign up')).toBeInTheDocument();
  expect(screen.getByText('Sign in')).toBeInTheDocument();
});

test('when render without login expect not to have logined user only nav items', () => {
  render(<Layout> </Layout>);

  expect(screen.queryByText('New Article')).not.toBeInTheDocument();
  expect(screen.queryByText('Settings')).not.toBeInTheDocument();
});
