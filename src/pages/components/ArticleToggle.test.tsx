import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import { Article, favoriteArticle } from '../../api/article';
import ArticleToggle from './ArticleToggle';

describe('ArticleToggleNavBar', () => {
  test('when render expect to call onClickFeed', async () => {
    const handleClickFeedMock = jest.fn()
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([articleMocked]);
    const { getByText, queryByText } = render(<ArticleToggle
      feeds={['feed1', 'feed2']}
      onClickFeed={handleClickFeedMock}
    />);

    await waitFor(() => {
      expect(handleClickFeedMock).toBeCalledTimes(2);
      expect(handleClickFeedMock).toHaveBeenNthCalledWith(1, 'feed1');
      expect(handleClickFeedMock).toHaveBeenNthCalledWith(2, 'feed2');
    });

    expect(queryByText(articleMocked.title)).not.toBeInTheDocument();

    fireEvent.click(getByText('feed2'));

    expect(getByText(articleMocked.title)).toBeInTheDocument();
  });
});

jest.mock('../../api/article');
const favoriteArticleMock = favoriteArticle as jest.MockedFunction<typeof favoriteArticle>;

describe('ArticlePreview', () => {
  test('when click favorites expect to call favoriteArticle', async () => {
    const handleClickFeedMock = jest.fn().mockResolvedValueOnce([articleMocked]);
    favoriteArticleMock.mockResolvedValueOnce(articleMocked);
    const { getByText } = render(<ArticleToggle feeds={['feed1']} onClickFeed={handleClickFeedMock} />);

    await waitFor(() => fireEvent.click(getByText(articleMocked.favoritesCount)))
      .then(() => {
        expect(favoriteArticleMock).toHaveBeenCalledTimes(1);
        expect(favoriteArticleMock).toHaveBeenCalledWith(articleMocked);
      });
  });
});

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
