const validateValues = {
  validateName(value) {
    let error = '';
    if (!value.name) {
      error = 'Your name is required';
    }
    return error;
  },
  validateEmail(value) {
    let error = '';
    if (!value.email) {
      error = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value.email)) {
      error = 'Invalid email address';
    }
    return error;
  },
  validateMessage(value) {
    let error = '';
    if (!value.message) {
      error = 'Message is required';
    }
    return error;
  },
};

export default validateValues;
