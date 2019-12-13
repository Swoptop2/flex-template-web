import React, { useState, useEffect } from 'react';
import { string } from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { NamedLink } from '../../components';
import { types as sdkTypes } from '../../util/sdkLoader';
import GeocoderMapbox from '../LocationAutocompleteInput/GeocoderMapbox';
import swal from 'sweetalert';

import css from './SectionHero.css';

const SectionHero = props => {
  const { rootClassName, className, currentUser } = props;
  const { LatLng } = sdkTypes;
  const geoCode = new GeocoderMapbox();
  const [addressString, setAddressString] = useState(
    `s?address=United+States&bounds=49.64,-66.43,23.88,-125.98`
  );

  useEffect(() => {
    // add one, subtract one. subtract one, add one to coordinates in order to get coorect bounds for location
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
      } else {
        swal({
          title: 'Welcome!',
          text:
            "It seems like it's your first time in the new and improved Swoptop. Before proceeding, be sure to update your location info in the Profile Settings and to add your phone number in the Account Seetings. After that, you're all set!",
          icon: 'info',
        });
      }
    }
    // eslint-disable-next-line
  }, []);

  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <div className={css.heroContent}>
        <h1 className={css.heroMainTitle}>
          <FormattedMessage id="SectionHero.title" />
        </h1>
        <h2 className={css.heroSubTitle}>
          <FormattedMessage id="SectionHero.subTitle" />
        </h2>
        <NamedLink
          name="SearchPage"
          to={{
            search: addressString,
          }}
          className={css.heroButton}
        >
          <FormattedMessage id="SectionHero.browseButton" />
        </NamedLink>
      </div>
    </div>
  );
};

SectionHero.defaultProps = { rootClassName: null, className: null };

SectionHero.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionHero;
