import React from 'react';
import { render } from '@testing-library/react';
import FormButton from './FormButton';

test('when render expect to be in the document', () => {
  const { getByRole } = render(<FormButton />);

  expect(getByRole('button')).toBeInTheDocument();
});

test('when render expect to have class names defined', () => {
  const { getByRole } = render(<FormButton />);

  expect(getByRole('button')).toHaveClass('btn', 'btn-lg', 'btn-primary', 'pull-xs-right');
});

test('when render expect button type to be submit', () => {
  const { getByRole } = render(<FormButton />);

  expect(getByRole('button')).toHaveAttribute('type', 'submit');
});
