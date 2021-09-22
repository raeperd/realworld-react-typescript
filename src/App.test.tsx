import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('when render app expect no error', () => {
  render(<App />);
});
