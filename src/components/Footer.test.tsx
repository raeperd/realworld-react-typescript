import React from 'react';
import { render } from '@testing-library/react';
import Footer from './Footer';

test('when render expect footer exists', () => {
  const { getByText } = render(<Footer />);

  expect(getByText('Thinkster')).toBeInTheDocument();
});
