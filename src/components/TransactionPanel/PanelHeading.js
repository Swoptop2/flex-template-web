import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { createSlug, stringify } from '../../util/urlHelpers';
import { NamedLink } from '../../components';
import axios from 'axios';
import swal from 'sweetalert';

import css from './TransactionPanel.css';

export const HEADING_ENQUIRED = 'enquired';
export const HEADING_PAYMENT_PENDING = 'pending-payment';
export const HEADING_PAYMENT_EXPIRED = 'payment-expired';
export const HEADING_REQUESTED = 'requested';
export const HEADING_ACCEPTED = 'accepted';
export const HEADING_DECLINED = 'declined';
export const HEADING_CANCELED = 'canceled';
export const HEADING_DELIVERED = 'deliveded';

const createListingLink = (listingId, label, listingDeleted, searchParams = {}, className = '') => {
  if (!listingDeleted) {
    const params = { id: listingId, slug: createSlug(label) };
    const to = { search: stringify(searchParams) };
    return (
      <NamedLink className={className} name="ListingPage" params={params} to={to}>
        {label}
      </NamedLink>
    );
  } else {
    return <FormattedMessage id="TransactionPanel.deletedListingOrderTitle" />;
  }
};

const ListingDeletedInfoMaybe = props => {
  return props.listingDeleted ? (
    <p className={css.transactionInfoMessage}>
      <FormattedMessage id="TransactionPanel.messageDeletedListing" />
    </p>
  ) : null;
};

const HeadingCustomer = props => {
  const { className, id, values, listingDeleted, showButton, reportIssueWithItem } = props;

  return (
    <React.Fragment>
      <h1 className={className}>
        <span className={css.mainTitle}>
          <FormattedMessage id={id} values={values} />
        </span>
      </h1>
      {showButton ? (
        <div className={css.mobileBtnContainer}>
          <button onClick={reportIssueWithItem} className={css.reportBtn}>
            Click to report an issue with your item
          </button>
        </div>
      ) : null}
      <ListingDeletedInfoMaybe listingDeleted={listingDeleted} />
    </React.Fragment>
  );
};

const HeadingCustomerWithSubtitle = props => {
  const {
    className,
    id,
    values,
    subtitleId,
    subtitleValues,
    children,
    listingDeleted,
    showButton,
    reportIssueWithItem,
  } = props;

  return (
    <React.Fragment>
      <h1 className={className}>
        <span className={css.mainTitle}>
          <FormattedMessage id={id} values={values} />
        </span>
        <FormattedMessage id={subtitleId} values={subtitleValues} />
      </h1>
      {showButton ? (
        <div className={css.mobileBtnContainer}>
          <button onClick={reportIssueWithItem} className={css.reportBtn}>
            Click to report an issue with your item
          </button>
        </div>
      ) : null}
      {children}
      <ListingDeletedInfoMaybe listingDeleted={listingDeleted} />
    </React.Fragment>
  );
};

const CustomerBannedInfoMaybe = props => {
  return props.isCustomerBanned ? (
    <p className={css.transactionInfoMessage}>
      <FormattedMessage id="TransactionPanel.customerBannedStatus" />
    </p>
  ) : null;
};

const HeadingProvider = props => {
  const {
    className,
    id,
    values,
    isCustomerBanned,
    children,
    reportUnreturnedItem,
    reportDamagedItem,
    isDelivered,
  } = props;
  return (
    <React.Fragment>
      <div>
        <h1 className={className}>
          <span className={css.mainTitle}>
            <FormattedMessage id={id} values={values} />
          </span>
        </h1>
        {isDelivered ? (
          <div className={css.mobileBtnContainer}>
            <button onClick={reportUnreturnedItem} className={css.reportBtn}>
              Click to report unreturned item
            </button>
            <button onClick={reportDamagedItem} className={css.reportBtn}>
              Click to report damaged item
            </button>
          </div>
        ) : null}
      </div>
      {children}
      <CustomerBannedInfoMaybe isCustomerBanned={isCustomerBanned} />
    </React.Fragment>
  );
};

// Functional component as a helper to choose and show Order or Sale heading info:
// title, subtitle, and message
const PanelHeading = props => {
  const {
    className,
    rootClassName,
    panelHeadingState,
    customerName,
    providerName,
    listingId,
    listingTitle,
    listingDeleted,
    isCustomerBanned,
    transaction,
  } = props;
  const isCustomer = props.transactionRole === 'customer';

  const defaultRootClassName = isCustomer ? css.headingOrder : css.headingSale;
  const titleClasses = classNames(rootClassName || defaultRootClassName, className);
  const listingLink = createListingLink(listingId, listingTitle, listingDeleted);
  // info needed for reporting an issue
  const {
    customer: {
      attributes: {
        profile: { displayName: customerDisplayName },
      },
    },
    provider: {
      attributes: {
        profile: { displayName: providerDisplayName },
      },
    },
    booking: {
      attributes: { start, end },
    },
    listing: {
      attributes: {
        price: { amount },
      },
    },
  } = transaction;
  // get customer and provider phone and email from publicData conditionally
  const customerPhone = transaction.customer.attributes.profile.publicData.phoneNumber
    ? transaction.customer.attributes.profile.publicData.phoneNumber
    : null;
  const customerEmail = transaction.customer.attributes.profile.publicData.email
    ? transaction.customer.attributes.profile.publicData.email
    : null;
  const providerPhone = transaction.provider.attributes.profile.publicData.phoneNumber
    ? transaction.provider.attributes.profile.publicData.phoneNumber
    : null;
  const providerEmail = transaction.provider.attributes.profile.publicData.email
    ? transaction.provider.attributes.profile.publicData.email
    : null;

  const price = amount / 100;
  // start needs to get one day added
  const startCopy = Object.assign(start);
  const modifedStart = new Date(startCopy);
  const correctStart = new Date(modifedStart.setDate(modifedStart.getDate() + 1));
  // info needed
  const values = {
    renterName: customerDisplayName,
    ownerName: providerDisplayName,
    startingDay: `${correctStart.toLocaleString('default', {
      weekday: 'long',
    })} ${correctStart.toLocaleString('default', { month: 'short' })} ${correctStart.getDate()}`,
    endingDay: `${end.toLocaleString('default', {
      weekday: 'long',
    })} ${end.toLocaleString('default', { month: 'short' })} ${end.getDate()}`,
    itemName: listingTitle,
    itemPrice: `$${price}`,
    customerPhone,
    customerEmail,
    providerPhone,
    providerEmail,
  };
  const reportUnreturnedItem = _ => {
    // TODO: get email AND phone number from provder and costumer
    // customer may not have a phone number yet
    const action = 'reportUnreturned';
    const params = { action, values };
    axios('/api/send', { params })
      .then(res => {
        console.log(res.status, res.statusText);
        swal({
          title: 'Success!',
          text:
            'Message successfully sent. Customer Service has been notified and will reach out shortly!',
          icon: 'success',
        });
      })
      .catch(err => {
        console.error(err);
        swal({
          title: 'Oops!',
          text: 'Somehting went wrong, please try again',
          icon: 'error',
        });
      });
  };

  const reportDamagedItem = _ => {
    // TODO: get email AND phone number from provder and costumer
    // customer may not have a phone number yet
    const action = 'reportDamaged';
    const params = { action, values };
    axios('/api/send', { params })
      .then(res => {
        console.log(res.status, res.statusText);
        swal({
          title: 'Success!',
          text:
            'Message successfully sent. Customer Service has been notified and will reach out shortly!',
          icon: 'success',
        });
      })
      .catch(err => {
        console.error(err);
        swal({
          title: 'Oops!',
          text: 'Somehting went wrong, please try again',
          icon: 'error',
        });
      });
  };

  const reportIssueWithItem = _ => {
    const action = 'reportIssue';
    const params = { action, values };
    axios('/api/send', { params })
      .then(res => {
        console.log(res.status, res.statusText);
        swal({
          title: 'Success!',
          text:
            'Message successfully sent. Customer Service has been notified and will reach out shortly!',
          icon: 'success',
        });
      })
      .catch(err => {
        console.error(err);
        swal({
          title: 'Oops!',
          text: 'Somehting went wrong, please try again',
          icon: 'error',
        });
      });
  };
  // schedule
  switch (panelHeadingState) {
    case HEADING_ENQUIRED:
      return isCustomer ? (
        <HeadingCustomer
          className={titleClasses}
          id="TransactionPanel.orderEnquiredTitle"
          values={{ listingLink }}
          listingDeleted={listingDeleted}
        />
      ) : (
        <HeadingProvider
          className={titleClasses}
          id="TransactionPanel.saleEnquiredTitle"
          values={{ customerName, listingLink }}
          isCustomerBanned={isCustomerBanned}
          listingTitle={listingTitle}
        />
      );
    case HEADING_PAYMENT_PENDING:
      return isCustomer ? (
        <HeadingCustomer
          className={titleClasses}
          id="TransactionPanel.orderPaymentPendingTitle"
          values={{ listingLink }}
          listingDeleted={listingDeleted}
        />
      ) : (
        <HeadingProvider
          className={titleClasses}
          id="TransactionPanel.salePaymentPendingTitle"
          values={{ customerName, listingLink }}
          isCustomerBanned={isCustomerBanned}
        >
          <p className={css.transactionInfoMessage}>
            <FormattedMessage
              id="TransactionPanel.salePaymentPendingInfo"
              values={{ customerName }}
            />
          </p>
        </HeadingProvider>
      );
    case HEADING_PAYMENT_EXPIRED:
      return isCustomer ? (
        <HeadingCustomer
          className={titleClasses}
          id="TransactionPanel.orderPaymentExpiredTitle"
          values={{ listingLink }}
          listingDeleted={listingDeleted}
        />
      ) : (
        <HeadingProvider
          className={titleClasses}
          id="TransactionPanel.salePaymentExpiredTitle"
          values={{ customerName, listingLink }}
          isCustomerBanned={isCustomerBanned}
        />
      );
    case HEADING_REQUESTED:
      return isCustomer ? (
        <HeadingCustomerWithSubtitle
          className={titleClasses}
          id="TransactionPanel.orderPreauthorizedTitle"
          values={{ customerName }}
          subtitleId="TransactionPanel.orderPreauthorizedSubtitle"
          subtitleValues={{ listingLink }}
        >
          {!listingDeleted ? (
            <p className={css.transactionInfoMessage}>
              <FormattedMessage
                id="TransactionPanel.orderPreauthorizedInfo"
                values={{ providerName }}
              />
            </p>
          ) : null}
        </HeadingCustomerWithSubtitle>
      ) : (
        <HeadingProvider
          className={titleClasses}
          id="TransactionPanel.saleRequestedTitle"
          values={{ customerName, listingLink }}
        >
          {!isCustomerBanned ? (
            <p className={titleClasses}>
              <FormattedMessage id="TransactionPanel.saleRequestedInfo" values={{ customerName }} />
            </p>
          ) : null}
        </HeadingProvider>
      );
    case HEADING_ACCEPTED:
      return isCustomer ? (
        <HeadingCustomerWithSubtitle
          className={titleClasses}
          id="TransactionPanel.orderPreauthorizedTitle"
          values={{ customerName }}
          subtitleId="TransactionPanel.orderAcceptedSubtitle"
          subtitleValues={{ listingLink }}
          showButton={true}
          reportIssueWithItem={reportIssueWithItem}
        />
      ) : (
        <HeadingProvider
          className={titleClasses}
          id="TransactionPanel.saleAcceptedTitle"
          values={{ customerName, listingLink }}
        />
      );
    case HEADING_DECLINED:
      return isCustomer ? (
        <HeadingCustomer
          className={titleClasses}
          id="TransactionPanel.orderDeclinedTitle"
          values={{ customerName, listingLink }}
        />
      ) : (
        <HeadingProvider
          className={titleClasses}
          id="TransactionPanel.saleDeclinedTitle"
          values={{ customerName, listingLink }}
          isCustomerBanned={isCustomerBanned}
        />
      );
    case HEADING_CANCELED:
      return isCustomer ? (
        <HeadingCustomer
          className={titleClasses}
          id="TransactionPanel.orderCancelledTitle"
          values={{ customerName, listingLink }}
        />
      ) : (
        <HeadingProvider
          className={titleClasses}
          id="TransactionPanel.saleCancelledTitle"
          values={{ customerName, listingLink }}
        />
      );
    case HEADING_DELIVERED:
      return isCustomer ? (
        <HeadingCustomer
          className={titleClasses}
          id="TransactionPanel.orderDeliveredTitle"
          values={{ customerName, listingLink }}
          isCustomerBanned={isCustomerBanned}
          showButton={true}
          reportIssueWithItem={reportIssueWithItem}
        />
      ) : (
        <HeadingProvider
          className={titleClasses}
          id="TransactionPanel.saleDeliveredTitle"
          values={{ customerName, listingLink }}
          isCustomerBanned={isCustomerBanned}
          reportUnreturnedItem={reportUnreturnedItem}
          reportDamagedItem={reportDamagedItem}
          isDelivered={true}
        />
      );
    default:
      console.warning('Unknown state given to panel heading.');
      return null;
  }
};

export default PanelHeading;
