import React from 'react';

export default ({ children, ...rest }: FormButtonProps) => (
  <button type="submit" className="btn btn-lg btn-primary pull-xs-right" {...rest}>
    {children}
  </button>
);

type FormButtonProps = Omit<React.ComponentPropsWithoutRef<'button'>, 'className' | 'type'>
