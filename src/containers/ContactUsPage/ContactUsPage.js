import React from 'react';
import { StaticPage, TopbarContainer } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
} from '../../components';
import useFormValidation from './useFormValidation';
import validateValues from './validate';

import css from './ContactUsPage.css';

const INITIAL_STATE = {
  firstName: '',
  lastName: '',
  email: '',
  message: '',
};

const ContactUsPage = () => {
  const {
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
  } = useFormValidation(INITIAL_STATE, validateValues);
  return (
    <StaticPage
      className={css.root}
      title="Contact Us"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'Contact us',
        description: 'Contact us section',
        name: 'Contact Us',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>
        <LayoutWrapperMain>
          <div className={css.content}>
            <div className={css.contactInfo}>
              <h1 className={css.title}>Contact Us</h1>
              <p>
                You can email us at team@swoptop.com or fill out the form & we will get back to you
                shortly!
              </p>
              <div className={css.socialIcons}>
                <a
                  style={{ cursor: 'pointer' }}
                  target="_blank"
                  href="https://www.youtube.com/channel/UC2qkyJZoTVpdRu7LsGK0oaQ"
                  rel="noopener noreferrer"
                >
                  <i style={{ fontSize: '23px' }} className="fa fa-youtube-play"></i>
                </a>
                <a
                  style={{ cursor: 'pointer' }}
                  target="_blank"
                  href="https://www.facebook.com/swoptoppp/"
                  rel="noopener noreferrer"
                >
                  <i style={{ fontSize: '23px' }} className="fa fa-facebook"></i>
                </a>
                <a
                  style={{ cursor: 'pointer' }}
                  target="_blank"
                  href="https://www.instagram.com/swoptop/"
                  rel="noopener noreferrer"
                >
                  <i style={{ fontSize: '23px' }} className="fa fa-instagram"></i>
                </a>
              </div>
            </div>
            <form onSubmit={handleSubmit} className={css.form}>
              <div className={css.input}>
                <p>Name *</p>
                <div className={css.nameInputs}>
                  <div>
                    <input
                      onChange={handleChange}
                      onBlur={handleFirstNameBlur}
                      name="firstName"
                      value={values.firstName}
                      className={firstNameError && css.errorInput}
                      autoComplete="off"
                    />
                    <p style={{ fontSize: '12px' }}>First Name</p>
                    {firstNameError && <p className={css.errorText}>{firstNameError}</p>}
                  </div>
                  <div>
                    <input
                      onChange={handleChange}
                      onBlur={handleLastNameBlur}
                      name="lastName"
                      value={values.lastName}
                      className={lastNameError && css.errorInput}
                      autoComplete="off"
                    />
                    <p style={{ fontSize: '12px' }}>Last Name</p>
                    {lastNameError && <p className={css.errorText}>{lastNameError}</p>}
                  </div>
                </div>
              </div>
              <div className={css.input}>
                <p>Email *</p>
                <input
                  onChange={handleChange}
                  onBlur={handleEmailBlur}
                  name="email"
                  value={values.email}
                  className={emailError && css.errorInput}
                  autoComplete="off"
                />
                {emailError && <p className={css.errorText}>{emailError}</p>}
              </div>
              <div className={css.input}>
                <p>Message *</p>
                <textarea
                  onChange={handleChange}
                  onBlur={handleMessageBlur}
                  name="message"
                  value={values.message}
                  className={messageError && css.errorInput}
                  autoComplete="off"
                  rows="4"
                />
                {messageError && <p className={css.errorText}>{messageError}</p>}
              </div>
              <div style={{ width: '100%' }}>
                <button className={css.button} type="submit">
                  Send
                </button>
              </div>
            </form>
          </div>
        </LayoutWrapperMain>
        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

export default ContactUsPage;
