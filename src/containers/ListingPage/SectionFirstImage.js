import React from 'react';
import { ResponsiveImage } from '../../components';
import css from './ListingPage.css';

const SectionFirstImage = props => {
  const { listing } = props;

  const { images } = listing;

  return listing.images ? (
    <div className={css.firstImageContainer}>
      <div className={css.firstImageItems}>
        {images.map((image, i) => (
          <ResponsiveImage
            className={css.firstImage}
            alt="Listing image"
            image={image}
            variants={['scaled-small', 'scaled-medium']}
            sizes="(max-width: 767px) 100vw, 80vw"
            key={i}
          />
        ))}
      </div>
    </div>
  ) : null;
};

export default SectionFirstImage;
