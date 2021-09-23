import React, { useState } from 'react';

const HomePage = () => (
  <div className="home-page">
    <HomePageBanner />
    <div className="container page">
      <div className="row">
        <div className="col-md-9">
          <HomeFeedToggle />
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

const HomePageBanner = () => (
  <div className="banner">
    <div className="container">
      <h1 className="logo-font">conduit</h1>
      <p>A place to share your knowledge.</p>
    </div>
  </div>
);

const HomeFeedToggle = () => {
  const [toogleActivated, setToggleActivated] = useState<HomeFeedToggleItem>('Global Feed');

  const NavigationItem = ({ toggle }: {toggle: HomeFeedToggleItem}) => {
    const navLinkItemName = (activated: boolean) => (
      activated ? 'nav-link active' : 'nav-link disabled'
    );

    return (
      <li className="nav-item">
        <button
          type="button"
          className={navLinkItemName(toggle === toogleActivated)}
          onClick={() => setToggleActivated(toggle)}
        >
          {toggle}
        </button>
      </li>
    );
  };

  type HomeFeedToggleItem = 'Your Feed' | 'Global Feed';

  return (
    <div className="feed-toggle">
      <ul className="nav nav-pills outline-active">
        <NavigationItem toggle="Your Feed" />
        <NavigationItem toggle="Global Feed" />
      </ul>
    </div>
  );
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

export default HomePage;
