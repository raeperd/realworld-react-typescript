import axios from './axiosClient';
import { User } from './authentication';

export function createArticle(articleContents: ArticleContents): Promise<Article> {
  return axios.post<ArticleResponseDTO>('/articles', { article: articleContents })
    .then((response) => response.data.article);
}

export function getArticles(queryParameter?: ArticlesQueryParameter): Promise<Article[]> {
  return axios.get<MultipleArticleResponseDTO>('/articles', { params: queryParameter })
    .then((response) => response.data.articles);
}

export function feedArticles(queryParameter?: PaginationParameter): Promise<Article[]> {
  return axios.get<MultipleArticleResponseDTO>('/articles/feed', { params: queryParameter })
    .then((response) => response.data.articles);
}

export function favoriteArticle(article: Article): Promise<Article> {
  return axios.post<ArticleResponseDTO>(`/articles/${article.slug}/favorite`)
    .then((response) => response.data.article);
}

interface ArticlesQueryParameter extends PaginationParameter{
  tag? : string,
  author?: string,
  favorited?: string,
}
interface PaginationParameter {
  limit?: number,
  offset?: number
}

interface ArticleResponseDTO {
  article: Article
}
interface MultipleArticleResponseDTO {
  articles: Article[]
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
