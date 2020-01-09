import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { NamedLink } from '../../components';
import { types as sdkTypes } from '../../util/sdkLoader';
import GeocoderMapbox from '../LocationAutocompleteInput/GeocoderMapbox';

import css from './SectionHowItWorks.css';

import image from './images/img1.jpg';

const SectionHowItWorks = props => {
  const { rootClassName, className, currentUser } = props;
  const { LatLng } = sdkTypes;
  const geoCode = new GeocoderMapbox();
  const [addressString, setAddressString] = useState(
    `s?address=United+States&bounds=49.64,-66.43,23.88,-125.98`
  );

  useEffect(() => {
    if (currentUser) {
      const {
        profile: {
          protectedData: { city, state },
        },
      } = currentUser.attributes;
      if (state && city) {
        geoCode.getPlacePredictions(`${city}, ${state}`).then(res => {
          const origin = new LatLng(res.predictions[0].center[1], res.predictions[0].center[0]);
          const { lat, lng } = origin;
          const firstLat = lat + 1;
          const firstLng = lng + 1;
          const secondLat = lat - 1;
          const secondLng = lng - 1;
          setAddressString(
            `s?address=United+States&bounds=${firstLat},${firstLng},${secondLat},${secondLng}`
          );
        });
      }
    }
    //eslint-disable-next-line
  }, []);

  const classes = classNames(rootClassName || css.root, className);
  return (
    <div className={classes}>
      <img src={image} className={css.image} alt="Closet" />
      <div className={css.content}>
        <h1 className={css.title}>Attend the University of Alabama?</h1>
        <p className={css.note}>Click below to add clothes to your closet or to start swopping!</p>
        <NamedLink name="SearchPage" to={{ search: addressString }} className={css.button}>
          Enter Swoptop
        </NamedLink>
      </div>
    </div>
  );
};

SectionHowItWorks.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

SectionHowItWorks.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionHowItWorks;
