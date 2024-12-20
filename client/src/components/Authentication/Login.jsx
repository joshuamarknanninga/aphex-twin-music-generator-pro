// src/components/Authentication/Login.jsx
import React, { useState, useContext } from 'react';
import { Form, Button, Message, Segment, Header } from 'semantic-ui-react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed');
    }
    setLoading(false);
  };

  return (
    <Segment padded="very" className="max-w-md mx-auto mt-10">
      <Header as="h2" textAlign="center">
        Login to Your Account
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
        {error && <Message error content={error} />}
        <Button primary fluid loading={loading} type="submit">
          Login
        </Button>
      </Form>
    </Segment>
  );
};

export default Login;
