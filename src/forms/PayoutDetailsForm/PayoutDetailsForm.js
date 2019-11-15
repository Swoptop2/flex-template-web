import React from 'react';
import { bool, func, object, shape, string } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { Form as FinalForm } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import classNames from 'classnames';
import config from '../../config';
import { propTypes } from '../../util/types';
import { isStripeInvalidPostalCode, isStripeError } from '../../util/errors';
import * as validators from '../../util/validators';
import { Button, ExternalLink, FieldRadioButton, FieldSelect, Form } from '../../components';

import PayoutDetailsCompanyAccount from './PayoutDetailsCompanyAccount';
import PayoutDetailsIndividualAccount from './PayoutDetailsIndividualAccount';
import css from './PayoutDetailsForm.css';

const supportedCountries = config.stripe.supportedCountries.map(c => c.code);

export const stripeCountryConfigs = countryCode => {
  const country = config.stripe.supportedCountries.find(c => c.code === countryCode);

  if (!country) {
    throw new Error(`Country code not found in Stripe config ${countryCode}`);
  }
  return country;
};

const PayoutDetailsFormComponent = props => (
  <FinalForm
    {...props}
    mutators={{
      ...arrayMutators,
    }}
    render={fieldRenderProps => {
      const {
        className,
        createStripeAccountError,
        disabled,
        handleSubmit,
        inProgress,
        intl,
        invalid,
        pristine,
        ready,
        submitButtonText,
        currentUserId,
        currentUser,
        values,
      } = fieldRenderProps;

      const { country } = values;
      let state, city;
      if (currentUser) {
        state = currentUser.attributes.profile.protectedData.state;
        city = currentUser.attributes.profile.protectedData.city;
      }

      const accountType = 'individual';

      const individualAccountLabel = intl.formatMessage({
        id: 'PayoutDetailsForm.individualAccount',
      });

      const countryLabel = intl.formatMessage({ id: 'PayoutDetailsForm.countryLabel' });
      const countryPlaceholder = intl.formatMessage({
        id: 'PayoutDetailsForm.countryPlaceholder',
      });
      const countryRequired = validators.required(
        intl.formatMessage({
          id: 'PayoutDetailsForm.countryRequired',
        })
      );

      const classes = classNames(css.root, className, {
        [css.disabled]: disabled,
      });

      const submitInProgress = inProgress;
      const submitDisabled = pristine || invalid || disabled || submitInProgress;
      const showAsRequired = pristine;

      const showIndividual = country && accountType && accountType === 'individual';
      const showCompany = country && accountType && accountType === 'company';

      let error = null;

      if (isStripeInvalidPostalCode(createStripeAccountError)) {
        error = (
          <div className={css.error}>
            <FormattedMessage id="PayoutDetailsForm.createStripeAccountFailedInvalidPostalCode" />
          </div>
        );
      } else if (isStripeError(createStripeAccountError)) {
        const stripeMessage = createStripeAccountError.apiErrors[0].meta.stripeMessage;
        error = (
          <div className={css.error}>
            <FormattedMessage
              id="PayoutDetailsForm.createStripeAccountFailedWithStripeError"
              values={{ stripeMessage }}
            />
          </div>
        );
      } else if (createStripeAccountError) {
        error = (
          <div className={css.error}>
            <FormattedMessage id="PayoutDetailsForm.createStripeAccountFailed" />
          </div>
        );
      }

      const stripeConnectedAccountTermsLink = (
        <ExternalLink href="https://stripe.com/connect-account/legal" className={css.termsLink}>
          <FormattedMessage id="PayoutDetailsForm.stripeConnectedAccountTermsLink" />
        </ExternalLink>
      );

      return config.stripe.publishableKey ? (
        <Form className={classes} onSubmit={handleSubmit}>
          <div className={css.sectionContainer}>
            <h3 className={css.subTitle}>
              <FormattedMessage id="PayoutDetailsForm.accountTypeTitle" />
            </h3>
            <div className={css.radioButtonRow}>
              <FieldRadioButton
                id="individual"
                name="accountType"
                label={individualAccountLabel}
                value="individual"
                showAsRequired={showAsRequired}
                checked={true}
              />
            </div>
          </div>

          {accountType ? (
            <React.Fragment>
              <div className={css.sectionContainer}>
                <h3 className={css.subTitle}>Country</h3>
                <FieldSelect
                  id="country"
                  name="country"
                  className={css.selectCountry}
                  autoComplete="country"
                  label={countryLabel}
                  validate={countryRequired}
                  defaultValue="US"
                  disabled={true}
                >
                  <option disabled value="">
                    {countryPlaceholder}
                  </option>
                  {supportedCountries.map(c => (
                    <option key={c} value={c}>
                      {intl.formatMessage({ id: `PayoutDetailsForm.countryNames.${c}` })}
                    </option>
                  ))}
                </FieldSelect>
              </div>

              {showIndividual ? (
                <PayoutDetailsIndividualAccount
                  fieldRenderProps={fieldRenderProps}
                  country={country}
                  currentUserId={currentUserId}
                  state={state}
                  city={city}
                />
              ) : showCompany ? (
                <PayoutDetailsCompanyAccount
                  fieldRenderProps={fieldRenderProps}
                  country={country}
                />
              ) : null}

              {error}

              <p className={css.termsText}>
                <FormattedMessage
                  id="PayoutDetailsForm.stripeToSText"
                  values={{ stripeConnectedAccountTermsLink }}
                />
              </p>
              <Button
                className={css.submitButton}
                type="submit"
                inProgress={submitInProgress}
                disabled={submitDisabled}
                ready={ready}
              >
                {submitButtonText ? (
                  submitButtonText
                ) : (
                  <FormattedMessage id="PayoutDetailsForm.submitButtonText" />
                )}
              </Button>
            </React.Fragment>
          ) : null}
        </Form>
      ) : (
        <div className={css.missingStripeKey}>
          <FormattedMessage id="PayoutDetailsForm.missingStripeKey" />
        </div>
      );
    }}
  />
);

PayoutDetailsFormComponent.defaultProps = {
  className: null,
  createStripeAccountError: null,
  disabled: false,
  inProgress: false,
  ready: false,
  submitButtonText: null,
  currentUserId: null,
  fieldRenderProps: null,
};

PayoutDetailsFormComponent.propTypes = {
  className: string,
  createStripeAccountError: object,
  disabled: bool,
  inProgress: bool,
  ready: bool,
  submitButtonText: string,
  currentUserId: propTypes.uuid,
  fieldRenderProps: shape({
    handleSubmit: func,
    invalid: bool,
    pristine: bool,
    values: object,
  }),

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  const { currentUser } = state.user;
  return { currentUser };
};

const PayoutDetailsForm = compose(
  connect(mapStateToProps),
  injectIntl
)(PayoutDetailsFormComponent);

export default PayoutDetailsForm;
