import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import SignUpPage from './SignUpPage';
import {
  expectPlaceHoldersToBeInTheDocument,
  inputTextByPlaceHolderText,
  renderWithHistory, submitForm,
} from './LoginPage.test';
import { signUp, SignUpParam, User } from '../api/authentication';
import { HOME_PAGE_PATH } from './HomePage';

test('when render expect form with placeholders', () => {
  render(<SignUpPage />);

  expectPlaceHoldersToBeInTheDocument('Email', 'Your Name', 'Password');
});

test('when render expect password form input to have attribute type password', () => {
  const { getByPlaceholderText } = render(<SignUpPage />);

  expect(getByPlaceholderText('Password')).toHaveAttribute('type', 'password');
});

test('when submit expect signUp with values', () => {
  renderWithHistory(<SignUpPage />, createMemoryHistory());
  signUpMocked.mockResolvedValueOnce(userMocked);

  submitFormWith(signUpParamMocked);

  expect(signUpMocked).toBeCalledWith(signUpParamMocked);
});

test('when submit failed expect error message', () => {
  renderWithHistory(<SignUpPage />, createMemoryHistory());
  signUpMocked.mockRejectedValueOnce(new Error('Error'));

  submitForm();

  return waitFor(() => expect(screen.getByText('Register Failed')).toBeInTheDocument());
});

test('when login success expect history to have homepage path', () => {
  const history = createMemoryHistory();
  renderWithHistory(<SignUpPage />, history);
  signUpMocked.mockResolvedValueOnce(userMocked);

  submitForm();

  return waitFor(() => expect(history.location.pathname).toBe(HOME_PAGE_PATH));
});

jest.mock('../api/authentication');
const signUpMocked = signUp as jest.MockedFunction<typeof signUp>;

const submitFormWith = (param: SignUpParam) => {
  inputTextByPlaceHolderText('Email', param.email);
  inputTextByPlaceHolderText('Your Name', param.username);
  inputTextByPlaceHolderText('Password', param.password);
  submitForm();
};

const signUpParamMocked: SignUpParam = {
  email: 'user@email.com',
  password: 'password',
  username: 'user',
};

const userMocked: User = {
  email: '',
  username: '',
  token: '',
  bio: '',
};
