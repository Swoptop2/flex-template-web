import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import { LISTING_STATE_DRAFT } from '../../util/types';
import { ensureOwnListing } from '../../util/data';
import { ListingLink } from '../../components';
import { EditListingDamagePricingForm } from '../../forms';
import GeocoderMapbox from '../LocationAutocompleteInput/GeocoderMapbox';
import { types as sdkTypes } from '../../util/sdkLoader';
import css from './EditListingDamagePricingPanel.css';

const { LatLng } = sdkTypes;

const EditListingDamagePricing = props => {
  const [origin, setOrigin] = useState({});
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

  const geoCode = new GeocoderMapbox();

  useEffect(() => {
    geoCode.getPlacePredictions(`${city}, ${state}`).then(res => {
      const newOrigin = new LatLng(res.predictions[0].center[1], res.predictions[0].center[0]);
      setOrigin(newOrigin);
    });
    // eslint-disable-next-line
  }, []);

  const classes = classNames(rootClassName || css.root, className);
  const currentListing = ensureOwnListing(listing);
  const { publicData } = currentListing.attributes;
  const {
    author: {
      attributes: {
        profile: {
          protectedData: { city, state },
        },
      },
    },
  } = props.listing;

  const isPublished = currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT;
  const panelTitle = isPublished ? (
    <FormattedMessage
      id="EditListingDamagePricingPanel.title"
      values={{ listingTitle: <ListingLink listing={listing} /> }}
    />
  ) : (
    <FormattedMessage id="EditListingDamagePricingPanel.createListingTitle" />
  );

  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      <EditListingDamagePricingForm
        className={css.form}
        publicData={publicData}
        initialValues={{ damagePrice: publicData.damagePrice }}
        onSubmit={values => {
          // update listing location here, by pulling origin and address from current user's extended data
          const { damagePrice = '' } = values;
          const updateValues = {
            geolocation: origin,
            publicData: {
              damagePrice,
              location: { address: `${city}, ${state}, United States of America` },
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

EditListingDamagePricing.defaultProps = {
  className: null,
  rootClassName: null,
  listing: null,
};

EditListingDamagePricing.propTypes = {
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

export default EditListingDamagePricing;
