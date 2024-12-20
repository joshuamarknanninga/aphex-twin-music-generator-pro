// src/pages/Home.jsx
import React from 'react';
import { Container, Header, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container text className="mt-10">
      <Header as="h1" textAlign="center">
        Welcome to Aphex Twin Music Generator
      </Header>
      <p className="mt-4 text-center">
        Create, manipulate, and explore unique soundscapes inspired by Aphex Twin.
      </p>
      <div className="flex justify-center mt-6 space-x-4">
        <Button as={Link} to="/login" color="blue">
          Login
        </Button>
        <Button as={Link} to="/signup" primary>
          Sign Up
        </Button>
      </div>
    </Container>
  );
};

export default Home;
