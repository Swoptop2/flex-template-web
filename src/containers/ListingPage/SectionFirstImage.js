import React from 'react';
// import { FormattedMessage } from 'react-intl';
import { ResponsiveImage } from '../../components';
import css from './ListingPage.css';

const SectionFirstImage = props => {
  const { listing } = props;

  const { images } = listing;

  const firstImage = images[0];

  return listing.images ? (
    <div className={css.firstImageContainer}>
      <div>
        <ResponsiveImage
          className={css.firstImage}
          alt="Listing image"
          image={firstImage}
          variants={['scaled-small', 'scaled-medium', 'scaled-large', 'scaled-xlarge']}
          sizes="(max-width: 767px) 100vw, 80vw"
        />
      </div>
    </div>
  ) : null;
};

export default SectionFirstImage;
