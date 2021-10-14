import React, { useEffect, useState } from 'react';
import { User } from '../api/authentication';
import { NavButtonListItem } from './components/NavListItem';
import { Article, feedArticles, getArticles } from '../api/article';

export default ({ userLoggedIn }: {userLoggedIn: User | null}) => (
  <div className="home-page">
    <Banner />
    <div className="container page">
      <div className="row">
        <div className="col-md-9">
          <ArticleFeed userLoggedIn={userLoggedIn} />
        </div>
        <div className="col-md-3">
          <TagSideBar />
        </div>
      </div>
    </div>
  </div>
);

export const HOME_PAGE_PATH = '/';

const Banner = () => (
  <div className="banner">
    <div className="container">
      <h1 className="logo-font">conduit</h1>
      <p>A place to share your knowledge.</p>
    </div>
  </div>
);

const ArticleFeed = ({ userLoggedIn }: {userLoggedIn: User | null }) => {
  const [feedActive, setFeedActive] = useState<'global' | 'user'>('global');
  const [articlesGlobal, setArticlesGlobal] = useState<Article[]>([]);
  const [articlesUserFeed, setArticlesUserFeed] = useState<Article[] | undefined>(undefined);

  useEffect(() => {
    getArticles()
      .then((articles) => setArticlesGlobal(articles));
    return () => setArticlesGlobal([]);
  }, []);

  function handleClickUserFeed() {
    setFeedActive('user');
    if (!articlesUserFeed) {
      feedArticles()
        .then((articles) => setArticlesUserFeed(articles));
    }
  }

  return (
    <>
      <ArticleFeedNavBar
        isUserLoggedIn={userLoggedIn !== null}
        feedActive={feedActive}
        onClickGlobalFeed={() => setFeedActive('global')}
        onClickUserFeed={() => handleClickUserFeed()}
      />
      {feedActive === 'global'
        ? articlesGlobal.map((article) => (
          <ArticlePreview
            key={article.title + article.author.username}
            article={article}
          />
        ))
        : articlesUserFeed?.map((article) => (
          <ArticlePreview
            key={article.title + article.author.username}
            article={article}
          />
        ))}
    </>
  );
};

const ArticleFeedNavBar = ({ isUserLoggedIn, feedActive, onClickGlobalFeed, onClickUserFeed }:
  FeedNavBarProps) => (
    <div className="feed-toggle">
      <ul className="nav nav-pills outline-active">
        <NavButtonListItem activated={feedActive === 'global'} onClick={onClickGlobalFeed}>
          Global Feed
        </NavButtonListItem>
        { isUserLoggedIn && (
        <NavButtonListItem activated={feedActive === 'user'} onClick={onClickUserFeed}>
          Your Feed
        </NavButtonListItem>
        )}
      </ul>
    </div>
);

type FeedNavBarProps = {
  isUserLoggedIn: boolean,
  feedActive: 'global' | 'user',
  onClickGlobalFeed: () => void,
  onClickUserFeed: () => void
}

const ArticlePreview = ({ article }: {article: Article}) => (
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

const TagSideBar = () => (
  <div className="sidebar">
    <p>Popular Tags</p>

    <div className="tag-list">
      <a href="index.html" className="tag-pill tag-default">programming</a>
      <a href="index.html" className="tag-pill tag-default">javascript</a>
      <a href="index.html" className="tag-pill tag-default">emberjs</a>
      <a href="index.html" className="tag-pill tag-default">angularjs</a>
      <a href="index.html" className="tag-pill tag-default">react</a>
      <a href="index.html" className="tag-pill tag-default">mean</a>
      <a href="index.html" className="tag-pill tag-default">node</a>
      <a href="index.html" className="tag-pill tag-default">rails</a>
    </div>
  </div>
);
