import React from 'react';
import { render } from '@testing-library/react';
import FormFieldset from './FormFieldset';

test('when render expect to have class names defined', () => {
  const { getByLabelText } = render(<FormFieldset><div>text</div></FormFieldset>);

  expect(getByLabelText('form-field-set')).toHaveClass('form-group');
});
