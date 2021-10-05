import React from 'react';
import useForm from './components/form/useForm';
import { ArticleContents, createArticle } from '../api/article';
import Form from './components/form/Form';
import FormFieldInput from './components/form/FormFieldInput';
import FormFieldTextarea from './components/form/FormFieldTextarea';
import FormButton from './components/form/FormButton';

export default () => (
  <div className="editor-page">
    <div className="container page">
      <div className="row">
        <div className="col-md-10 offset-md-1 col-xs-12">
          <EditorForm title="" description="" body="" tagList={[]} />
        </div>
      </div>
    </div>
  </div>
);

export const EDITOR_PAGE_PATH = '/editor';

const EditorForm = ({ title, description, body, tagList }: ArticleContents) => {
  const { handleSubmit, handleChange, values, error, setError } = useForm(
    { title, description, body, tagList }, onSubmit, undefined,
  );

  function onSubmit() {
    createArticle(values)
      .catch(() => setError(Error('Failed to create article')));
  }

  return (
    <Form onSubmit={handleSubmit} error={error}>
      <FormFieldInput
        type="text"
        name="title"
        placeholder="Article Title"
        value={values.title}
        onChange={handleChange}
      />
      <FormFieldInput
        type="text"
        name="description"
        placeholder="What's this article about?"
        value={values.description}
        onChange={handleChange}
      />
      <FormFieldTextarea name="bio" rows={8} placeholder="Write your article (in markdown)" />
      <FormFieldInput
        type="text"
        name="tagList"
        placeholder="Enter tags"
        value={values.tagList}
        onChange={handleChange}
      />
      <FormButton>Publish Article</FormButton>
    </Form>
  );
};
