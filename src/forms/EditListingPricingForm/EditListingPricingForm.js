import React from 'react';
import { bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import config from '../../config';
import { LINE_ITEM_NIGHT, LINE_ITEM_DAY, propTypes } from '../../util/types';
import * as validators from '../../util/validators';
import { formatMoney } from '../../util/currency';
import { types as sdkTypes } from '../../util/sdkLoader';
import { Button, Form, FieldCurrencyInput, FieldTextInput } from '../../components';
import css from './EditListingPricingForm.css';

const { Money } = sdkTypes;

export const EditListingPricingFormComponent = props => (
  <FinalForm
    {...props}
    render={formRenderProps => {
      const {
        className,
        disabled,
        ready,
        handleSubmit,
        intl,
        invalid,
        pristine,
        saveActionMsg,
        updated,
        updateInProgress,
        fetchErrors,
      } = formRenderProps;

      const unitType = config.bookingUnitType;
      const isNightly = unitType === LINE_ITEM_NIGHT;
      const isDaily = unitType === LINE_ITEM_DAY;

      const translationKey = isNightly
        ? 'EditListingPricingForm.pricePerNight'
        : isDaily
        ? 'EditListingPricingForm.pricePerDay'
        : 'EditListingPricingForm.pricePerUnit';

      // retail price
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
      const noDecimalsMessage = intl.formatMessage({
        id: 'EditListingRetailPricingForm.noDecimals',
      });

      // damage cost
      const damagePriceLabelMessage = intl.formatMessage({
        id: 'EditListingDamagePricingForm.damagePrice',
      });
      const damagePricePlaceholderMessage = intl.formatMessage({
        id: 'EditListingDamagePricingForm.priceInputPlaceholder',
      });
      const damagePricingRequiredMessage = intl.formatMessage({
        id: 'EditListingDamagePricingForm.damagePricingRequired',
      });
      const minimumDamagePricingMessage = intl.formatMessage({
        id: 'EditListingDamagePricingForm.minimumPricing',
      });

      const pricePerUnitMessage = intl.formatMessage({
        id: translationKey,
      });

      const pricePlaceholderMessage = intl.formatMessage({
        id: 'EditListingPricingForm.priceInputPlaceholder',
      });

      const priceRequired = validators.required(
        intl.formatMessage({
          id: 'EditListingPricingForm.priceRequired',
        })
      );
      const noDecimalsAllowed = validators.noDecimalsObj(noDecimalsMessage);
      const minPrice = new Money(config.listingMinimumPriceSubUnits, config.currency);
      const maxPrice = new Money(config.listingMaximumPriceSubUnits, config.currency);
      const minPriceRequired = validators.moneySubUnitAmountAtLeast(
        intl.formatMessage(
          {
            id: 'EditListingPricingForm.priceTooLow',
          },
          {
            minPrice: formatMoney(intl, minPrice),
          }
        ),
        config.listingMinimumPriceSubUnits
      );
      const maxPriceRequired = validators.moneySubUnitAmountAtMost(
        intl.formatMessage(
          {
            id: 'EditListingPricingForm.priceTooHigh',
          },
          {
            maxPrice: formatMoney(intl, maxPrice),
          }
        ),
        config.listingMaximumPriceSubUnits
      );
      const priceValidators =
        config.listingMinimumPriceSubUnits && config.listingMaximumPriceSubUnits
          ? validators.composeValidators(
              noDecimalsAllowed,
              priceRequired,
              minPriceRequired,
              maxPriceRequired
            )
          : priceRequired;

      const classes = classNames(css.root, className);
      const submitReady = (updated && pristine) || ready;
      const submitInProgress = updateInProgress;
      const submitDisabled = invalid || disabled || submitInProgress;
      const { updateListingError, showListingsError } = fetchErrors || {};

      return (
        <Form onSubmit={handleSubmit} className={classes}>
          {updateListingError ? (
            <p className={css.error}>
              <FormattedMessage id="EditListingPricingForm.updateFailed" />
            </p>
          ) : null}
          {showListingsError ? (
            <p className={css.error}>
              <FormattedMessage id="EditListingPricingForm.showListingFailed" />
            </p>
          ) : null}
          <FieldTextInput
            id="retailPrice"
            name="retailPrice"
            className={css.item}
            type="number"
            label={retailPriceLabelMessage}
            placeholder={retailPricePlaceholderMessage}
            validate={validators.composeValidators(
              validators.required(retailPricingRequiredMessage),
              validators.minPricing(minimumPricingMessage),
              validators.noDecimals(noDecimalsMessage)
            )}
          />
          <FieldTextInput
            id="damageCost"
            name="damageCost"
            className={css.item}
            type="number"
            label={damagePriceLabelMessage}
            placeholder={damagePricePlaceholderMessage}
            validate={validators.composeValidators(
              validators.required(damagePricingRequiredMessage),
              validators.minPricing(minimumDamagePricingMessage),
              validators.noDecimals(noDecimalsMessage)
            )}
          />
          <FieldCurrencyInput
            id="price"
            name="price"
            className={css.priceInput}
            autoFocus
            label={pricePerUnitMessage}
            placeholder={pricePlaceholderMessage}
            currencyConfig={config.currencyConfig}
            validate={priceValidators}
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

EditListingPricingFormComponent.defaultProps = { fetchErrors: null };

EditListingPricingFormComponent.propTypes = {
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  disabled: bool.isRequired,
  ready: bool.isRequired,
  updated: bool.isRequired,
  updateInProgress: bool.isRequired,
  fetchErrors: shape({
    showListingsError: propTypes.error,
    updateListingError: propTypes.error,
  }),
};

export default compose(injectIntl)(EditListingPricingFormComponent);
