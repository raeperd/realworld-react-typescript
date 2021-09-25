import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './components/Layout';
import Home, { HOME_PAGE_PATH } from './pages/HomePage';
import LoginPage, { LOGIN_PAGE_PATH } from './pages/LogInPage';
import SignUpPage, { SIGNUP_PAGE_PATH } from './pages/SignUpPage';

function App() {
  return (
    <Layout>
      <Switch>
        <Route exact path={HOME_PAGE_PATH}>
          <Home />
        </Route>
        <Route path={LOGIN_PAGE_PATH}>
          <LoginPage />
        </Route>
        <Route path={SIGNUP_PAGE_PATH}>
          <SignUpPage />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
