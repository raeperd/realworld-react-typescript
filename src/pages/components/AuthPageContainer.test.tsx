import React from 'react';
import { render } from '@testing-library/react';
import AuthPageContainer from './AuthPageContainer';

test('when render AuthPageContainer expect render title', () => {
  const { getByText } = render(<AuthPageContainer title="title"><div /></AuthPageContainer>);

  expect(getByText('title')).toBeInTheDocument();
});
