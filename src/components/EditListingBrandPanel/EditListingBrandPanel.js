import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import { LISTING_STATE_DRAFT } from '../../util/types';
import { ensureOwnListing } from '../../util/data';
import { ListingLink } from '../../components';
import { EditListingBrandForm } from '../../forms';
import config from '../../config';

import css from './EditListingBrandPanel.css';

const EditListingBrandPanel = props => {
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
  } = props;

  const classes = classNames(rootClassName || css.root, className);
  const currentListing = ensureOwnListing(listing);
  const { publicData } = currentListing.attributes;
  const {
    publicData: { retailPrice, item },
  } = currentListing.attributes;

  const isPublished = currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT;
  const panelTitle = isPublished ? (
    <FormattedMessage
      id="EditListingBrandPanel.title"
      values={{ listingTitle: <ListingLink listing={listing} /> }}
    />
  ) : (
    <FormattedMessage id="EditListingBrandPanel.createListingTitle" />
  );

  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      <EditListingBrandForm
        className={css.form}
        publicData={publicData}
        initialValues={{ brandStore: publicData.brandStore }}
        onSubmit={values => {
          const { brandStore = '' } = values;
          const theItem = item ? item : [];
          const selectedItem = config.custom.items.find(option => option.key === theItem);
          const titleString = selectedItem
            ? `${brandStore} ${selectedItem.label} Retail ($${retailPrice})`
            : `${brandStore} Retail - ($${retailPrice})`;
          const updateValues = {
            title: titleString,
            publicData: {
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
      />
    </div>
  );
};

const { func, object, string, bool } = PropTypes;

EditListingBrandPanel.defaultProps = {
  className: null,
  rootClassName: null,
  listing: null,
};

EditListingBrandPanel.propTypes = {
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

export default EditListingBrandPanel;
