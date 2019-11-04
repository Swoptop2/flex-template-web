import React from 'react';
import { arrayOf, bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import { Form, Button, FieldSelect } from '../../components';
import { required } from '../../util/validators';

import css from './EditListingColorForm.css';

export const EditListingColorFormComponent = props => (
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
        colors,
      } = fieldRenderProps;

      const colorPlaceholder = intl.formatMessage({
        id: 'EditListingColorForm.colorPlaceholder',
      });
      const colorLabel = intl.formatMessage({
        id: 'EditListingColorForm.colorLabel',
      });

      const errorMessage = updateError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingColorForm.updateFailed" />
        </p>
      ) : null;

      const colorRequired = required(
        intl.formatMessage({
          id: 'EditListingColorForm.colorRequired',
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
            className={css.color}
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

EditListingColorFormComponent.defaultProps = {
  selectedPlace: null,
  updateError: null,
};

EditListingColorFormComponent.propTypes = {
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  updated: bool.isRequired,
  updateError: propTypes.error,
  updateInProgress: bool.isRequired,
  colors: arrayOf(
    shape({
      key: string.isRequired,
      label: string.isRequired,
    })
  ).isRequired,
};

export default compose(injectIntl)(EditListingColorFormComponent);
