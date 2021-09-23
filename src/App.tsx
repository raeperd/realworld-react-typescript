import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/HomePage';

function App() {
  return (
    <Layout>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login"> </Route>
        <Route path="/register"> </Route>
      </Switch>
    </Layout>
  );
}

export default App;
