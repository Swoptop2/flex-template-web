import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import { LISTING_STATE_DRAFT } from '../../util/types';
import { ListingLink } from '../../components';
import { EditListingPricingForm } from '../../forms';
import { ensureOwnListing } from '../../util/data';
import { types as sdkTypes } from '../../util/sdkLoader';
import GeocoderMapbox from '../LocationAutocompleteInput/GeocoderMapbox';
import config from '../../config';

import css from './EditListingPricingPanel.css';

const { Money, LatLng } = sdkTypes;

const EditListingPricingPanel = props => {
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

  const {
    author: {
      attributes: {
        profile: {
          protectedData: { city, state },
        },
      },
    },
  } = listing;

  const classes = classNames(rootClassName || css.root, className);
  const currentListing = ensureOwnListing(listing);
  const { price, publicData } = currentListing.attributes;
  const {
    id: { uuid },
  } = currentListing;

  const isPublished = currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT;
  const panelTitle = isPublished ? (
    <FormattedMessage
      id="EditListingPricingPanel.title"
      values={{ listingTitle: <ListingLink listing={listing} /> }}
    />
  ) : (
    <FormattedMessage id="EditListingPricingPanel.createListingTitle" />
  );

  const priceCurrencyValid = price instanceof Money ? price.currency === config.currency : true;
  const form = priceCurrencyValid ? (
    <EditListingPricingForm
      className={css.form}
      initialValues={{
        retailPrice: publicData.retailPrice,
        damageCost: publicData.damageCost,
        price,
      }}
      onSubmit={values => {
        const { retailPrice = '', damageCost = '', price } = values;
        const updateValues = {
          geolocation: origin,
          price,
          publicData: {
            damageCost,
            retailPrice,
            location: { address: `${city}, ${state}, United States of America` },
            listingIdForLikeFilter: uuid,
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
  ) : (
    <div className={css.priceCurrencyInvalid}>
      <FormattedMessage id="EditListingPricingPanel.listingPriceCurrencyInvalid" />
    </div>
  );

  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      {form}
    </div>
  );
};

const { func, object, string, bool } = PropTypes;

EditListingPricingPanel.defaultProps = {
  className: null,
  rootClassName: null,
  listing: null,
};

EditListingPricingPanel.propTypes = {
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

export default EditListingPricingPanel;
