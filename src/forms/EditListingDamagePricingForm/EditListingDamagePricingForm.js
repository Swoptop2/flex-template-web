import React from 'react';
import { bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import { required, minPricing, composeValidators } from '../../util/validators';
import { Form, Button, FieldTextInput } from '../../components';

import css from './EditListingDamagePricingForm.css';

export const EditListingDamagePricingFormComponent = props => (
  <FinalForm
    {...props}
    render={fieldRenderProps => {
      const {
        className,
        disabled,
        handleSubmit,
        intl,
        invalid,
        pristine,
        saveActionMsg,
        updated,
        updateInProgress,
        fetchErrors,
      } = fieldRenderProps;

      const damagePriceLabelMessage = intl.formatMessage({
        id: 'EditListingDamagePricingForm.damagePrice',
      });
      const damagePriceExplanation = intl.formatMessage({
        id: 'EditListingDamagePricingForm.damagePriceExplanation',
      });
      const damagePricePlaceholderMessage = intl.formatMessage({
        id: 'EditListingDamagePricingForm.priceInputPlaceholder',
      });
      const damagePricingRequiredMessage = intl.formatMessage({
        id: 'EditListingDamagePricingForm.damagePricingRequired',
      });
      const minimumPricingMessage = intl.formatMessage({
        id: 'EditListingDamagePricingForm.minimumPricing',
      });

      const { updateListingError, showListingsError } = fetchErrors || {};
      const errorMessage = updateListingError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingDamagePricingForm.updateFailed" />
        </p>
      ) : null;
      const errorMessageShowListing = showListingsError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingDamagePricingForm.showListingFailed" />
        </p>
      ) : null;

      const classes = classNames(css.root, className);
      const submitReady = updated && pristine;
      const submitInProgress = updateInProgress;
      const submitDisabled = invalid || disabled || submitInProgress;

      return (
        <Form className={classes} onSubmit={handleSubmit}>
          {errorMessage}
          {errorMessageShowListing}
          <p>{damagePriceExplanation}</p>
          <FieldTextInput
            id="damagePrice"
            name="damagePrice"
            className={css.policy}
            type="number"
            label={damagePriceLabelMessage}
            placeholder={damagePricePlaceholderMessage}
            validate={composeValidators(
              required(damagePricingRequiredMessage),
              minPricing(minimumPricingMessage)
            )}
          />
          <Button
            className={css.submitButton}
            type="submit"
            inProgress={submitInProgress}
            disabled={submitDisabled}
            ready={submitReady}
          >
            {saveActionMsg}
          </Button>
        </Form>
      );
    }}
  />
);

EditListingDamagePricingFormComponent.defaultProps = {
  selectedPlace: null,
  updateError: null,
};

EditListingDamagePricingFormComponent.propTypes = {
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  selectedPlace: propTypes.place,
  updated: bool.isRequired,
  updateInProgress: bool.isRequired,
  fetchErrors: shape({
    showListingsError: propTypes.error,
    updateListingError: propTypes.error,
  }),
};

export default compose(injectIntl)(EditListingDamagePricingFormComponent);
