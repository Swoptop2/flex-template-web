import React from 'react';
import { ResponsiveImage } from '../../components';
import { shape, string } from 'prop-types';
import { FormattedMessage } from 'react-intl';

import css from './ListingPage.css';

const SectionDamageCost = props => {
  const { publicData, listing } = props;
  const { images } = listing;
  const thirdImg = images.length > 2 ? images[2] : null;

  const damageCost = publicData && publicData.damageCost ? publicData.damageCost : '';

  return damageCost ? (
    <div className={css.damageCostContainer}>
      {thirdImg ? (
        <ResponsiveImage
          className={css.desktopFirstImg}
          alt="Listing image"
          image={thirdImg}
          variants={['scaled-small', 'scaled-medium', 'scaled-large', 'scaled-xlarge']}
          sizes="(max-width: 367px) 100vw, 80vw"
        />
      ) : null}
      <div className={css.sectionDamage}>
        <h2 className={css.featuresTitle}>
          <FormattedMessage id="ListingPage.damageCostTitle" />
        </h2>
        <p className={css.label}>${damageCost}</p>
      </div>
    </div>
  ) : null;
};

SectionDamageCost.propTypes = {
  publicData: shape({
    damageCost: string,
  }),
};

export default SectionDamageCost;
