import React, { useEffect, useState } from 'react';
import { User } from '../api/authentication';
import { getTags } from '../api/tag';
import ArticleToggle from './components/ArticleToggle';
import { feedArticles, getArticles } from '../api/article';

export const HOME_PAGE_PATH = '/';

export default ({ userLoggedIn }: {userLoggedIn: User | null}) => (
  <div className="home-page">
    <Banner />
    <div className="container page">
      <div className="row">
        <div className="col-md-9">
          {userLoggedIn
            ? <ArticleToggle feeds={['Global Feed', 'Your Feed']} onClickFeed={handleClickFeed} />
            : <ArticleToggle feeds={['Global Feed']} onClickFeed={handleClickFeed} />}
        </div>
        <div className="col-md-3">
          <TagSideBar />
        </div>
      </div>
    </div>
  </div>
);

const handleClickFeed = (feed: HomePageFeed) => {
  if (feed === 'Your Feed') {
    return feedArticles();
  }
  return getArticles();
};

type HomePageFeed = 'Global Feed' | 'Your Feed'

const Banner = () => (
  <div className="banner">
    <div className="container">
      <h1 className="logo-font">conduit</h1>
      <p>A place to share your knowledge.</p>
    </div>
  </div>
);

const TagSideBar = () => {
  const [tags, setTags] = useState<string[] | undefined>(undefined);

  useEffect(() => {
    getTags()
      .then((response) => setTags(response));
    return () => setTags([]);
  }, []);

  return (
    <div className="sidebar">
      <p>Popular Tags</p>
      <div className="tag-list">
        {tags?.map((tag) => (
          <a
            key={tag}
            href="index.html"
            className="tag-pill tag-default"
          >
            {tag}
          </a>
        ))}
      </div>
    </div>
  );
};
