import React from 'react';
import Layout from '../components/Layout';

const HomePage = () => (
  <Layout>
    <div className="home-page">
      <HomePageBanner />
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <a className="nav-link disabled" href="index.html">Your Feed</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" href="index.html">Global Feed</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-3">
            <HomeSideBar />
          </div>
        </div>
      </div>
    </div>
  </Layout>
);

const HomePageBanner = () => (
  <div className="banner">
    <div className="container">
      <h1 className="logo-font">conduit</h1>
      <p>A place to share your knowledge.</p>
    </div>
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
