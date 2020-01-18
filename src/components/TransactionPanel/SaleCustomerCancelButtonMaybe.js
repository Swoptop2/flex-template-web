import React from 'react';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { PrimaryButton } from '..';

import css from './TransactionPanel.css';

// Functional component as a helper to build ActionButtons for
// provider when state is preauthorized
const SaleCustomerCancelButtonMaybe = props => {
  const {
    className,
    rootClassName,
    showButtons,
    cancelBookingInProgress,
    cancelBookingError,
    onCancelBookingRequest,
    startDate,
  } = props;

  //TODO: COMMENT OUT DEADLINE LOGIC AND START OVER
  //OBJECTIVE: HAVE PROVIDER CANCEL UP TO 11:59PM ON THE EVE OF TH BOOKING STARTING PERIOD

  //startDate comes in as one day before, so one day needs to be added to calculate hours correctly
  const realStartingDate = new Date(startDate);
  realStartingDate.setDate(realStartingDate.getDate() + 1);

  const now = new Date();

  const cantCancelBooking = _ => {
    let cantCancel = false;
    const daysDifference = now.getDate() - realStartingDate.getDate();
    if (daysDifference >= 1) cantCancel = true;
    return cantCancel;
  };

  const buttonsDisabled = cancelBookingInProgress || cantCancelBooking();

  const cancelErrorMessage = cancelBookingError ? (
    <p className={css.actionError}>
      <FormattedMessage id="TransactionPanel.cancelBookingRequestFailed" />
    </p>
  ) : null;

  const classes = classNames(rootClassName || css.actionButtons, className);

  return showButtons ? (
    <div className={classes}>
      <div className={css.actionErrors}>{cancelErrorMessage}</div>
      <div className={css.actionButtonWrapper}>
        <PrimaryButton
          inProgress={cancelBookingInProgress}
          disabled={buttonsDisabled}
          onClick={onCancelBookingRequest}
        >
          <FormattedMessage id="TransactionPanel.cancelBookingRequest" />
        </PrimaryButton>
      </div>
    </div>
  ) : null;
};

export default SaleCustomerCancelButtonMaybe;
