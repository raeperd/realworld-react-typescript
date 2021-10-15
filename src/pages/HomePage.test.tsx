import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import HomePage from './HomePage';
import { Article, feedArticles, getArticles } from '../api/article';
import { User } from '../api/authentication';
import { getTags } from '../api/tag';

jest.mock('../api/article');
const getArticlesMock = getArticles as jest.MockedFunction<typeof getArticles>;
const feedArticlesMock = feedArticles as jest.MockedFunction<typeof feedArticles>;
jest.mock('../api/tag');
const getTagsMock = getTags as jest.MockedFunction<typeof getTags>;

describe('Banner', () => {
  test('when render expect Banner to be in the document', async () => {
    getArticlesMock.mockResolvedValueOnce([]);
    getTagsMock.mockResolvedValueOnce([]);
    const { getByText } = render(<HomePage userLoggedIn={null} />);

    await waitFor(
      () => expect(getByText('A place to share your knowledge.')).toBeInTheDocument(),
    );
  });
});

describe('ArticleFeed', () => {
  const FEED_TEXT = 'Your Feed';

  test('when render before login expect feed to  not visible', async () => {
    getArticlesMock.mockResolvedValueOnce([articleMocked]);
    getTagsMock.mockResolvedValueOnce([]);
    const { queryByText, getByText } = render(<HomePage userLoggedIn={null} />);

    await waitFor(() => {
      expect(getArticlesMock).toBeCalledTimes(1);
      expect(getByText(articleMocked.title)).toBeInTheDocument();
    });

    expect(queryByText(FEED_TEXT)).not.toBeInTheDocument();
  });

  test('when render after login expect feed to visible', async () => {
    getArticlesMock.mockResolvedValueOnce([]);
    feedArticlesMock.mockResolvedValueOnce([articleMocked]);
    getTagsMock.mockResolvedValueOnce([]);
    const { getByText } = render(<HomePage userLoggedIn={userMocked} />);

    expect(getByText(FEED_TEXT)).toBeInTheDocument();

    fireEvent.click(getByText(FEED_TEXT));
    await waitFor(() => expect(feedArticlesMock).toBeCalledTimes(1))
      .then(() => expect(getByText(articleMocked.title)).toBeInTheDocument());
  });
});

describe('SideBar', () => {
  test('when render expect SideBar to be in the document', async () => {
    getArticlesMock.mockResolvedValueOnce([]);
    getTagsMock.mockResolvedValueOnce(['some-tag']);
    const { getByText } = render(<HomePage userLoggedIn={null} />);

    await waitFor(() => expect(getByText('Popular Tags')).toBeInTheDocument())
      .then(() => expect(getByText('some-tag')).toBeInTheDocument());
  });
});

const userMocked: User = {
  email: '',
  username: '',
  bio: '',
  token: '',
  image: null,
};

const articleMocked: Article = {
  title: 'title mocked',
  slug: 'slug',
  description: 'description',
  body: 'body',
  tagList: [],
  createdAt: '2016-02-18T03:22:56.637Z',
  updatedAt: '2016-02-18T03:22:56.637Z',
  favorited: false,
  favoritesCount: 0,
  author: {
    email: 'user@gmail.com',
    username: 'user',
    token: 'token',
    bio: null,
    image: null,
  },
};
