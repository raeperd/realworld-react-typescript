import { fireEvent, render, screen } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import React from 'react';
import HeaderWithBodyRoute from './HeaderWithBodyRoute';
import { getCurrentUserOrNull, User } from '../../api/authentication';
import { EDITOR_PAGE_PATH } from '../EditorPage';
import { HOME_PAGE_PATH } from '../HomePage';
import { SETTINGS_PAGE_PATH } from '../SettingsPage';
import { LOGIN_PAGE_PATH } from '../LogInPage';
import { SIGNUP_PAGE_PATH } from '../SignUpPage';

describe('Header', () => {
  test('when render expect guest nav items with href', () => {
    getCurrentUserOrNullMocked.mockReturnValueOnce(null);
    render(<HashRouter><HeaderWithBodyRoute /></HashRouter>);

    expect(screen.getByText('Home')).toHaveAttribute('href', `#${HOME_PAGE_PATH}`);
    expect(screen.getByText('Sign in')).toHaveAttribute('href', `#${LOGIN_PAGE_PATH}`);
    expect(screen.getByText('Sign up')).toHaveAttribute('href', `#${SIGNUP_PAGE_PATH}`);
  });

  test('when click NavLinkListItem expect to activated', () => {
    getCurrentUserOrNullMocked.mockReturnValueOnce(null);
    render(<HashRouter><HeaderWithBodyRoute /></HashRouter>);
    expectToBeActiveAlone('Home');

    fireEvent.click(screen.getByText('Sign up'));

    expectToBeActiveAlone('Sign up');
  });

  test('when render without login expect not to have loggedIn user only nav items', () => {
    getCurrentUserOrNullMocked.mockReturnValueOnce(null);
    render(<HashRouter><HeaderWithBodyRoute /></HashRouter>);

    expect(screen.queryByText('New Article')).not.toBeInTheDocument();
    expect(screen.queryByText('Settings')).not.toBeInTheDocument();
  });

  test('when user loggedIn expect return user nav items with href', () => {
    getCurrentUserOrNullMocked.mockReturnValueOnce(USER_MOCKED);
    render(<HashRouter><HeaderWithBodyRoute /></HashRouter>);

    expect(screen.getByText('Home')).toHaveAttribute('href', `#${HOME_PAGE_PATH}`);
    expect(screen.getByText('New Post')).toHaveAttribute('href', `#${EDITOR_PAGE_PATH}`);
    expect(screen.getByText('Settings')).toHaveAttribute('href', `#${SETTINGS_PAGE_PATH}`);
  });
});

jest.mock('../../api/authentication');
const getCurrentUserOrNullMocked = getCurrentUserOrNull as
  jest.MockedFunction<typeof getCurrentUserOrNull>;

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
  expect(screen.getByText(navItem)).toHaveClass(ACTIVE_CLASS_NAME)
);

const expectNotToBeActive = (navItem: NavItem) => (
  expect(screen.getByText(navItem)).not.toHaveClass(ACTIVE_CLASS_NAME)
);

const ACTIVE_CLASS_NAME = 'nav-link active';

const USER_MOCKED: User = {
  username: '',
  email: '',
  token: '',
  bio: null,
  image: null,
};
