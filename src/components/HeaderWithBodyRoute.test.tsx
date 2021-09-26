import { fireEvent, render, screen } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import React from 'react';
import HeaderWithBodyRoute from './HeaderWithBodyRoute';

describe('Header', () => {
  test('when render expect guest nav items with href', () => {
    render(<HashRouter><HeaderWithBodyRoute /></HashRouter>);

    expect(screen.getByText('Home')).toHaveAttribute('href', '#/');
    expect(screen.getByText('Sign in')).toHaveAttribute('href', '#/login');
    expect(screen.getByText('Sign up')).toHaveAttribute('href', '#/register');
  });

  test('when click NavLinkListItem expect to activated', () => {
    render(<HashRouter><HeaderWithBodyRoute /></HashRouter>);
    expectToBeActiveAlone('Home');

    fireEvent.click(screen.getByText('Sign up'));

    expectToBeActiveAlone('Sign up');
  });

  test('when render without login expect not to have logined user only nav items', () => {
    render(<HashRouter><HeaderWithBodyRoute /></HashRouter>);

    expect(screen.queryByText('New Article')).not.toBeInTheDocument();
    expect(screen.queryByText('Settings')).not.toBeInTheDocument();
  });
});

const expectToBeActiveAlone = (navItem: NavItem) => NAV_ITEMS.forEach(
  (item) => {
    if (item === navItem) {
      expectToBeActive(item);
      return;
    }
    expectNotToBeActive(item);
  },
);

const NAV_ITEMS = ['Home', 'Sign in', 'Sign up'] as const;
type NavItem = (typeof NAV_ITEMS)[number]

const expectToBeActive = (navItem: NavItem) => (
  expect(screen.getByText(navItem)).toHaveClass(ACRIVE_CLASS_NAME)
);

const expectNotToBeActive = (navItem: NavItem) => (
  expect(screen.getByText(navItem)).not.toHaveClass(ACRIVE_CLASS_NAME)
);

const ACRIVE_CLASS_NAME = 'nav-link active';
