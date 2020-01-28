const validateValues = {
  validateFirstName(value) {
    let error = '';
    if (!value.firstName) {
      error = 'Your first name is required';
    }
    return error;
  },
  validateLastName(value) {
    let error = '';
    if (!value.lastName) {
      error = 'Your last name is required';
    }
    return error;
  },
  validateInsta(value) {
    let error = '';
    if (!value.insta) {
      error = 'Your instagram handle is required';
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
  validateSchool(value) {
    let error = '';
    if (!value.school) {
      error = 'School is required';
    }
    return error;
  },
  validateReference(value) {
    let error = '';
    if (!value.reference) {
      error = 'This field is required';
    }
    return error;
  },
};

export default validateValues;
