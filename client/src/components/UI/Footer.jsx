// src/components/UI/Footer.jsx
import React from 'react';
import { Container } from 'semantic-ui-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <Container textAlign="center">
        <p>&copy; {new Date().getFullYear()} Aphex Twin Music Generator. All rights reserved.</p>
        {/* Optional: Add contact link or social media icons */}
      </Container>
    </footer>
  );
};

export default Footer;
