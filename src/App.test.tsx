import React from 'react';
import { render } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import App from './App';

test('when render app expect no error', () => {
  render(
    <HashRouter>
      <App />
    </HashRouter>,
  );
});
