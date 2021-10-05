import { AxiosResponse } from 'axios';
import axios from './axiosClient';
import { Article, ArticleContents, createArticle } from './article';

jest.mock('./axiosClient');
const axiosMocked = axios as jest.Mocked<typeof axios>;

describe('createArticle', () => {
  test('when createArticle expect post with url', () => {
    axiosMocked.post.mockResolvedValue(axiosResponse);

    return createArticle(articleContentsMock)
      .then(() => {
        expect(axiosMocked.post).toBeCalledWith('/articles', { article: articleContentsMock });
      });
  });

  test('when createArticle expect return article', () => {
    axiosMocked.post.mockResolvedValue(axiosResponse);

    return createArticle(articleContentsMock)
      .then((response) => { expect(response).toBe(axiosResponse.data); });
  });
});

const articleContentsMock: ArticleContents = {
  title: 'title',
  description: 'description',
  body: 'body',
  tagList: [],
};

const articleMocked: Article = {
  title: 'title',
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

const axiosResponse: AxiosResponse = {
  data: articleMocked,
  status: 201,
  statusText: '',
  headers: undefined,
  config: {},
};
