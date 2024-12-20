// src/components/UI/Navbar.jsx
import React, { useContext } from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import DarkModeToggle from './DarkModeToggle';

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <Menu inverted>
      <Container>
        <Menu.Item as={Link} to="/" header>
          Aphex Twin Music Generator
        </Menu.Item>
        <Menu.Menu position="right">
          <DarkModeToggle />
          {currentUser ? (
            <>
              <Menu.Item as={Link} to="/dashboard">
                Dashboard
              </Menu.Item>
              <Menu.Item>
                <Button onClick={logout} color="red">
                  Logout
                </Button>
              </Menu.Item>
            </>
          ) : (
            <>
              <Menu.Item as={Link} to="/login">
                Login
              </Menu.Item>
              <Menu.Item as={Link} to="/signup">
                <Button primary>Sign Up</Button>
              </Menu.Item>
            </>
          )}
        </Menu.Menu>
      </Container>
    </Menu>
  );
};

export default Navbar;
