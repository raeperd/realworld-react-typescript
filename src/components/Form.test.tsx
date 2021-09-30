import React from 'react';
import { render } from '@testing-library/react';
import Form from './Form';

test('when render form with input field expect rendered', () => {
  const { getByPlaceholderText } = render(<Form fields={[FORM_FIELD_PROPS_EMAIL]} />);

  expect(getByPlaceholderText(FORM_FIELD_PROPS_EMAIL.placeholder)).toBeInTheDocument();
});

test('when render form with button field expect rendered', () => {
  const { getByRole } = render(<Form fields={[FORM_FIELD_PROPS_BUTTON]} />);

  expect(getByRole('button')).toBeInTheDocument();
});

test('when render form with button field expect type submit', () => {
  const { getByRole } = render(<Form fields={[FORM_FIELD_PROPS_BUTTON]} />);

  expect(getByRole('button')).toHaveAttribute('type', 'submit');
});

test('when click button expect onSubmit called', () => {
  const handleSubmit = jest.fn();
  const { getByRole } = render(<Form onSubmit={handleSubmit} fields={[FORM_FIELD_PROPS_BUTTON]} />);

  getByRole('button').click();

  expect(handleSubmit).toBeCalledTimes(1);
});

const FORM_FIELD_PROPS_EMAIL = { type: 'text', name: 'email', placeholder: 'Email' };
const FORM_FIELD_PROPS_BUTTON = { type: 'button', name: 'submit-button', placeholder: 'Register' };
