import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);

const Header = () => (
  <nav className="navbar navbar-light">
    <div className="container">
      <a className="navbar-brand" href="index.html">conduit</a>
      <ul className="nav navbar-nav pull-xs-right">
        <li className="nav-item">
          <a className="nav-link active" href="index.html">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="index.html">Sign in</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="index.html">Sign up</a>
        </li>
      </ul>
    </div>
  </nav>
);

const Footer = () => (
  <footer>
    <div className="container">
      <a href="/" className="logo-font">conduit</a>
      <span className="attribution">
        An interactive learning project from
        {' '}
        <a href="https://thinkster.io">Thinkster</a>
        . Code &amp; design licensed under MIT.
      </span>
    </div>
  </footer>
);

export default Layout;
