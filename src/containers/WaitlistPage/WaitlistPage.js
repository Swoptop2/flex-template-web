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

import css from './WaitlistPage.css';

const INITIAL_STATE = {
  firstName: '',
  lastName: '',
  insta: '',
  email: '',
  school: '',
  sorority: '',
};

const WaitlistPage = () => {
  const {
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
  } = useFormValidation(INITIAL_STATE, validateValues);
  return (
    <StaticPage
      className={css.root}
      title="Waitlist"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'Waitlist',
        description: 'Waitlist',
        name: 'Waitlist',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>
        <LayoutWrapperMain>
          <div className={css.content}>
            <div className={css.contactInfo}>
              <h1 className={css.title}>Sign up for the waitlist</h1>
              <p>
                If you want to lead the charge in bringing Swoptop to your campus reach out to us at
                team@swoptop.com
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
                <p>Instagram Username *</p>
                <input
                  onChange={handleChange}
                  onBlur={handleInstaBlur}
                  name="insta"
                  value={values.insta}
                  className={instaError && css.errorInput}
                  autoComplete="off"
                />
                {instaError && <p className={css.errorText}>{instaError}</p>}
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
                <p>School *</p>
                <input
                  onChange={handleChange}
                  onBlur={handleSchoolBlur}
                  name="school"
                  value={values.school}
                  className={schoolError && css.errorInput}
                  autoComplete="off"
                />
                {schoolError && <p className={css.errorText}>{schoolError}</p>}
              </div>
              <div className={css.input}>
                <p>Sorority</p>
                <input
                  onChange={handleChange}
                  onBlur={handleEmailBlur}
                  name="sorority"
                  value={values.sorority}
                  autoComplete="off"
                />
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

export default WaitlistPage;
