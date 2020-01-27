import React, { useState, useRef, useEffect } from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import { ResponsiveImage } from '../../components';
import { LINE_ITEM_NIGHT, LINE_ITEM_DAY } from '../../util/types';
import config from '../../config';

import css from './ListingPage.css';

const SectionHeading = props => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [imgStyle, setImgStyle] = useState({ backgroundColor: '#ffffff' });
  const canvasRef = useRef(null);
  const imgRef = useRef(null);
  const { priceTitle, formattedPrice, richTitle, category, publicData, listing } = props;

  const { images } = listing;

  useEffect(() => {
    imgRef.current.addEventListener('load', () => {
      if (canvasRef.current) {
        let context = canvasRef.current.getContext('2d');
        context.drawImage(imgRef.current, 0, 0);
        const result = context.getImageData(0, 0, 1, 1).data;
        setImgStyle({ backgroundColor: `rgb(${result[0]}, ${result[1]}, ${result[2]})` });
      }
    });
  }, [images]);

  const unitType = config.bookingUnitType;
  const isNightly = unitType === LINE_ITEM_NIGHT;
  const isDaily = unitType === LINE_ITEM_DAY;

  const unitTranslationKey = isNightly
    ? 'ListingPage.perNight'
    : isDaily
    ? 'ListingPage.perDay'
    : 'ListingPage.perUnit';

  const retailPrice = publicData && publicData.retailPrice ? publicData.retailPrice : null;

  const changeImage = index => {
    setSelectedImageIndex(index);
  };

  return (
    <div className={css.headingContainer}>
      <canvas style={{ display: 'none' }} ref={canvasRef}></canvas>
      <img
        width={2400}
        height={2400}
        crossOrigin="anonymous"
        src={
          images[selectedImageIndex]
            ? images[selectedImageIndex].attributes.variants['scaled-xlarge'].url
            : 'www.google.com'
        }
        ref={imgRef}
        style={{ display: 'none' }}
        alt=""
      />
      <ul className={css.imagesList}>
        {images.length > 1
          ? images.map((img, i) => (
              <li key={i}>
                <ResponsiveImage
                  onMouseEnter={() => changeImage(i)}
                  className={css.listImg}
                  alt="Listing image"
                  image={img}
                  variants={['scaled-small', 'scaled-medium', 'scaled-xlarge']}
                  sizes="(max-width: 367px) 100vw, 80vw"
                />
              </li>
            ))
          : null}
      </ul>
      <div className={css.sectionHeading}>
        <div className={css.sectionImages}>
          <ResponsiveImage
            className={css.desktopImg}
            alt="Listing image"
            image={images[selectedImageIndex]}
            variants={['scaled-small', 'scaled-medium', 'scaled-xlarge']}
            sizes="(max-width: 367px) 100vw, 80vw"
            style={imgStyle}
          />
        </div>
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
