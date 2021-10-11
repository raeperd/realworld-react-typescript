import axios from './axiosClient';
import { User } from './authentication';

export const createArticle = (articleContents: ArticleContents) => (
  axios.post<ArticleResponseDTO>('/articles', { article: articleContents }))
  .then((response) => response.data.article);

interface ArticleResponseDTO {
  article: Article
}

export interface Article extends ArticleContents{
  slug: string,
  createdAt: string,
  updatedAt: string,
  favorited: boolean,
  favoritesCount: number,
  author: User
}

export interface ArticleContents {
  title: string,
  description: string,
  body: string,
  tagList: string[],
}
