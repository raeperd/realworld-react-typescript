import React from 'react';
import { Link, NavLink } from 'react-router-dom';

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
      <Link className="navbar-brand" to="/">conduit</Link>
      <ul className="nav navbar-nav pull-xs-right">
        <NavLinkListItem to="/">Home</NavLinkListItem>
        <NavLinkListItem to="/login">Sign in</NavLinkListItem>
        <NavLinkListItem to="/register">Sign up</NavLinkListItem>
      </ul>
    </div>
  </nav>
);

const NavLinkListItem = ({ to, children }: {to: string, children: string}) => (
  <li className="nav-item">
    <NavLink className="nav-link" activeClassName="nav-link active" exact to={to}>{children}</NavLink>
  </li>
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
