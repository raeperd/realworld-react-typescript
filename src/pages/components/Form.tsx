import React from 'react';

export default ({ fields, error, ...props }: FormProps) => (
  <form {...props}>
    {error && <FormErrorMessage message={error.message} />}
    {fields.map((field) => buildFormField(field))}
  </form>
);

interface FormProps extends React.ComponentPropsWithoutRef<'form'>{
  error?: Error
  fields: FormFieldProps[]
}

const FormErrorMessage = ({ message }: { message: string }) => (
  <ul className="error-messages">
    <li>{message}</li>
  </ul>
);

function buildFormField({ type, name, placeholder, onChange }: FormFieldProps): React.ReactElement {
  if (type === 'button') {
    return <FormButton key={name} name={name} placeholder={placeholder} />;
  }
  return <FormInputText key={name} type={type} name={name} placeholder={placeholder} onChange={onChange} />;
}

type FormFieldProps = Pick<React.ComponentPropsWithoutRef<'input'>,
  'type' | 'name' | 'placeholder' | 'onChange'>

const FormButton = ({ placeholder, ...rest }
  : Omit<React.ComponentPropsWithoutRef<'button'>, 'className' | 'type'>) => (
    <button
      type="submit"
      className="btn btn-lg btn-primary pull-xs-right"
      {...rest}
    >
      {placeholder}
    </button>
);

const FormInputText = (props: Omit<React.ComponentPropsWithoutRef<'input'>, 'className'>) => (
  <fieldset className="form-group">
    <input
      className="form-control form-control-lg"
      {...props}
    />
  </fieldset>
);
