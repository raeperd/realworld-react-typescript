import React, { useState } from 'react';
import { FormContainer, FormErrorMessage, FormInput } from '../components/FormContainer';
import useForm from '../components/hooks/useForm';
import { signUp, User } from '../api/authentication';

export default ({ onSignUpSuccess }: {onSignUpSuccess: (user: User) => void }) => (
  <FormContainer title="Sign Up">
    <SignUpForm onSignUpSuccess={onSignUpSuccess} />
  </FormContainer>
);

export const SIGNUP_PAGE_PATH = '/register';

const SignUpForm = ({ onSignUpSuccess }: {onSignUpSuccess: (user: User) => void }) => {
  const { handleSubmit, handleChange, values } = useForm({
    email: '',
    username: '',
    password: '',
  }, onSubmitCallBack);

  const [isError, setIsError] = useState(false);

  async function onSubmitCallBack() {
    await signUp(values)
      .then(onSignUpSuccess)
      .catch(() => setIsError(true));
  }

  return (
    <form onSubmit={handleSubmit}>
      {isError && <FormErrorMessage message="Register Failed" />}
      <FormInput type="text" name="email" placeHolder="Email" onChange={handleChange} />
      <FormInput type="text" name="username" placeHolder="Your Name" onChange={handleChange} />
      <FormInput type="password" name="password" placeHolder="Password" onChange={handleChange} />
      <FormInput type="submit" name="submit-button" placeHolder="Register" />
    </form>
  );
};
