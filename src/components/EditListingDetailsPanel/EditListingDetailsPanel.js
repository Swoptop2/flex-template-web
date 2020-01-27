import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { FormattedMessage } from '../../util/reactIntl';
import { LISTING_STATE_DRAFT } from '../../util/types';
import { ensureOwnListing } from '../../util/data';
import { ListingLink } from '../../components';
import { EditListingDetailsForm } from '../../forms';
import config from '../../config';

import css from './EditListingDetailsPanel.css';

const EditListingDetailsPanelComponent = props => {
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
      id="EditListingDetailsPanel.title"
      values={{ listingTitle: <ListingLink listing={listing} /> }}
    />
  ) : (
    <FormattedMessage id="EditListingDetailsPanel.createListingTitle" />
  );

  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      <EditListingDetailsForm
        className={css.form}
        publicData={publicData}
        initialValues={{
          item: publicData.item,
          color: publicData.color,
          size: publicData.size,
          fits: publicData.fits,
          brandStore: publicData.brandStore,
        }}
        onSubmit={values => {
          const { item, color, size, fits, brandStore = '' } = values;
          const selectedItem = config.custom.items.find(option => option.key === item);
          const updateValues = {
            title: `${brandStore} ${selectedItem.label}`,
            publicData: {
              item,
              color,
              size,
              fits,
              brandStore,
            },
          };
          onSubmit(updateValues);
        }}
        onChange={onChange}
        saveActionMsg={submitButtonText}
        updated={panelUpdated}
        updateInProgress={updateInProgress}
        fetchErrors={errors}
        items={config.custom.items}
        colors={config.custom.colors}
        sizes={config.custom.sizes}
        fits={config.custom.fits}
        currentUser={currentUser}
      />
    </div>
  );
};

const { func, object, string, bool } = PropTypes;

EditListingDetailsPanelComponent.defaultProps = {
  className: null,
  rootClassName: null,
  listing: null,
};

EditListingDetailsPanelComponent.propTypes = {
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

const EditListingDetailsPanel = connect(mapStateToProps)(EditListingDetailsPanelComponent);

export default EditListingDetailsPanel;
