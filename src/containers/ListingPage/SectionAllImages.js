import React from 'react';
// import { FormattedMessage } from 'react-intl';
import { ResponsiveImage } from '../../components';
import css from './ListingPage.css';

const SectionAllImages = props => {
  const { listing } = props;

  const { images } = listing;

  const shownImages = images.slice(0, 4);

  return listing.images ? (
    <div style={{ marginTop: '60px' }}>
      <h2 className={css.featuresTitle}>Photos</h2>
      <div className={css.imagesContainer}>
        {shownImages.map((image, i) => (
          <ResponsiveImage
            key={i}
            className={css.image}
            alt="Listing image"
            image={image}
            variants={['scaled-small', 'scaled-medium', 'scaled-large', 'scaled-xlarge']}
            sizes="(max-width: 767px) 100vw, 80vw"
          />
        ))}
      </div>
    </div>
  ) : null;
};

export default SectionAllImages;
