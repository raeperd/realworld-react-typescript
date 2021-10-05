import axios from './axiosClient';
import { User } from './authentication';

export const createArticle = (articleContents: ArticleContents) => (
  axios.post<Article>('/articles', { article: articleContents })
    .then((response) => response.data));

export interface ArticleContents {
  title: string,
  description: string,
  body: string,
  tagList: string[],
}

export interface Article extends ArticleContents{
  slug: string,
  createdAt: string,
  updatedAt: string,
  favorited: boolean,
  favoritesCount: number,
  author: User
}
