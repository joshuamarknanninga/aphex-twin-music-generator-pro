// src/components/Header.js
import React from 'react';
import { Menu, Container, Image } from 'semantic-ui-react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/images/logo.png'; // Ensure you have a logo image

const AppHeader = () => {
  const location = useLocation();

  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item as={Link} to="/" header>
          <Image size="mini" src={logo} style={{ marginRight: '1.5em' }} />
          Aphex Twin Music Generator Pro
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item
            as={Link}
            to="/about"
            name="About"
            active={location.pathname === '/about'}
          />
          <Menu.Item
            as={Link}
            to="/contact"
            name="Contact"
            active={location.pathname === '/contact'}
          />
        </Menu.Menu>
      </Container>
    </Menu>
  );
};

export default AppHeader;
