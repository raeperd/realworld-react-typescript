import React from 'react';
import { render } from '@testing-library/react';
import FormFieldTextarea from './FormFieldTextarea';

test('when render expect to have class names defined', () => {
  const { getByRole } = render(<FormFieldTextarea />);

  expect(getByRole('textbox')).toHaveClass('form-control');
});

test('when render expect rendered with FormFieldset component', () => {
  const { getByLabelText } = render(<FormFieldTextarea />);

  expect(getByLabelText('form-field-set')).toBeInTheDocument();
});
