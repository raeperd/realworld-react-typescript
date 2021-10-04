import React from 'react';

export default ({ error, children, ...props }: React.PropsWithChildren<FormProps>) => (
  <form {...props}>
    {error && <FormErrorMessage message={error.message} />}
    {children}
  </form>
);

interface FormProps extends React.ComponentPropsWithoutRef<'form'>{
  error?: Error
}

const FormErrorMessage = ({ message }: { message: string }) => (
  <ul className="error-messages">
    <li>{message}</li>
  </ul>
);
