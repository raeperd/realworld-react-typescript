import React, { useState } from 'react';

export default <Type extends { [key: string]: string | undefined }>
(initialState: Type, callback: () => void) => {
  const [values, setValues] = useState(initialState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    callback();
  };

  return {
    handleSubmit,
    handleChange,
    values,
  };
};
