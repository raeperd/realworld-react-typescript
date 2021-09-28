import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import SignUpPage from './SignUpPage';
import {
  expectPlaceHoldersToBeInTheDocument,
  inputTextByPlaceHolderText,
  submitForm,
} from './LoginPage.test';
import { signUp, SignUpParam, User } from '../api/authentication';

test('when render expect form with placeholders', () => {
  render(<SignUpPage onSignUpSuccess={onSignUpSuccessMocked} />);

  expectPlaceHoldersToBeInTheDocument('Email', 'Your Name', 'Password');
});

test('when render expect password form input to have attribute type password', () => {
  const { getByPlaceholderText } = render(<SignUpPage onSignUpSuccess={onSignUpSuccessMocked} />);

  expect(getByPlaceholderText('Password')).toHaveAttribute('type', 'password');
});

test('when submit expect signUp with values', () => {
  render(<SignUpPage onSignUpSuccess={onSignUpSuccessMocked} />);
  signUpMocked.mockResolvedValueOnce(userMocked);

  submitFormWith(signUpParamMocked);

  return waitFor(() => expect(signUpMocked).toBeCalledWith(signUpParamMocked));
});

test('when signUp failed expect error message', () => {
  render(<SignUpPage onSignUpSuccess={onSignUpSuccessMocked} />);
  signUpMocked.mockRejectedValueOnce(new Error('Error'));

  submitForm();

  return waitFor(() => expect(screen.getByText('Register Failed')).toBeInTheDocument());
});

test('when signUp failed expect onSignUpSuccess not called', () => {
  render(<SignUpPage onSignUpSuccess={onSignUpSuccessMocked} />);
  signUpMocked.mockRejectedValueOnce(new Error('Error'));

  submitForm();

  return waitFor(() => expect(onSignUpSuccessMocked).not.toBeCalled());
});

test('when signUp success expect onSignUpSuccess called', () => {
  render(<SignUpPage onSignUpSuccess={onSignUpSuccessMocked} />);
  signUpMocked.mockResolvedValueOnce(userMocked);

  submitFormWith(signUpParamMocked);

  return waitFor(() => expect(onSignUpSuccessMocked).toBeCalledWith(userMocked));
});

jest.mock('../api/authentication');
const signUpMocked = signUp as jest.MockedFunction<typeof signUp>;
const onSignUpSuccessMocked = jest.fn();

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
  image: null,
};
