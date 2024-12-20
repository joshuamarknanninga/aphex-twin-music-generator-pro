// src/components/Authentication/AuthForm.jsx
import React from 'react';
import { Form, Button, Message, Segment, Header } from 'semantic-ui-react';

const AuthForm = ({ title, handleSubmit, children, error, loading }) => {
  return (
    <Segment padded="very" className="max-w-md mx-auto mt-10">
      <Header as="h2" textAlign="center">
        {title}
      </Header>
      <Form onSubmit={handleSubmit} error={!!error}>
        {children}
        {error && <Message error content={error} />}
        <Button primary fluid loading={loading} type="submit">
          {title}
        </Button>
      </Form>
    </Segment>
  );
};

export default AuthForm;
