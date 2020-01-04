import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import { ResponsiveImage } from '../../components';
import { LINE_ITEM_NIGHT, LINE_ITEM_DAY } from '../../util/types';
import config from '../../config';

import css from './ListingPage.css';

const SectionHeading = props => {
  const { priceTitle, formattedPrice, richTitle, category, publicData, listing } = props;

  const { images } = listing;
  const img = images[0];

  const unitType = config.bookingUnitType;
  const isNightly = unitType === LINE_ITEM_NIGHT;
  const isDaily = unitType === LINE_ITEM_DAY;

  const unitTranslationKey = isNightly
    ? 'ListingPage.perNight'
    : isDaily
    ? 'ListingPage.perDay'
    : 'ListingPage.perUnit';

  const retailPrice = publicData && publicData.retailPrice ? publicData.retailPrice : null;

  return (
    <div className={css.headingContainer}>
      <div className={css.sectionHeading}>
        <ResponsiveImage
          className={css.desktopFirstImg}
          alt="Listing image"
          image={img}
          variants={['scaled-small', 'scaled-medium', 'scaled-large', 'scaled-xlarge']}
          sizes="(max-width: 367px) 100vw, 80vw"
        />
        <div className={css.heading}>
          <div>
            <h1 className={css.title}>{richTitle}</h1>
            <div className={css.author}>
              {category}
              {retailPrice ? <span>{`Retail Pirce $${retailPrice}.00`}</span> : null}
            </div>
          </div>
          <div className={css.desktopPriceContainer}>
            <div className={css.desktopPriceValue} title={priceTitle}>
              {formattedPrice}
            </div>
            <div className={css.desktopPerUnit}>
              <FormattedMessage id={unitTranslationKey} />
            </div>
          </div>
          <h2 className={css.mobilePrice}>{formattedPrice}</h2>
        </div>
      </div>
    </div>
  );
};

export default SectionHeading;
