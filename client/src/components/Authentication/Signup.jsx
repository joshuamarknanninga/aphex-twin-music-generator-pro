// src/components/Authentication/Signup.jsx
import React, { useState, useContext } from 'react';
import { Form, Button, Message, Segment, Header } from 'semantic-ui-react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError('');
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      await register(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed');
    }
    setLoading(false);
  };

  return (
    <Segment padded="very" className="max-w-md mx-auto mt-10">
      <Header as="h2" textAlign="center">
        Create a New Account
      </Header>
      <Form onSubmit={handleSubmit} error={!!error}>
        <Form.Input
          label="Email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          type="email"
        />
        <Form.Input
          label="Password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          type="password"
        />
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          type="password"
        />
        {error && <Message error content={error} />}
        <Button primary fluid loading={loading} type="submit">
          Sign Up
        </Button>
      </Form>
    </Segment>
  );
};

export default Signup;
