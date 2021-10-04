import React from 'react';
import { render } from '@testing-library/react';
import FormFieldInput from './FormFieldInput';

test('when render expect to have class names defined', () => {
  const { getByPlaceholderText } = render(<FormFieldInput placeholder="input" />);

  expect(getByPlaceholderText('input')).toHaveClass('form-control', 'form-control-lg');
});

test('when render expect to have textbox', () => {
  const { getByRole } = render(<FormFieldInput placeholder="input" />);

  expect(getByRole('textbox')).toBeInTheDocument();
});

test('when render expect rendered with FormFieldset component', () => {
  const { getByLabelText } = render(<FormFieldInput />);

  expect(getByLabelText('form-field-set')).toBeInTheDocument();
});
