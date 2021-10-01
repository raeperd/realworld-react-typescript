import React, { useState } from 'react';
import useForm from './components/hooks/useForm';
import { signUp, User } from '../api/authentication';
import Form from './components/Form';
import AuthPageContainer from './components/AuthPageContainer';

export default ({ onSignUpSuccess }: {onSignUpSuccess: (user: User) => void }) => (
  <AuthPageContainer title="Sign Up">
    <SignUpForm onSignUpSuccess={onSignUpSuccess} />
  </AuthPageContainer>
);

export const SIGNUP_PAGE_PATH = '/register';

const SignUpForm = ({ onSignUpSuccess }: {onSignUpSuccess: (user: User) => void }) => {
  const { handleSubmit, handleChange, values } = useForm({
    email: '',
    username: '',
    password: '',
  }, onSubmitCallBack);

  const [error, setError] = useState<Error | undefined>(undefined);

  async function onSubmitCallBack() {
    await signUp(values)
      .then(onSignUpSuccess)
      .catch(() => setError(Error('Register Failed')));
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
          type: 'text', name: 'username', placeholder: 'Your Name', onChange: handleChange,
        },
        {
          type: 'password', name: 'password', placeholder: 'Password', onChange: handleChange,
        },
        { type: 'button', name: 'submit-button', placeholder: 'Register' }]}
    />
  );
};
