import React from 'react';
import { Form, Button } from 'react-bootstrap';

const SignInButton = ({ message, submit }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    submit();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Button variant="outline-primary" type="submit">
        {message}
      </Button>
    </Form>
  );
};

export default SignInButton;
