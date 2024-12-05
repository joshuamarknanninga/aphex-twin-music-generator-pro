// src/components/Footer.js
import React from 'react';
import { Segment, Container } from 'semantic-ui-react';

const AppFooter = () => (
  <Segment inverted vertical style={{ padding: '2em 0em' }}>
    <Container textAlign="center">
      © {new Date().getFullYear()} Aphex Twin Music Generator Pro. All rights
      reserved.
    </Container>
  </Segment>
);

export default AppFooter;
