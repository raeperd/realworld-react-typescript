import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './components/Layout';
import Home, { HOME_PAGE_PATH } from './pages/HomePage';
import LoginPage, { LOGIN_PAGE_PATH } from './pages/LogInPage';
import RegisterPage, { REGISTER_PAGE_PATH } from './pages/RegisterPage';

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
        <Route path={REGISTER_PAGE_PATH}>
          <RegisterPage />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
