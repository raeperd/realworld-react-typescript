import React, { useState } from 'react';
import { login, User } from '../api/authentication';
import useForm from '../components/hooks/useForm';
import Form from '../components/Form';
import AuthPageContainer from '../components/AuthPageContainer';

export default ({ onLoginSuccess }: {onLoginSuccess: (user: User) => void}) => (
  <AuthPageContainer title="Sign in">
    <LoginForm onLoginSuccess={onLoginSuccess} />
  </AuthPageContainer>
);

export const LOGIN_PAGE_PATH = '/login';

const LoginForm = ({ onLoginSuccess }: {onLoginSuccess: (user: User) => void}) => {
  const { handleSubmit, handleChange, values } = useForm({
    email: '',
    password: '',
  }, onSubmitCallBack);

  const [error, setError] = useState<Error | undefined>(undefined);

  async function onSubmitCallBack() {
    await login(values.email, values.password)
      .then((user) => onLoginSuccess(user))
      .catch(() => setError(Error('Login Failed')));
  }

  return (
    <Form
      onSubmit={handleSubmit}
      error={error}
      fields={[
        {
          type: 'text', name: 'email', placeholder: 'Email', onChange: handleChange,
        },
        {
          type: 'password', name: 'password', placeholder: 'Password', onChange: handleChange,
        },
        { type: 'button', name: 'submit-button', placeholder: 'Sign in' },
      ]}
    />
  );
};
