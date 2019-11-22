import React from 'react';
import { shape, string } from 'prop-types';
import { FormattedMessage } from 'react-intl';

import css from './ListingPage.css';

const SectionDamageCost = props => {
  const { publicData } = props;

  const damageCost = publicData && publicData.damageCost ? publicData.damageCost : '';

  return damageCost ? (
    <div className={css.sectionFeatures}>
      <h2 className={css.featuresTitle}>
        <FormattedMessage id="ListingPage.damageCostTitle" />
      </h2>
      <p className={css.label}>${damageCost}</p>
    </div>
  ) : null;
};

SectionDamageCost.propTypes = {
  publicData: shape({
    damageCost: string,
  }),
};

export default SectionDamageCost;
