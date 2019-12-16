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
  name: '',
  email: '',
  message: '',
};

const ContactUsPage = () => {
  const {
    handleSubmit,
    handleChange,
    handleNameBlur,
    handleEmailBlur,
    handleMessageBlur,
    values,
    nameError,
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
            <h1 className={css.title}>Contact Us</h1>
            <h2 className={css.sectionTitle}>Need help? Feel free to contact us!</h2>
            <form onSubmit={handleSubmit} className={css.form}>
              <input
                onChange={handleChange}
                onBlur={handleNameBlur}
                name="name"
                value={values.name}
                className={nameError && css.errorInput}
                autoComplete="off"
                placeholder="Name"
              />
              {nameError && <p className={css.errorText}>{nameError}</p>}
              <input
                onChange={handleChange}
                onBlur={handleEmailBlur}
                name="email"
                value={values.email}
                className={emailError && css.errorInput}
                autoComplete="off"
                placeholder="Email address"
              />
              {emailError && <p className={css.errorText}>{emailError}</p>}
              <textarea
                onChange={handleChange}
                onBlur={handleMessageBlur}
                name="message"
                value={values.message}
                className={messageError && css.errorInput}
                autoComplete="off"
                placeholder="Your message or question"
                rows="2"
              />
              {messageError && <p className={css.errorText}>{messageError}</p>}
              <button className={css.button} type="submit">
                Submit
              </button>
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
