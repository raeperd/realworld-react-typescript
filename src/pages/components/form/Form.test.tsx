import React from 'react';
import { render } from '@testing-library/react';
import Form from './Form';
import FormFieldInput from './FormFieldInput';
import FormButton from './FormButton';

test('when render form with input field expect rendered', () => {
  const { getByPlaceholderText } = render(<Form><FormFieldInput placeholder="Email" /></Form>);

  expect(getByPlaceholderText('Email')).toBeInTheDocument();
});

test('when render form with button field expect rendered', () => {
  const { getByRole } = render(<Form><FormButton /></Form>);

  expect(getByRole('button')).toBeInTheDocument();
});

test('when render form with button field expect type submit', () => {
  const { getByRole } = render(<Form><FormButton /></Form>);

  expect(getByRole('button')).toHaveAttribute('type', 'submit');
});

test('when click button expect onSubmit called', () => {
  const handleSubmit = jest.fn((e) => e.preventDefault());
  const { getByRole } = render(<Form onSubmit={handleSubmit}><FormButton /></Form>);

  getByRole('button').click();

  expect(handleSubmit).toBeCalledTimes(1);
});
