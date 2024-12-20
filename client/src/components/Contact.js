// src/components/Contact.js
import React, { useState } from 'react';
import { Header, Segment, Form, Button, Message } from 'semantic-ui-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e, { name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    // Placeholder for form submission logic
    console.log('Form Submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <Segment>
      <Header as="h2">Contact Us</Header>
      {submitted && (
        <Message
          success
          header="Form Submitted"
          content="Thank you for reaching out to us!"
        />
      )}
      <Form onSubmit={handleSubmit} success={submitted}>
        <Form.Input
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
        />
        <Form.Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          required
        />
        <Form.TextArea
          label="Message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Message"
          required
        />
        <Button type="submit" primary>
          Submit
        </Button>
      </Form>
    </Segment>
  );
};

export default Contact;
