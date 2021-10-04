import React, { useState } from 'react';

export default <Type extends { [key: string]: string | undefined }>
(initialState: Type, onSubmit: () => void, errorDefault: undefined | Error) => {
  const [values, setValues] = useState(initialState);
  const [error, setError] = useState(errorDefault);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit();
  };

  return {
    handleSubmit,
    handleChange,
    values,
    error,
    setError,
  };
};
