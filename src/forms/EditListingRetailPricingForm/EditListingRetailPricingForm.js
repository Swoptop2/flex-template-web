import React from 'react';
import { bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import { required, minPricing, composeValidators } from '../../util/validators';
import { Form, Button, FieldTextInput } from '../../components';

import css from './EditListingRetailPricingForm.css';

export const EditListingRetailPricingFormComponent = props => (
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

      const retailPriceLabelMessage = intl.formatMessage({
        id: 'EditListingRetailPricingForm.retailPrice',
      });
      const retailPricePlaceholderMessage = intl.formatMessage({
        id: 'EditListingRetailPricingForm.priceInputPlaceholder',
      });

      const retailPricingRequiredMessage = intl.formatMessage({
        id: 'EditListingRetailPricingForm.retailPricingRequired',
      });

      const minimumPricingMessage = intl.formatMessage({
        id: 'EditListingRetailPricingForm.minimumPricing',
      });

      const { updateListingError, showListingsError } = fetchErrors || {};
      const errorMessage = updateListingError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingRetailPricingForm.updateFailed" />
        </p>
      ) : null;
      const errorMessageShowListing = showListingsError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingRetailPricingForm.showListingFailed" />
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

          <FieldTextInput
            id="retailPrice"
            name="retailPrice"
            className={css.policy}
            type="number"
            label={retailPriceLabelMessage}
            placeholder={retailPricePlaceholderMessage}
            validate={composeValidators(
              required(retailPricingRequiredMessage),
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

EditListingRetailPricingFormComponent.defaultProps = {
  selectedPlace: null,
  updateError: null,
};

EditListingRetailPricingFormComponent.propTypes = {
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

export default compose(injectIntl)(EditListingRetailPricingFormComponent);
