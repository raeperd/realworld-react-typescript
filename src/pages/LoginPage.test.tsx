import React from 'react';
import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import LogInPage from './LogInPage';
import { login, User } from '../api/authentication';
import { HOME_PAGE_PATH } from './HomePage';

test('when render expect form with placeholders', () => {
  render(<LogInPage />);

  expectPlaceHoldersToBeInTheDocument('Email', 'Password');
});

test('when render expect password form input to have attribute type password', () => {
  const { getByPlaceholderText } = render(<LogInPage />);

  expect(getByPlaceholderText('Password')).toHaveAttribute('type', 'password');
});

test('when click button expect login with values', () => {
  renderWithHistory(<LogInPage />, createMemoryHistory());
  loginMock.mockResolvedValueOnce(userMocked);

  submitFormWith({ email: 'user@email.com', password: 'password' });

  expect(loginMock).toBeCalledWith('user@email.com', 'password');
});

test('when login failed expect error message', () => {
  const { queryByText, getByText } = render(<LogInPage />);
  expect(queryByText('Login Failed')).not.toBeInTheDocument();

  loginMock.mockRejectedValue(new Error());
  submitForm();

  return waitFor(() => expect(getByText('Login Failed')).toBeInTheDocument());
});

test('when login success expect history to have homepage path', () => {
  const history = createMemoryHistory();
  renderWithHistory(<LogInPage />, history);

  loginMock.mockResolvedValueOnce(userMocked);
  submitForm();

  expect(history.location.pathname).toBe(HOME_PAGE_PATH);
});

jest.mock('../api/authentication');
const loginMock = login as jest.MockedFunction<typeof login>;

export const expectPlaceHoldersToBeInTheDocument = (...args: string[]) => {
  args.forEach(
    (placeHolder) => expect(screen.getByPlaceholderText(placeHolder)).toBeInTheDocument(),
  );
};

export const renderWithHistory = (reactNode: React.ReactNode, history: MemoryHistory) => render(
  <Router history={history}>
    {reactNode}
  </Router>,
);

export const submitForm = () => fireEvent.click(screen.getByRole('button'));

export const inputTextByPlaceHolderText = (placeHolder: string, text: string) => {
  const input = screen.getByPlaceholderText(placeHolder);
  fireEvent.change(input, { target: { value: text } });
};

const submitFormWith = ({ email, password }: LoginFormParam) => {
  inputTextByPlaceHolderText('Email', email);
  inputTextByPlaceHolderText('Password', password);
  return submitForm();
};

interface LoginFormParam {
  email: string,
  password: string
}

const userMocked: User = {
  email: '',
  username: '',
  token: '',
  bio: '',
};
