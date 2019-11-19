import React, { useState, useEffect } from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { PrimaryButton, SecondaryButton } from '../../components';

import css from './TransactionPanel.css';

// Functional component as a helper to build ActionButtons for
// provider when state is preauthorized
const SaleActionButtonsMaybe = props => {
  const [shouldDisable, setShouldDisable] = useState(true);
  const {
    className,
    rootClassName,
    showButtons,
    acceptInProgress,
    declineInProgress,
    acceptSaleError,
    declineSaleError,
    onAcceptSale,
    onDeclineSale,
    currentUser,
    startDate,
  } = props;

  const realStartingDate = new Date(startDate);
  realStartingDate.setDate(realStartingDate.getDate() + 1);
  const now = new Date();

  //I need to substract now - realStartingDate
  //If result is equal to or greater than 1, then I should disable the button
  const cantAccept = _ => {
    let cantAccept = false;
    const daysDifference = now - realStartingDate;
    if (daysDifference >= 1) cantAccept = true;
    return cantAccept;
  };

  //Add note stating that

  useEffect(() => {
    if (currentUser.attributes) {
      const { phoneNumber } = currentUser.attributes.profile.protectedData;
      // if user has already entered a phone number, then they can accept
      if (phoneNumber) {
        setShouldDisable(false);
      }
    }
  }, [currentUser.attributes]);

  const buttonsDisabled = acceptInProgress || declineInProgress || cantAccept();

  const acceptErrorMessage = acceptSaleError ? (
    <p className={css.actionError}>
      <FormattedMessage id="TransactionPanel.acceptSaleFailed" />
    </p>
  ) : null;
  const declineErrorMessage = declineSaleError ? (
    <p className={css.actionError}>
      <FormattedMessage id="TransactionPanel.declineSaleFailed" />
    </p>
  ) : null;

  const classes = classNames(rootClassName || css.actionButtons, className);

  return showButtons ? (
    <div className={classes}>
      <div className={css.actionErrors}>
        {acceptErrorMessage}
        {declineErrorMessage}
      </div>
      <div className={css.actionButtonWrapper}>
        <SecondaryButton
          inProgress={declineInProgress}
          disabled={buttonsDisabled}
          onClick={onDeclineSale}
        >
          <FormattedMessage id="TransactionPanel.declineButton" />
        </SecondaryButton>
        {shouldDisable ? (
          <p className={css.phoneWarning}>
            *If this is your first time accepting a rental, please go to your Account Settings and
            enter your phone number. Your number will only be shared with your renter so she can
            communicate with you.
          </p>
        ) : null}
        <PrimaryButton
          inProgress={acceptInProgress}
          disabled={shouldDisable}
          onClick={onAcceptSale}
        >
          <FormattedMessage id="TransactionPanel.acceptButton" />
        </PrimaryButton>
      </div>
    </div>
  ) : null;
};

export default SaleActionButtonsMaybe;
