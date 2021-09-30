import React, { useState } from 'react';
import { User } from '../api/authentication';
import { NavButtonListItem } from '../components/NavListItem';

export default ({ userLoggedIn }: {userLoggedIn: User | null}) => (
  <div className="home-page">
    <HomePageBanner />
    <div className="container page">
      <div className="row">
        <div className="col-md-9">
          <HomeFeedToggle userLoggedIn={userLoggedIn} />
          <HomeArticlePreview />
          <HomeArticlePreview />
        </div>
        <div className="col-md-3">
          <HomeSideBar />
        </div>
      </div>
    </div>
  </div>
);

export const HOME_PAGE_PATH = '/';

const HomePageBanner = () => (
  <div className="banner">
    <div className="container">
      <h1 className="logo-font">conduit</h1>
      <p>A place to share your knowledge.</p>
    </div>
  </div>
);

const HomeFeedToggle = ({ userLoggedIn }: {userLoggedIn: User | null }) => {
  const { toggleState, toggleGlobalFeedState, toggleUserFeedState } = useToggleState(
    { toggleActive: 'global' },
  );

  return (
    <div className="feed-toggle">
      <ul className="nav nav-pills outline-active">
        <NavButtonListItem activated={toggleState.toggleActive === 'global'} onClick={toggleGlobalFeedState}>
          Global Feed
        </NavButtonListItem>
        {userLoggedIn !== null && (
        <NavButtonListItem activated={toggleState.toggleActive === 'user'} onClick={toggleUserFeedState}>
          Your Feed
        </NavButtonListItem>
        )}
      </ul>
    </div>
  );
};

type FeedToggleActiveState = {
  readonly toggleActive: FeedToggle,
}

type FeedToggle = 'global' | 'user'

const useToggleState = (initialState: FeedToggleActiveState) => {
  const [toggleState, setActiveState] = useState(initialState);

  const toggleGlobalFeedState = () => setActiveState({ toggleActive: 'global' });

  const toggleUserFeedState = () => setActiveState({ toggleActive: 'user' });

  return { toggleState, toggleGlobalFeedState, toggleUserFeedState };
};

const HomeArticlePreview = () => (
  <div className="article-preview">
    <div className="article-meta">
      <a href="profile.html"><img src="//i.imgur.com/Qr71crq.jpg" alt="profile" /></a>
      <div className="info">
        <a href="/" className="author">Eric Simons</a>
        <span className="date">January 20th</span>
      </div>
      <button type="button" className="btn btn-outline-primary btn-sm pull-xs-right">
        <i className="ion-heart" />
        {' '}
        29
      </button>
    </div>
    <a href="/" className="preview-link">
      <h1>How to build webapps that scale</h1>
      <p>This is the description for the post.</p>
      <span>Read more...</span>
    </a>
  </div>
);

const HomeSideBar = () => (
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
