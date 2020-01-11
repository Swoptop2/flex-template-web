import { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';

const useFormValidation = (initialState, validate) => {
  const [values, setValues] = useState(initialState);
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [messageError, setMessageError] = useState('');

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleFirstNameBlur = () => {
    console.log('validating');
    const validationErrors = validate.validateFirstName(values);
    setFirstNameError(validationErrors);
  };

  const handleLastNameBlur = () => {
    const validationErrors = validate.validateLastName(values);
    setLastNameError(validationErrors);
  };

  const handleEmailBlur = () => {
    const validationErrors = validate.validateEmail(values);
    setEmailError(validationErrors);
  };

  const handleMessageBlur = () => {
    const validationErrors = validate.validateMessage(values);
    setMessageError(validationErrors);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (
      firstNameError === '' &&
      lastNameError === '' &&
      emailError === '' &&
      messageError === '' &&
      values.name !== '' &&
      values.email !== '' &&
      values.message !== ''
    ) {
      // submit form
      const action = 'contact';
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
    handleEmailBlur,
    handleMessageBlur,
    values,
    firstNameError,
    lastNameError,
    emailError,
    messageError,
  };
};

export default useFormValidation;
