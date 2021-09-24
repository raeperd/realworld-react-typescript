import React from 'react';
import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import LogInPage from './LogInPage';
import { login, User } from '../api/authentication';
import { HOME_PAGE_PATH } from './HomePage';

jest.mock('../api/authentication');

const mockLogin = login as jest.MockedFunction<typeof login>;

test('when render expect form with placeholders', () => {
  const { getByPlaceholderText } = render(<LogInPage />);

  expect(getByPlaceholderText('Email')).toBeInTheDocument();
  expect(getByPlaceholderText('Password')).toBeInTheDocument();
});

test('when render expect password form input to have attribute type password', () => {
  const { getByPlaceholderText } = render(<LogInPage />);

  expect(getByPlaceholderText('Password')).toHaveAttribute('type', 'password');
});

test('when click button expect login with values', () => {
  const { getByRole } = render(
    <Router history={createMemoryHistory()}>
      <LogInPage />
    </Router>,
  );
  inputTextByPlaceHolderText('Email', 'user@email.com');
  inputTextByPlaceHolderText('Password', 'password');

  mockLogin.mockResolvedValueOnce(userMocked);
  fireEvent.click(getByRole('button'));

  expect(mockLogin).toBeCalledWith('user@email.com', 'password');
});

test('when login failed expect error message', () => {
  const { getByRole } = render(<LogInPage />);

  mockLogin.mockRejectedValue(new Error());
  fireEvent.click(getByRole('button'));

  return waitFor(() => expect(screen.getByText('Login Failed')).toBeInTheDocument());
});

test('when login success expect history to have homepage path', () => {
  const history = createMemoryHistory();
  const { getByRole } = render(
    <Router history={history}>
      <LogInPage />
    </Router>,
  );

  mockLogin.mockResolvedValueOnce(userMocked);
  fireEvent.click(getByRole('button'));

  expect(history.location.pathname).toBe(HOME_PAGE_PATH);
});

const inputTextByPlaceHolderText = (placeHolder: string, text: string) => {
  const input = screen.getByPlaceholderText(placeHolder);
  fireEvent.change(input, { target: { value: text } });
};

const userMocked: User = {
  email: '',
  username: '',
  token: '',
  bio: '',
};
