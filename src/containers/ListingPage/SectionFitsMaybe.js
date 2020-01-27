import React from 'react';
import { array, shape, string } from 'prop-types';
import { FormattedMessage } from 'react-intl';

import css from './ListingPage.css';

const SectionFits = props => {
  const { publicData, options } = props;

  const fits = publicData && publicData.fits ? publicData.fits : [];
  const fitsOption = options.find(option => option.key === fits);

  return fitsOption ? (
    <div className={css.sectionFeatures}>
      <h2 className={css.featuresTitle}>
        <FormattedMessage id="ListingPage.fitsTitle" />
      </h2>
      <p className={css.sizeLabel}>{fitsOption.label}</p>
    </div>
  ) : null;
};

SectionFits.propTypes = {
  options: array.isRequired,
  publicData: shape({
    fits: string,
  }),
};

export default SectionFits;
