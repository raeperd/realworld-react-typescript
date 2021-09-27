import React, { useState } from 'react';
import { login, User } from '../api/authentication';
import useForm from '../components/hooks/useForm';
import { FormContainer, FormErrorMessage, FormInput } from '../components/FormContainer';

export default ({ onLoginSuccess }: {onLoginSuccess: (user: User) => void}) => (
  <FormContainer title="Sign in">
    <LoginForm onLoginSuccess={onLoginSuccess} />
  </FormContainer>
);

export const LOGIN_PAGE_PATH = '/login';

const LoginForm = ({ onLoginSuccess }: {onLoginSuccess: (user: User) => void}) => {
  const { handleSubmit, handleChange, values } = useForm({
    email: '',
    password: '',
  }, onSubmitCallBack);

  const [isError, setIsError] = useState(false);

  async function onSubmitCallBack() {
    await login(values.email, values.password)
      .then((user) => onLoginSuccess(user))
      .catch(() => setIsError(true));
  }

  return (
    <form onSubmit={handleSubmit}>
      {isError && (<FormErrorMessage message="Login Failed" />)}
      <FormInput type="text" name="email" placeHolder="Email" onChange={handleChange} />
      <FormInput type="password" name="password" placeHolder="Password" onChange={handleChange} />
      <FormInput type="submit" name="submit-button" placeHolder="Sign in" />
    </form>
  );
};
