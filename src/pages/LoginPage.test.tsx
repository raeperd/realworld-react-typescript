import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import LogInPage from './LogInPage';
import { login, User } from '../api/authentication';

test('when render expect form with placeholders', () => {
  render(<LogInPage onLoginSuccess={onLoginSuccessMock} />);

  expectPlaceHoldersToBeInTheDocument('Email', 'Password');
});

test('when render expect password form input to have attribute type password', () => {
  const { getByPlaceholderText } = render(<LogInPage onLoginSuccess={onLoginSuccessMock} />);

  expect(getByPlaceholderText('Password')).toHaveAttribute('type', 'password');
});

test('when click button expect login with values', () => {
  render(<LogInPage onLoginSuccess={onLoginSuccessMock} />);
  loginMock.mockResolvedValueOnce(userMocked);

  submitFormWith({ email: 'user@email.com', password: 'password' });

  expect(loginMock).toBeCalledWith('user@email.com', 'password');
});

test('when login failed expect error message', () => {
  const { queryByText, getByText } = render(<LogInPage onLoginSuccess={onLoginSuccessMock} />);
  expect(queryByText('Login Failed')).not.toBeInTheDocument();
  loginMock.mockRejectedValue(new Error());

  submitForm();

  return waitFor(() => expect(getByText('Login Failed')).toBeInTheDocument());
});

test('when login failed expect onLoginSuccess not called', () => {
  render(<LogInPage onLoginSuccess={onLoginSuccessMock} />);
  loginMock.mockRejectedValue(new Error());

  submitForm();

  return waitFor(() => expect(onLoginSuccessMock).not.toBeCalled());
});

test('when login success expect onLoginSuccessMock called', () => {
  render(<LogInPage onLoginSuccess={onLoginSuccessMock} />);
  loginMock.mockResolvedValueOnce(userMocked);

  submitForm();

  return waitFor(() => expect(onLoginSuccessMock).toBeCalledWith(userMocked));
});

jest.mock('../api/authentication');
const loginMock = login as jest.MockedFunction<typeof login>;

const onLoginSuccessMock = jest.fn();

export const expectPlaceHoldersToBeInTheDocument = (...args: string[]) => {
  args.forEach(
    (placeHolder) => expect(screen.getByPlaceholderText(placeHolder)).toBeInTheDocument(),
  );
};

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
  image: null,
};
