import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import ProfilePage from './ProfilePage';
import { User } from '../api/authentication';
import { getArticles } from '../api/article';
import { followUser, Profile } from '../api/user';

jest.mock('../api/article');
const getArticlesMock = getArticles as jest.MockedFunction<typeof getArticles>;
jest.mock('../api/user');
const followUserMock = followUser as jest.MockedFunction<typeof followUser>;

describe('UserInfo', () => {
  test('when render expect user info rendered', async () => {
    getArticlesMock
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([]);
    const { getByText } = render(<ProfilePage user={userMock} />);

    await waitFor(
      () => {
        expect(getByText(userMock.username))
          .toBeInTheDocument();
        expect(getByText(userMock.bio || 'null'))
          .toBeInTheDocument();
      },
    );
  });

  test('when click follow button expect followUser called', async () => {
    getArticlesMock
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([]);
    followUserMock.mockResolvedValueOnce(profileMock);
    const { getByText } = render(<ProfilePage user={userMock} />);

    fireEvent.click(getByText(`Follow ${userMock.username}`));

    await waitFor(() => expect(followUserMock).toBeCalledTimes(1));
  });
});

const userMock: User = {
  email: 'user@gmail.com',
  username: 'name',
  token: 'token',
  bio: 'some bio',
  image: 'some image',
};

const profileMock: Profile = {
  bio: 'bio',
  following: true,
  image: 'image',
  username: 'username',
};
