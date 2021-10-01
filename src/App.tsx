import React from 'react';
import { HashRouter } from 'react-router-dom';
import Footer from './pages/components/Footer';
import HeaderWithBodyRoute from './pages/components/HeaderWithBodyRoute';

function App() {
  return (
    <HashRouter>
      <HeaderWithBodyRoute />
      <Footer />
    </HashRouter>
  );
}

export default App;
