import React from 'react';

export const FormContainer = ({ children, title }: {children: React.ReactNode, title: string}) => (
  <div className="auth-page">
    <div className="container page">
      <div className="row">
        <div className="col-md-6 offset-md-3 col-xs-12">
          <h1 className="text-xs-center" style={{ margin: '4rem' }}>{title}</h1>
          {children}
        </div>
      </div>
    </div>
  </div>
);

export const FormErrorMessage = ({ message }: { message: string }) => (
  <ul className="error-messages">
    <li>{message}</li>
  </ul>
);

export const FormInput = ({
  type, name, placeHolder, defaultValue, onChange,
}: FormInputProps) => {
  if (type === 'submit') {
    return <FormButton name={name} placeHolder={placeHolder} />;
  }
  return (
    <FormInputText
      type={type}
      name={name}
      placeHolder={placeHolder}
      defaultValue={defaultValue}
      onChange={onChange}
    />
  );
};

const FormInputText = ({
  type, name, placeHolder, defaultValue, onChange,
}: FormInputProps) => (
  <fieldset className="form-group">
    <input
      className="form-control form-control-lg"
      name={name}
      type={type}
      defaultValue={defaultValue}
      placeholder={placeHolder}
      onChange={onChange}
    />
  </fieldset>
);

const FormButton = ({ placeHolder, name }: { placeHolder: string, name: string}) => (
  <button type="submit" name={name} className="btn btn-lg btn-primary pull-xs-right">{placeHolder}</button>
);

interface FormInputProps {
  type: 'text' | 'password' | 'submit',
  name: string,
  placeHolder: string,
  defaultValue?: string,
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}
