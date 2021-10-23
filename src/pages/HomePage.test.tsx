import { render, waitFor } from '@testing-library/react';
import React from 'react';
import HomePage from './HomePage';
import { getArticles } from '../api/article';
import { getTags } from '../api/tag';

jest.mock('../api/article');
const getArticlesMock = getArticles as jest.MockedFunction<typeof getArticles>;
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

describe('SideBar', () => {
  test('when render expect SideBar to be in the document', async () => {
    getArticlesMock.mockResolvedValueOnce([]);
    getTagsMock.mockResolvedValueOnce(['some-tag']);
    const { getByText } = render(<HomePage userLoggedIn={null} />);

    await waitFor(() => expect(getByText('Popular Tags')).toBeInTheDocument())
      .then(() => expect(getByText('some-tag')).toBeInTheDocument());
  });
});
