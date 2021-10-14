import React from 'react';
import { HashRouter } from 'react-router-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import HeaderWithBodyRoute from './HeaderWithBodyRoute';
import { getCurrentUserOrNull, User } from '../../api/authentication';
import { EDITOR_PAGE_PATH } from '../EditorPage';
import { HOME_PAGE_PATH } from '../HomePage';
import { SETTINGS_PAGE_PATH } from '../SettingsPage';
import { LOGIN_PAGE_PATH } from '../LogInPage';
import { SIGNUP_PAGE_PATH } from '../SignUpPage';
import { getArticles } from '../../api/article';

jest.mock('../../api/article');
const getArticlesMock = getArticles as jest.MockedFunction<typeof getArticles>;
jest.mock('../../api/authentication');
const getCurrentUserOrNullMocked = getCurrentUserOrNull as jest.MockedFunction<typeof getCurrentUserOrNull>;

afterEach(() => jest.resetAllMocks());

describe('Header', () => {
  test('when render expect guest nav items with href', async () => {
    getCurrentUserOrNullMocked.mockReturnValueOnce(null);
    getArticlesMock.mockResolvedValueOnce([]);
    const { getByText, queryByText } = render(<HashRouter><HeaderWithBodyRoute /></HashRouter>);

    expect(getByText('Home')).toHaveAttribute('href', `#${HOME_PAGE_PATH}`);
    expect(getByText('Sign in')).toHaveAttribute('href', `#${LOGIN_PAGE_PATH}`);
    expect(getByText('Sign up')).toHaveAttribute('href', `#${SIGNUP_PAGE_PATH}`);

    expect(queryByText('New Article')).not.toBeInTheDocument();
    expect(queryByText('Settings')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('Sign up'));
    await waitFor(
      () => expect(getByText('Sign up')).toHaveClass('active'),
    );
  });
});

test('when user loggedIn expect return user nav items with href', async () => {
  getCurrentUserOrNullMocked.mockReturnValueOnce(USER_MOCKED);
  getArticlesMock.mockResolvedValueOnce([]);
  const { getByText } = render(<HashRouter><HeaderWithBodyRoute /></HashRouter>);

  await waitFor(() => {
    expect(getByText('Home')).toHaveAttribute('href', `#${HOME_PAGE_PATH}`);
    expect(getByText('New Post')).toHaveAttribute('href', `#${EDITOR_PAGE_PATH}`);
    expect(getByText('Settings')).toHaveAttribute('href', `#${SETTINGS_PAGE_PATH}`);
  });
});

const USER_MOCKED: User = {
  username: '',
  email: '',
  token: '',
  bio: null,
  image: null,
};
