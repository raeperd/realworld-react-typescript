import React from 'react';
import { User } from '../api/authentication';
import useForm from './components/form/useForm';
import Form from './components/form/Form';
import FormFieldInput from './components/form/FormFieldInput';
import FormFieldTextarea from './components/form/FormFieldTextarea';
import FormButton from './components/form/FormButton';
import { updateUser } from '../api/user';

export default ({ user }: {user: User}) => (
  <div className="settings-page">
    <div className="container page">
      <div className="row">
        <div className="col-md-6 offset-md-3 col-xs-12">
          <h1 className="text-xs-center">Your Settings</h1>
          <SettingsForm
            email={user.email}
            username={user.username}
            image={user.image}
            bio={user.bio}
            token={user.token}
          />
        </div>
      </div>
    </div>
  </div>
);

export const SETTINGS_PAGE_PATH = '/settings';

const SettingsForm = ({ email, username, image, bio }: User) => {
  const { handleSubmit, handleChange, values, error, setError } = useForm(
    { email, username, image, bio, password: '' }, onSubmit, undefined,
  );

  function onSubmit() {
    updateUser(values)
      .catch(() => setError(Error('Failed to update user')));
  }

  return (
    <Form onSubmit={handleSubmit} error={error}>
      <FormFieldInput
        type="text"
        name="image"
        value={values.image !== null ? values.image : ''}
        onChange={handleChange}
        placeholder="URL of profile picture"
      />
      <FormFieldInput
        type="text"
        name="username"
        value={values.username}
        onChange={handleChange}
        placeholder="Your Name"
      />
      <FormFieldTextarea
        name="bio"
        value={values.bio !== null ? values.bio : ''}
        onChange={handleChange}
        rows={8}
        placeholder="Short bio about you"
      />
      <FormFieldInput
        type="text"
        name="email"
        value={values.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <FormFieldInput
        type="password"
        name="password"
        value={values.password}
        onChange={handleChange}
        placeholder="Password"
      />
      <FormButton>Update Settings</FormButton>
    </Form>
  );
};
