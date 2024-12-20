// src/utils/validators.js

// Example email validator
export const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };
  
  // Example password strength validator
  export const validatePassword = (password) => {
    // Minimum 6 characters, at least one letter and one number
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return re.test(password);
  };
  