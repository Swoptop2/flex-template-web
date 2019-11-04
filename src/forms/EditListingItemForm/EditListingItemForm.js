import React from 'react';
import { arrayOf, bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import { Form, Button, FieldSelect } from '../../components';
import { required } from '../../util/validators';

import css from './EditListingItemForm.css';

export const EditListingItemFormComponent = props => (
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
        updateError,
        updateInProgress,
        items,
      } = fieldRenderProps;

      const itemPlaceholder = intl.formatMessage({
        id: 'EditListingItemForm.itemPlaceholder',
      });
      const itemLabel = intl.formatMessage({
        id: 'EditListingItemForm.itemLabel',
      });

      const errorMessage = updateError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingItemForm.updateFailed" />
        </p>
      ) : null;

      const itemRequired = required(
        intl.formatMessage({
          id: 'EditListingItemForm.itemRequired',
        })
      );

      const classes = classNames(css.root, className);
      const submitReady = updated && pristine;
      const submitInProgress = updateInProgress;
      const submitDisabled = invalid || disabled || submitInProgress;

      return (
        <Form className={classes} onSubmit={handleSubmit}>
          {errorMessage}

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

EditListingItemFormComponent.defaultProps = {
  selectedPlace: null,
  updateError: null,
};

EditListingItemFormComponent.propTypes = {
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  updated: bool.isRequired,
  updateError: propTypes.error,
  updateInProgress: bool.isRequired,
  items: arrayOf(
    shape({
      key: string.isRequired,
      label: string.isRequired,
    })
  ).isRequired,
};

export default compose(injectIntl)(EditListingItemFormComponent);
