import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import EditorPage from './EditorPage';
import { expectPlaceHoldersToBeInTheDocument } from './LoginPage.test';
import { Article, createArticle } from '../api/article';

test('when render expect with placeholders', () => {
  render(<EditorPage />);

  expectPlaceHoldersToBeInTheDocument(
    TITLE_PLACEHOLDER,
    DESCRIPTION_PLACEHOLDER,
    BODY_PLACEHOLDER,
    TAG_LIST_PLACEHOLDER,
  );
});

test('when input text expect values changed', () => {
  const { getByPlaceholderText } = render(<EditorPage />);

  fireEvent.change(getByPlaceholderText(TITLE_PLACEHOLDER), { target: { value: 'title' } });

  expect(getByPlaceholderText(TITLE_PLACEHOLDER)).toHaveValue('title');
});

test('when click button expect createArticle', () => {
  const { getByRole } = render(<EditorPage />);
  createArticleMock.mockResolvedValueOnce(ARTICLE_MOCKED);

  fireEvent.click(getByRole('button'));

  return waitFor(() => expect(createArticleMock).toBeCalledTimes(1));
});

const TITLE_PLACEHOLDER = 'Article Title';
const DESCRIPTION_PLACEHOLDER = 'What\'s this article about?';
const BODY_PLACEHOLDER = 'Write your article (in markdown)';
const TAG_LIST_PLACEHOLDER = 'Enter tags';

jest.mock('../api/article');
const createArticleMock = createArticle as jest.MockedFunction<typeof createArticle>;

const ARTICLE_MOCKED: Article = {
  title: '',
  description: '',
  body: '',
  tagList: [],
  author: {
    email: '',
    username: '',
    token: '',
    bio: '',
    image: null,
  },
  slug: '',
  createdAt: '',
  favorited: false,
  favoritesCount: 0,
  updatedAt: '',
};
