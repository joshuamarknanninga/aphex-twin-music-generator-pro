// src/components/Settings/Settings.jsx
import React, { useContext, useState, useEffect } from 'react';
import { Header, Form, Button, Message } from 'semantic-ui-react';
import { AuthContext } from '../../contexts/AuthContext';
import { updateUserSettings } from '../../services/authService';

const Settings = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [email, setEmail] = useState(currentUser.email);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    setEmail(currentUser.email);
  }, [currentUser]);

  const handleSubmit = async () => {
    setError('');
    setSuccess('');

    if (password && password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setUpdating(true);
    try {
      const updatedUser = await updateUserSettings({
        email,
        password: password || undefined,
      });
      setCurrentUser(updatedUser);
      setSuccess('Settings updated successfully.');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err.message || 'Failed to update settings.');
    }
    setUpdating(false);
  };

  return (
    <div className="p-4 bg-gray-800 text-white">
      <Header as="h3">Settings</Header>
      <Form onSubmit={handleSubmit} success={!!success} error={!!error}>
        <Form.Input
          label="Email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          type="email"
        />
        <Form.Input
          label="New Password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <Form.Input
          label="Confirm New Password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
        />
        {error && <Message error content={error} />}
        {success && <Message success content={success} />}
        <Button primary loading={updating} type="submit">
          Update Settings
        </Button>
      </Form>
    </div>
  );
};

export default Settings;
