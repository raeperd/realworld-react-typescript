import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import { HashRouter } from 'react-router-dom';
import Layout from './Layout';

describe('Header', () => {
  test('when render expect guest nav items with href', () => {
    render(<HashRouter><Layout> </Layout></HashRouter>);

    expect(screen.getByText('Home')).toHaveAttribute('href', '#/');
    expect(screen.getByText('Sign in')).toHaveAttribute('href', '#/login');
    expect(screen.getByText('Sign up')).toHaveAttribute('href', '#/register');
  });

  test('when click NavLinkListItem expect to activated', () => {
    render(<HashRouter><Layout> </Layout></HashRouter>);
    expectToBeActiveAlone('Home');

    fireEvent.click(screen.getByText('Sign in'));

    expectToBeActiveAlone('Sign in');
  });

  test('when render without login expect not to have logined user only nav items', () => {
    render(<HashRouter><Layout> </Layout></HashRouter>);

    expect(screen.queryByText('New Article')).not.toBeInTheDocument();
    expect(screen.queryByText('Settings')).not.toBeInTheDocument();
  });
});

test('when render expect footer exists', () => {
  const { container } = render(<HashRouter><Layout> </Layout></HashRouter>);

  expect(container.getElementsByClassName('attribution').length).toBe(1);
});

const expectToBeActiveAlone = (navItem: NavItem) => (
  NAV_ITEMS.forEach(
    (item) => {
      if (item === navItem) {
        expectToBeActive(item);
        return;
      }
      expectNotToBeActive(item);
    },
  )
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
