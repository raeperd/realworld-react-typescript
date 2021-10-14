import axios from './axiosClient';
import { Article, ArticleContents, createArticle, feedArticles, getArticles } from './article';

jest.mock('./axiosClient');
const axiosMocked = axios as jest.Mocked<typeof axios>;

describe('createArticle', () => {
  test('when createArticle expect post with url', () => {
    axiosMocked.post.mockResolvedValueOnce(axiosResponseWithData({ article: articleMocked }));

    return createArticle(articleContentsMock)
      .then(() => {
        expect(axiosMocked.post).toBeCalledWith('/articles', { article: articleContentsMock });
      });
  });

  test('when createArticle expect return article', () => {
    axiosMocked.post.mockResolvedValueOnce(axiosResponseWithData({ article: articleMocked }));

    return createArticle(articleContentsMock)
      .then((response) => { expect(response).toStrictEqual(articleMocked); });
  });
});

describe('getArticles', () => {
  test('when getArticles expect get with url', () => {
    axiosMocked.get.mockResolvedValueOnce(axiosResponseWithData({ articles: [articleMocked] }));

    return getArticles()
      .then(() => expect(axiosMocked.get).toBeCalledWith('/articles', { params: undefined }));
  });

  test('when getArticles with params expect get with params', () => {
    axiosMocked.get.mockResolvedValueOnce(axiosResponseWithData({ articles: [articleMocked] }));

    return getArticles({ tag: 'react' })
      .then(() => expect(axiosMocked.get).toBeCalledWith('/articles', { params: { tag: 'react' } }));
  });

  test('when getArticles expect return articles', () => {
    axiosMocked.get.mockResolvedValueOnce(axiosResponseWithData({ articles: [articleMocked] }));

    return getArticles()
      .then((response) => expect(response).toStrictEqual([articleMocked]));
  });
});

describe('feedArticles', () => {
  test('when feedArticles expect get with url', () => {
    axiosMocked.get.mockResolvedValueOnce(axiosResponseWithData({ articles: [articleMocked] }));

    return feedArticles()
      .then(() => expect(axiosMocked.get).toBeCalledWith('/articles/feed', { params: undefined }));
  });

  test('when feedArticles with params expect get with params', () => {
    axiosMocked.get.mockResolvedValueOnce(axiosResponseWithData({ articles: [articleMocked] }));

    return feedArticles({ limit: 20 })
      .then(() => expect(axiosMocked.get).toBeCalledWith('/articles/feed', { params: { limit: 20 } }));
  });

  test('when feedArticles expect return articles', () => {
    axiosMocked.get.mockResolvedValueOnce(axiosResponseWithData({ articles: [articleMocked] }));

    return feedArticles()
      .then((response) => expect(response).toStrictEqual([articleMocked]));
  });
});

const articleContentsMock: ArticleContents = {
  title: 'title',
  description: 'description',
  body: 'body',
  tagList: [],
};

export const articleMocked: Article = {
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

export const axiosResponseWithData = (data: any) => ({
  data,
  status: 201,
  statusText: '',
  config: {},
});
