import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { login } from '../api/authentication';
import { HOME_PAGE_PATH } from './HomePage';

export default () => (
  <div className="auth-page">
    <div className="container page">
      <div className="row">
        <div className="col-md-6 offset-md-3 col-xs-12">
          <h1 className="text-xs-center" style={{ margin: '4rem' }}>Sign in</h1>
          <Form />
        </div>
      </div>
    </div>
  </div>
);

export const LOGIN_PAGE_PATH = '/login';

const Form = () => {
  const [email, setEmail] = useState('');
  const handleEmailChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setEmail(e.currentTarget.value);
  };

  const [password, setPassword] = useState('');
  const handlePasswordChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setPassword(e.currentTarget.value);
  };

  const [isError, setIsError] = useState(false);

  const history = useHistory();
  const handleClick = () => {
    login(email, password)
      .then(() => history.push(HOME_PAGE_PATH))
      .catch(() => setIsError(true));
  };

  return (
    <form>
      {isError && (
      <ul className="error-messages">
        <li>Login Failed</li>
      </ul>
      )}
      <FormInput type="text" placeHolder="Email" onChange={handleEmailChange} />
      <FormInput type="password" placeHolder="Password" onChange={handlePasswordChange} />
      <FormButton onClick={handleClick} />
    </form>
  );
};

const FormInput = ({ type, placeHolder, onChange }: FormInputProps) => (
  <fieldset className="form-group">
    <input className="form-control form-control-lg" type={type} placeholder={placeHolder} onChange={onChange} />
  </fieldset>
);

const FormButton = ({ onClick }: FormButtonProps) => (
  <button type="button" className="btn btn-lg btn-primary pull-xs-right" onClick={onClick}>
    Sign in
  </button>
);

interface FormInputProps {
    type: 'text' | 'password',
    placeHolder: string,
    onChange: React.ChangeEventHandler<HTMLInputElement> | undefined
}

interface FormButtonProps {
    onClick: React.MouseEventHandler<HTMLButtonElement> | undefined
}
