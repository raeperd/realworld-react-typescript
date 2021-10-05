import React from 'react';
import FormFieldset from './FormFieldset';

export default (props: FormTextareaProps) => (
  <FormFieldset>
    <textarea className="form-control" {...props} />
  </FormFieldset>
);

type FormTextareaProps = Omit<React.ComponentPropsWithoutRef<'textarea'>, 'className'>
