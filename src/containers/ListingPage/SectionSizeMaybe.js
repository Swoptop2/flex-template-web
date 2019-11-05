import React from 'react';
import { array, shape, string } from 'prop-types';
import { FormattedMessage } from 'react-intl';

import css from './ListingPage.css';

const SectionSize = props => {
  const { publicData, options } = props;

  console.log(publicData);

  const size = publicData && publicData.size ? publicData.size : [];
  const sizeOption = options.find(option => option.key === size);

  return sizeOption ? (
    <div className={css.sectionFeatures}>
      <h2 className={css.featuresTitle}>
        <FormattedMessage id="ListingPage.sizeTitle" />
      </h2>
      <p>{sizeOption.label}</p>
    </div>
  ) : null;
};

SectionSize.propTypes = {
  options: array.isRequired,
  publicData: shape({
    size: string,
  }).isRequired,
};

export default SectionSize;
