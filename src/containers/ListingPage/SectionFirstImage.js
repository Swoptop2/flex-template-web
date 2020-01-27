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
      {images.length > 1 ? (
        <div className={css.chevrons}>
          <i style={{ transform: 'rotate(90deg)' }} className="fa fa-chevron-down"></i>
          <i style={{ transform: 'rotate(-90deg)' }} className="fa fa-chevron-down"></i>
        </div>
      ) : null}
    </div>
  ) : null;
};

export default SectionFirstImage;
