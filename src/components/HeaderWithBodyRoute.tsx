import {
  Link, NavLink, Route, Switch,
} from 'react-router-dom';
import React, { useState } from 'react';
import NewPostPage, { EDITOR_PAGE_PATH } from '../pages/NewPostPage';
import ProfilePage, { PROFILE_PAGE_PATH } from '../pages/ProfilePage';
import SettingsPage, { SETTINGS_PAGE_PATH } from '../pages/SettingsPage';
import Home, { HOME_PAGE_PATH } from '../pages/HomePage';
import LoginPage, { LOGIN_PAGE_PATH } from '../pages/LogInPage';
import SignUpPage, { SIGNUP_PAGE_PATH } from '../pages/SignUpPage';
import { getCurrentUserOrNull, saveUser, User } from '../api/authentication';

export default () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(() => getCurrentUserOrNull() !== null);

  const handleLoginSuccess = (user: User) => {
    setIsUserLoggedIn(true);
    saveUser(user);
  };

  return (
    <>
      <Header isUserLoggedIn={isUserLoggedIn} />
      <Body isUserLoggedIn={isUserLoggedIn} onLoginSuccess={handleLoginSuccess} />
    </>
  );
};

const Header = ({ isUserLoggedIn }: { isUserLoggedIn: boolean }) => (
  <nav className="navbar navbar-light">
    <div className="container">
      <Link className="navbar-brand" to="/">conduit</Link>
      <ul className="nav navbar-nav pull-xs-right">
        <NavLinkListItem to={HOME_PAGE_PATH}>Home</NavLinkListItem>
        {isUserLoggedIn
          ? <AuthorizedNavLinkList />
          : <UnAuthorizedNavLinkList />}
      </ul>
    </div>
  </nav>
);

const Body = ({ isUserLoggedIn, onLoginSuccess }:
  {isUserLoggedIn: boolean, onLoginSuccess: (user: User) => void}) => (
    <Switch>
      <Route exact path={HOME_PAGE_PATH}>
        <Home />
      </Route>
      {isUserLoggedIn
        ? <AuthorizedBodies />
        : <UnAuthorizedBodies onLoginSuccess={onLoginSuccess} />}
    </Switch>
);

const AuthorizedBodies = () => (
  <Switch>
    <Route path={EDITOR_PAGE_PATH}><NewPostPage /></Route>
    <Route path={PROFILE_PAGE_PATH}>
      <ProfilePage />
    </Route>
    <Route path={SETTINGS_PAGE_PATH}>
      <SettingsPage />
    </Route>
  </Switch>
);

const UnAuthorizedBodies = ({ onLoginSuccess }: {onLoginSuccess: (user: User) => void}) => (
  <Switch>
    <Route path={LOGIN_PAGE_PATH}>
      <LoginPage onLoginSuccess={onLoginSuccess} />
    </Route>
    <Route path={SIGNUP_PAGE_PATH}>
      <SignUpPage onSignUpSuccess={onLoginSuccess} />
    </Route>
  </Switch>
);

const AuthorizedNavLinkList = () => (
  <>
    <NavLinkListItem to={EDITOR_PAGE_PATH}>New Post</NavLinkListItem>
    <NavLinkListItem to={PROFILE_PAGE_PATH}>Profile</NavLinkListItem>
    <NavLinkListItem to={SETTINGS_PAGE_PATH}>Settings</NavLinkListItem>
  </>
);

const UnAuthorizedNavLinkList = () => (
  <>
    <NavLinkListItem to={LOGIN_PAGE_PATH}>Sign in</NavLinkListItem>
    <NavLinkListItem to={SIGNUP_PAGE_PATH}>Sign up</NavLinkListItem>
  </>
);

const NavLinkListItem = ({ to, children }: { to: string, children: string }) => (
  <li className="nav-item">
    <NavLink className="nav-link" activeClassName="nav-link active" exact to={to}>
      {children}
    </NavLink>
  </li>
);
