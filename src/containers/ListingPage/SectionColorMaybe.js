import React from 'react';
import { array, shape, string } from 'prop-types';
import { FormattedMessage } from 'react-intl';

import css from './ListingPage.css';

const SectionColor = props => {
  const { publicData, options } = props;

  const color = publicData && publicData.color ? publicData.color : [];
  const colorOption = options.find(option => option.key === color);

  return colorOption ? (
    <div className={css.sectionFeatures}>
      <h2 className={css.featuresTitle}>
        <FormattedMessage id="ListingPage.colorTitle" />
      </h2>
      <p>{colorOption.label}</p>
    </div>
  ) : null;
};

SectionColor.propTypes = {
  options: array.isRequired,
  publicData: shape({
    color: string,
  }).isRequired,
};

export default SectionColor;
