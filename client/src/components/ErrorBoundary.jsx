// src/components/ErrorBoundary.jsx
import React from 'react';
import { Message } from 'semantic-ui-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to an error reporting service
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Message negative>
          <Message.Header>Something went wrong.</Message.Header>
          <p>We're sorry, but an unexpected error has occurred.</p>
        </Message>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
