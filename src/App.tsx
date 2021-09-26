import React from 'react';
import { HashRouter } from 'react-router-dom';
import Footer from './components/Footer';
import HeaderWithBodyRoute from './components/HeaderWithBodyRoute';

function App() {
  return (
    <HashRouter>
      <HeaderWithBodyRoute />
      <Footer />
    </HashRouter>
  );
}

export default App;
