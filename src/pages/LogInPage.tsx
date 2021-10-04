import React from 'react';
import { login, User } from '../api/authentication';
import useForm from './components/form/useForm';
import Form from './components/form/Form';
import AuthPageContainer from './components/AuthPageContainer';
import FormFieldInput from './components/form/FormFieldInput';
import FormButton from './components/form/FormButton';

export default ({ onLoginSuccess }: {onLoginSuccess: (user: User) => void}) => (
  <AuthPageContainer title="Sign in">
    <LoginForm onLoginSuccess={onLoginSuccess} />
  </AuthPageContainer>
);

export const LOGIN_PAGE_PATH = '/login';

const LoginForm = ({ onLoginSuccess }: {onLoginSuccess: (user: User) => void}) => {
  const { handleSubmit, handleChange, values, error, setError } = useForm({
    email: '',
    password: '',
  }, onSubmit, undefined);

  function onSubmit() {
    login(values.email, values.password)
      .then((user) => onLoginSuccess(user))
      .catch(() => setError(Error('Login Failed')));
  }

  return (
    <Form onSubmit={handleSubmit} error={error}>
      <FormFieldInput
        type="text"
        name="email"
        placeholder="Email"
        value={values.email}
        onChange={handleChange}
      />
      <FormFieldInput
        type="password"
        name="password"
        placeholder="Password"
        value={values.password}
        onChange={handleChange}
      />
      <FormButton name="submit-button">Sign in</FormButton>
    </Form>
  );
};
