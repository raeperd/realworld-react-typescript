import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  FormContainer,
  FormErrorMessage, FormInput,
} from '../components/FormContainer';
import useForm from '../components/hooks/useForm';
import { signUp } from '../api/authentication';
import { HOME_PAGE_PATH } from './HomePage';

export default () => (
  <FormContainer title="Sign Up">
    <SignUpForm />
  </FormContainer>
);

const SignUpForm = () => {
  const { handleSubmit, handleChange, values } = useForm({
    email: '',
    username: '',
    password: '',
  }, onSubmitCallBack);

  const [isError, setIsError] = useState(false);
  const history = useHistory();

  async function onSubmitCallBack() {
    await signUp(values)
      .then(() => history.push(HOME_PAGE_PATH))
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

export const SIGNUP_PAGE_PATH = '/register';
