import React from 'react';
import FormFieldset from './FormFieldset';

export default (props: FormInputProps) => (
  <FormFieldset>
    <input className="form-control form-control-lg" {...props} />
  </FormFieldset>
);

type FormInputProps = Omit<React.ComponentPropsWithoutRef<'input'>, 'className'>
