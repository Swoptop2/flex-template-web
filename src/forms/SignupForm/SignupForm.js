import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { Form as FinalForm } from 'react-final-form';
import classNames from 'classnames';
import * as validators from '../../util/validators';
import {
  Form,
  PrimaryButton,
  FieldTextInput,
  FieldSelectState,
  FieldSelect,
} from '../../components';
import csc from 'country-state-city';

import css from './SignupForm.css';

const KEY_CODE_ENTER = 13;

const SignupFormComponent = props => {
  const [states] = useState(csc.getStatesOfCountry('231'));
  const [cities, setCities] = useState([]);

  const changeState = e => {
    setCities(
      csc.getCitiesOfState(
        e.target.options[e.target.options.selectedIndex].getAttribute('data-key')
      )
    );
  };
  return (
    <FinalForm
      {...props}
      render={fieldRenderProps => {
        const {
          rootClassName,
          className,
          formId,
          handleSubmit,
          inProgress,
          invalid,
          intl,
          onOpenTermsOfService,
        } = fieldRenderProps;

        // email
        const emailLabel = intl.formatMessage({
          id: 'SignupForm.emailLabel',
        });
        const emailPlaceholder = intl.formatMessage({
          id: 'SignupForm.emailPlaceholder',
        });
        const emailRequiredMessage = intl.formatMessage({
          id: 'SignupForm.emailRequired',
        });
        const emailRequired = validators.required(emailRequiredMessage);
        const emailInvalidMessage = intl.formatMessage({
          id: 'SignupForm.emailInvalid',
        });
        const emailValid = validators.emailFormatValid(emailInvalidMessage);

        // password
        const passwordLabel = intl.formatMessage({
          id: 'SignupForm.passwordLabel',
        });
        const passwordPlaceholder = intl.formatMessage({
          id: 'SignupForm.passwordPlaceholder',
        });
        const passwordRequiredMessage = intl.formatMessage({
          id: 'SignupForm.passwordRequired',
        });
        const passwordMinLengthMessage = intl.formatMessage(
          {
            id: 'SignupForm.passwordTooShort',
          },
          {
            minLength: validators.PASSWORD_MIN_LENGTH,
          }
        );
        const passwordMaxLengthMessage = intl.formatMessage(
          {
            id: 'SignupForm.passwordTooLong',
          },
          {
            maxLength: validators.PASSWORD_MAX_LENGTH,
          }
        );
        const passwordMinLength = validators.minLength(
          passwordMinLengthMessage,
          validators.PASSWORD_MIN_LENGTH
        );
        const passwordMaxLength = validators.maxLength(
          passwordMaxLengthMessage,
          validators.PASSWORD_MAX_LENGTH
        );
        const passwordRequired = validators.requiredStringNoTrim(passwordRequiredMessage);
        const passwordValidators = validators.composeValidators(
          passwordRequired,
          passwordMinLength,
          passwordMaxLength
        );

        // firstName
        const firstNameLabel = intl.formatMessage({
          id: 'SignupForm.firstNameLabel',
        });
        const firstNamePlaceholder = intl.formatMessage({
          id: 'SignupForm.firstNamePlaceholder',
        });
        const firstNameRequiredMessage = intl.formatMessage({
          id: 'SignupForm.firstNameRequired',
        });
        const firstNameRequired = validators.required(firstNameRequiredMessage);

        // lastName
        const lastNameLabel = intl.formatMessage({
          id: 'SignupForm.lastNameLabel',
        });
        const lastNamePlaceholder = intl.formatMessage({
          id: 'SignupForm.lastNamePlaceholder',
        });
        const lastNameRequiredMessage = intl.formatMessage({
          id: 'SignupForm.lastNameRequired',
        });
        const lastNameRequired = validators.required(lastNameRequiredMessage);

        const classes = classNames(rootClassName || css.root, className);
        const submitInProgress = inProgress;
        const submitDisabled = invalid || submitInProgress;

        // state
        const stateRequiredMessage = 'You must select your state';
        const stateRequired = validators.required(stateRequiredMessage);
        // city
        const cityRequiredMessage = 'You must select your city';
        const cityRequired = validators.required(cityRequiredMessage);

        const schoolRequiredMessage = 'You must enter the College you go to';
        const schoolRequired = validators.required(schoolRequiredMessage);

        const handleTermsKeyUp = e => {
          // Allow click action with keyboard like with normal links
          if (e.keyCode === KEY_CODE_ENTER) {
            onOpenTermsOfService();
          }
        };
        const termsLink = (
          <span
            className={css.termsLink}
            onClick={onOpenTermsOfService}
            role="button"
            tabIndex="0"
            onKeyUp={handleTermsKeyUp}
          >
            <FormattedMessage id="SignupForm.termsAndConditionsLinkText" />
          </span>
        );

        return (
          <Form className={classes} onSubmit={handleSubmit}>
            <div>
              <FieldTextInput
                type="email"
                id={formId ? `${formId}.email` : 'email'}
                name="email"
                autoComplete="email"
                label={emailLabel}
                placeholder={emailPlaceholder}
                validate={validators.composeValidators(emailRequired, emailValid)}
              />
              <div className={css.name}>
                <FieldTextInput
                  className={css.firstNameRoot}
                  type="text"
                  id={formId ? `${formId}.fname` : 'fname'}
                  name="fname"
                  autoComplete="given-name"
                  label={firstNameLabel}
                  placeholder={firstNamePlaceholder}
                  validate={firstNameRequired}
                />
                <FieldTextInput
                  className={css.lastNameRoot}
                  type="text"
                  id={formId ? `${formId}.lname` : 'lname'}
                  name="lname"
                  autoComplete="family-name"
                  label={lastNameLabel}
                  placeholder={lastNamePlaceholder}
                  validate={lastNameRequired}
                />
              </div>
              <div className={css.name}>
                <FieldTextInput
                  className={css.schoolRoot}
                  type="text"
                  id="school"
                  name="school"
                  label="College"
                  placeholder="University of ..."
                  validate={schoolRequired}
                />
                <FieldTextInput
                  className={css.schoolRoot}
                  type="text"
                  id="sorority"
                  name="sorority"
                  label="Sorority"
                  placeholder="Alpha Chi Omega"
                />
              </div>
              <p className={css.note}>
                *Choose the location from which you want to rent from or want users to rent from
                you.
              </p>
              <FieldSelectState
                className={css.fieldSelect}
                label="State"
                validate={stateRequired}
                name="state"
                id="state"
                changeState={changeState}
              >
                <option disabled value="">
                  Choose your state...
                </option>
                {states.map(state => (
                  <option value={state.name} data-key={state.id} key={state.id}>
                    {state.name}
                  </option>
                ))}
              </FieldSelectState>
              <FieldSelect
                className={css.fieldSelect}
                label="City"
                name="city"
                id="city"
                validate={cityRequired}
              >
                <option disabled value="">
                  Choose your city...
                </option>
                {cities.map(city => (
                  <option value={city.name} key={city.id}>
                    {city.name}
                  </option>
                ))}
              </FieldSelect>
              <FieldTextInput
                className={css.password}
                type="password"
                id={formId ? `${formId}.password` : 'password'}
                name="password"
                autoComplete="new-password"
                label={passwordLabel}
                placeholder={passwordPlaceholder}
                validate={passwordValidators}
              />
            </div>

            <div className={css.bottomWrapper}>
              <p className={css.bottomWrapperText}>
                <span className={css.termsText}>
                  <FormattedMessage
                    id="SignupForm.termsAndConditionsAcceptText"
                    values={{ termsLink }}
                  />
                </span>
              </p>
              <PrimaryButton type="submit" inProgress={submitInProgress} disabled={submitDisabled}>
                <FormattedMessage id="SignupForm.signUp" />
              </PrimaryButton>
            </div>
          </Form>
        );
      }}
    />
  );
};

SignupFormComponent.defaultProps = { inProgress: false };

const { bool, func } = PropTypes;

SignupFormComponent.propTypes = {
  inProgress: bool,

  onOpenTermsOfService: func.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const SignupForm = compose(injectIntl)(SignupFormComponent);
SignupForm.displayName = 'SignupForm';

export default SignupForm;
