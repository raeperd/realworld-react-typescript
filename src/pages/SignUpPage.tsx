import React from 'react';
import useForm from './components/form/useForm';
import { signUp, User } from '../api/authentication';
import Form from './components/form/Form';
import AuthPageContainer from './components/AuthPageContainer';
import FormFieldInput from './components/form/FormFieldInput';
import FormButton from './components/form/FormButton';

export default ({ onSignUpSuccess }: {onSignUpSuccess: (user: User) => void }) => (
  <AuthPageContainer title="Sign Up">
    <SignUpForm onSignUpSuccess={onSignUpSuccess} />
  </AuthPageContainer>
);

export const SIGNUP_PAGE_PATH = '/register';

const SignUpForm = ({ onSignUpSuccess }: {onSignUpSuccess: (user: User) => void }) => {
  const { handleSubmit, handleChange, values, error, setError } = useForm({
    email: '',
    username: '',
    password: '',
  }, onSubmit, undefined);

  function onSubmit() {
    signUp(values)
      .then(onSignUpSuccess)
      .catch(() => setError(Error('Register Failed')));
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
        type="text"
        name="username"
        placeholder="Your Name"
        value={values.username}
        onChange={handleChange}
      />
      <FormFieldInput
        type="password"
        name="password"
        placeholder="Password"
        value={values.password}
        onChange={handleChange}
      />
      <FormButton name="submit-button">Register</FormButton>
    </Form>
  );
};
