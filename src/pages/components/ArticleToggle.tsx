import React, { useEffect, useState } from 'react';
import { NavButtonListItem } from './NavListItem';
import { Article } from '../../api/article';

export default <T extends string>({ feeds, onClickFeed }: ArticleToggleProps<T>) => {
  const [feedActive, setFeedActive] = useState(feeds[0]);
  const [feedToArticles, setFeedToArticles] = useState(() => feeds.reduce(
    (acc, current) => ({ ...acc, [current]: [] }), {} as Record<string, Article[]>,
  ));

  useEffect(() => {
    feeds.forEach((feed) => onClickFeed(feed)
      .then((articles) => setFeedToArticles({ ...feedToArticles, [feed]: articles })));
    return () => setFeedToArticles({});
  }, [feeds, onClickFeed]);

  return (
    <>
      <ArticleToggleNavBar feedActivated={feedActive} feeds={feeds} onFeedClick={setFeedActive} />
      {feedToArticles[feedActive]?.map((article) => (
        <ArticlePreview
          key={`${article.author} ${article.title}`}
          article={article}
        />
      ))}
    </>
  );
};

interface ArticleToggleProps<T extends string> {
  readonly feeds: T[]
  readonly onClickFeed: (feed: T) => Promise<Article[]>
}

interface ArticleToggleNavBarProps<T extends string> {
  readonly feedActivated: T
  readonly feeds: T[]
  readonly onFeedClick: (feed: T) => void
}

const ArticleToggleNavBar = <T extends string>
  ({ feedActivated, feeds, onFeedClick } : ArticleToggleNavBarProps<T>) => (
    <div className="feed-toggle">
      <ul className="nav nav-pills outline-active">
        {feeds.map((feed) => (
          <NavButtonListItem key={feed} activated={feedActivated === feed} onClick={() => onFeedClick(feed)}>
            {feed}
          </NavButtonListItem>
        ))}
      </ul>
    </div>
  );

const ArticlePreview = ({ article }: { article: Article }) => (
  <div className="article-preview">
    <div className="article-meta">
      <a href="profile.html"><img src={article.author.image ?? undefined} alt="profile" /></a>
      <div className="info">
        <a href="/" className="author">{article.author.username}</a>
        <span className="date">{article.createdAt}</span>
      </div>
      <button type="button" className="btn btn-outline-primary btn-sm pull-xs-right">
        <i className="ion-heart" />
        {` ${article.favoritesCount}`}
      </button>
    </div>
    <a href="/" className="preview-link">
      <h1>{article.title}</h1>
      <p>{article.description}</p>
      <span>Read more...</span>
    </a>
  </div>
);
