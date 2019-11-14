import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import { LISTING_STATE_DRAFT } from '../../util/types';
import { ensureOwnListing } from '../../util/data';
import { ListingLink } from '../../components';
import { EditListingRetailPricingForm } from '../../forms';
import config from '../../config';

import css from './EditListingRetailPricingPanel.css';

const EditListingRetailPricingComponent = props => {
  const {
    className,
    rootClassName,
    listing,
    onSubmit,
    onChange,
    submitButtonText,
    panelUpdated,
    updateInProgress,
    errors,
    currentUser,
  } = props;

  const classes = classNames(rootClassName || css.root, className);
  const currentListing = ensureOwnListing(listing);
  const { publicData } = currentListing.attributes;

  const isPublished = currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT;
  const panelTitle = isPublished ? (
    <FormattedMessage
      id="EditListingRetailPricingPanel.title"
      values={{ listingTitle: <ListingLink listing={listing} /> }}
    />
  ) : (
    <FormattedMessage id="EditListingRetailPricingPanel.createListingTitle" />
  );

  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      <EditListingRetailPricingForm
        className={css.form}
        publicData={publicData}
        initialValues={{ retailPrice: publicData.retailPrice }}
        onSubmit={values => {
          const { retailPrice = '' } = values;
          const selectedItem = config.custom.items.find(option => option.key === publicData.item);
          let titleString = selectedItem
            ? `${publicData.brand} ${selectedItem.label} Retail ($${retailPrice})`
            : `${publicData.brand} Retail - ($${retailPrice})`;
          const updateValues = {
            title: titleString,
            description: 'default',
            publicData: {
              retailPrice,
            },
          };
          onSubmit(updateValues);
        }}
        onChange={onChange}
        saveActionMsg={submitButtonText}
        updated={panelUpdated}
        updateInProgress={updateInProgress}
        fetchErrors={errors}
        currentUser={currentUser}
      />
    </div>
  );
};

const { func, object, string, bool } = PropTypes;

EditListingRetailPricingComponent.defaultProps = {
  className: null,
  rootClassName: null,
  listing: null,
};

EditListingRetailPricingComponent.propTypes = {
  className: string,
  rootClassName: string,

  // We cannot use propTypes.listing since the listing might be a draft.
  listing: object,

  onSubmit: func.isRequired,
  onChange: func.isRequired,
  submitButtonText: string.isRequired,
  panelUpdated: bool.isRequired,
  updateInProgress: bool.isRequired,
  errors: object.isRequired,
};

const mapStateToProps = state => {
  const { currentUser } = state.user;
  return { currentUser };
};

const EditListingRetailPricing = compose(connect(mapStateToProps))(
  EditListingRetailPricingComponent
);

export default EditListingRetailPricing;
