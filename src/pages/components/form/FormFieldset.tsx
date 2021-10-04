import React from 'react';

export default ({ children }:{ children:React.ReactElement}) => (
  <fieldset className="form-group" aria-label="form-field-set">
    {children}
  </fieldset>
);
