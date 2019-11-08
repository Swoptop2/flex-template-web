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
  } = props;

  useEffect(() => {
    if (currentUser.attributes) {
      const { phone } = currentUser.attributes.profile.protectedData;
      // if user has already entered a phone number, then they can accept
      if (phone) {
        setShouldDisable(false);
      }
    }
  }, [currentUser.attributes]);

  const buttonsDisabled = acceptInProgress || declineInProgress;

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
            *If this is your first time accepting a rental, please go to your Profile Settings and
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
