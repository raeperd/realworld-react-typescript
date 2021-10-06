import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import SettingsPage from './SettingsPage';
import { expectPlaceHoldersToBeInTheDocument } from './LoginPage.test';
import { updateUser } from '../api/user';
import { User } from '../api/authentication';

test('when render settings page expect with placeholders', () => {
  render(<SettingsPage user={USER_MOCKED} />);

  expectPlaceHoldersToBeInTheDocument(
    IMAGE_PLACEHOLDER,
    USERNAME_PLACEHOLDER,
    BIO_PLACEHOLDER,
    EMAIL_PLACEHOLDER,
    PASSWORD_PLACEHOLDER,
  );
});

test('when input text changed in settings page expect values changed', () => {
  const { getByPlaceholderText } = render(<SettingsPage user={USER_MOCKED} />);

  fireEvent.change(getByPlaceholderText(IMAGE_PLACEHOLDER), { target: { value: 'image changed' } });

  expect(getByPlaceholderText(IMAGE_PLACEHOLDER)).toHaveValue('image changed');
});

test('when click button expect updateUser called', () => {
  const { getByRole } = render(<SettingsPage user={USER_MOCKED} />);
  updateUserMock.mockResolvedValueOnce(USER_MOCKED);

  fireEvent.click(getByRole('button'));

  return waitFor(() => expect(updateUserMock).toBeCalledTimes(1));
});

jest.mock('../api/user');
const updateUserMock = updateUser as jest.MockedFunction<typeof updateUser>;

const USER_MOCKED: User = {
  email: 'email',
  token: 'token',
  username: 'username',
  image: 'image',
  bio: 'bio',
};

const IMAGE_PLACEHOLDER = 'URL of profile picture';
const USERNAME_PLACEHOLDER = 'Your Name';
const BIO_PLACEHOLDER = 'Short bio about you';
const EMAIL_PLACEHOLDER = 'Email';
const PASSWORD_PLACEHOLDER = 'Password';
