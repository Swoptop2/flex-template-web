import React, { useState, useEffect } from 'react';
import { bool, func, shape, string, arrayOf } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import { required } from '../../util/validators';
import { Form, Button, FieldTextInput, FieldSelect } from '../../components';

import css from './EditListingDetailsForm.css';

export const EditListingDetailsFormComponent = props => {
  const [missingAvatar, setMissingAvatar] = useState(true);
  const { currentUser } = props;

  useEffect(() => {
    if (currentUser) {
      if (currentUser.profileImage) {
        setMissingAvatar(false);
      }
    }
  }, [currentUser]);

  return (
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
          items,
          colors,
          sizes,
        } = fieldRenderProps;

        // item
        const itemPlaceholder = intl.formatMessage({
          id: 'EditListingItemForm.itemPlaceholder',
        });
        const itemLabel = intl.formatMessage({
          id: 'EditListingItemForm.itemLabel',
        });
        const itemRequired = required(
          intl.formatMessage({
            id: 'EditListingItemForm.itemRequired',
          })
        );

        // color
        const colorPlaceholder = intl.formatMessage({
          id: 'EditListingColorForm.colorPlaceholder',
        });
        const colorLabel = intl.formatMessage({
          id: 'EditListingColorForm.colorLabel',
        });
        const colorRequired = required(
          intl.formatMessage({
            id: 'EditListingColorForm.colorRequired',
          })
        );

        // size
        const sizePlaceholder = intl.formatMessage({
          id: 'EditListingSizeForm.sizePlaceholder',
        });
        const sizeLabel = intl.formatMessage({
          id: 'EditListingSizeForm.sizeLabel',
        });
        const sizeRequired = required(
          intl.formatMessage({
            id: 'EditListingSizeForm.sizeRequired',
          })
        );

        // brand
        const brandLabelMessage = intl.formatMessage({
          id: 'EditListingBrandForm.brandLabel',
        });
        const brandPlaceholderMessage = intl.formatMessage({
          id: 'EditListingBrandForm.brandPlaceholder',
        });
        const brandRequiredMessage = intl.formatMessage({
          id: 'EditListingBrandForm.brandRequired',
        });
        const brandRequired = required(brandRequiredMessage);

        const { updateListingError, showListingsError } = fetchErrors || {};
        const errorMessage = updateListingError ? (
          <p className={css.error}>
            <FormattedMessage id="EditListingBrandForm.updateFailed" />
          </p>
        ) : null;
        const errorMessageShowListing = showListingsError ? (
          <p className={css.error}>
            <FormattedMessage id="EditListingBrandForm.showListingFailed" />
          </p>
        ) : null;

        const classes = classNames(css.root, className);
        const submitReady = updated && pristine;
        const submitInProgress = updateInProgress;
        const submitDisabled = invalid || disabled || submitInProgress || missingAvatar;

        return (
          <Form className={classes} onSubmit={handleSubmit}>
            {errorMessage}
            {errorMessageShowListing}

            <FieldSelect
              className={css.item}
              name="item"
              id="item"
              validate={itemRequired}
              label={itemLabel}
            >
              <option value="">{itemPlaceholder}</option>
              {items.map(c => (
                <option key={c.key} value={c.key}>
                  {c.label}
                </option>
              ))}
            </FieldSelect>

            <FieldSelect
              className={css.item}
              name="color"
              id="color"
              validate={colorRequired}
              label={colorLabel}
            >
              <option value="">{colorPlaceholder}</option>
              {colors.map(c => (
                <option key={c.key} value={c.key}>
                  {c.label}
                </option>
              ))}
            </FieldSelect>

            <FieldSelect
              className={css.item}
              name="size"
              id="size"
              validate={sizeRequired}
              label={sizeLabel}
            >
              <option value="">{sizePlaceholder}</option>
              {sizes.map(c => (
                <option key={c.key} value={c.key}>
                  {c.label}
                </option>
              ))}
            </FieldSelect>

            <FieldTextInput
              id="brandStore"
              name="brandStore"
              className={css.policy}
              type="text"
              label={brandLabelMessage}
              placeholder={brandPlaceholderMessage}
              validate={brandRequired}
            />
            {missingAvatar ? (
              <p className={css.note}>
                *You need to add a profile picture before you can proceed. Please go to your Profile
                Settings to do so.
              </p>
            ) : null}
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
};

EditListingDetailsFormComponent.defaultProps = {
  selectedPlace: null,
  updateError: null,
};

EditListingDetailsFormComponent.propTypes = {
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
  items: arrayOf(
    shape({
      key: string.isRequired,
      label: string.isRequired,
    })
  ).isRequired,
  colors: arrayOf(
    shape({
      key: string.isRequired,
      label: string.isRequired,
    })
  ).isRequired,
  sizes: arrayOf(
    shape({
      key: string.isRequired,
      label: string.isRequired,
    })
  ).isRequired,
};

export default compose(injectIntl)(EditListingDetailsFormComponent);
