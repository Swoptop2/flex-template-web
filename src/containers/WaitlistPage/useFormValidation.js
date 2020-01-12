import { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';

const useFormValidation = (initialState, validate) => {
  const [values, setValues] = useState(initialState);
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [instaError, setInstaError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [schoolError, setSchoolError] = useState('');

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleFirstNameBlur = () => {
    const validationErrors = validate.validateFirstName(values);
    setFirstNameError(validationErrors);
  };

  const handleLastNameBlur = () => {
    const validationErrors = validate.validateLastName(values);
    setLastNameError(validationErrors);
  };

  const handleInstaBlur = () => {
    const validationErrors = validate.validateInsta(values);
    setInstaError(validationErrors);
  };

  const handleEmailBlur = () => {
    const validationErrors = validate.validateEmail(values);
    setEmailError(validationErrors);
  };

  const handleSchoolBlur = () => {
    const validationErrors = validate.validateSchool(values);
    setSchoolError(validationErrors);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (
      firstNameError === '' &&
      lastNameError === '' &&
      instaError === '' &&
      emailError === '' &&
      schoolError === '' &&
      values.firstName !== '' &&
      values.lastName !== '' &&
      values.insta !== '' &&
      values.email !== '' &&
      values.school !== ''
    ) {
      // submit form
      const action = 'waitlist';
      const params = {
        action,
        values,
      };
      axios('/api/send', { params })
        .then(res => {
          console.log(res.status, res.statusText);
          swal({
            title: 'Success!',
            text:
              'Message successfully sent. The Swoptop team will get back to you as soon as posible',
            icon: 'success',
          });
        })
        .catch(err => {
          console.error(err);
          swal({
            title: 'Oops!',
            text: 'Somehting went wrong, please try again',
            icon: 'error',
          }).then(window.location.reload());
        });
    } else {
      swal({
        title: 'Oops!',
        text: 'Make sure you fill out all fields correctly',
        icon: 'error',
      });
    }
  };

  return {
    handleSubmit,
    handleChange,
    handleFirstNameBlur,
    handleLastNameBlur,
    handleInstaBlur,
    handleEmailBlur,
    handleSchoolBlur,
    values,
    firstNameError,
    lastNameError,
    instaError,
    emailError,
    schoolError,
  };
};

export default useFormValidation;
