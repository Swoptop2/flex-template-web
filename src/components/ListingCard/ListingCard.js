import React, { useState, useEffect, useRef } from 'react';
import { string, func } from 'prop-types';
import { FormattedMessage, intlShape, injectIntl } from '../../util/reactIntl';
import classNames from 'classnames';
// import { lazyLoadWithDimensions } from '../../util/contextHelpers';
import { LINE_ITEM_DAY, LINE_ITEM_NIGHT, propTypes } from '../../util/types';
import { formatMoney } from '../../util/currency';
import { ensureListing, ensureUser } from '../../util/data';
import { richText } from '../../util/richText';
import { createSlug } from '../../util/urlHelpers';
import config from '../../config';
import { ListingNamedLink, ResponsiveImage } from '../../components';
// import { types as sdkTypes } from '../../util/sdkLoader';

import css from './ListingCard.css';

// const { Money } = sdkTypes;

const MIN_LENGTH_FOR_LONG_WORDS = 10;

const priceData = (price, intl) => {
  // const amount = price.amount;
  // const fixedAmount = amount * 3;
  // const fixedPrice = new Money(fixedAmount, config.currency);
  if (price && price.currency === config.currency) {
    const formattedPrice = formatMoney(intl, price);
    return { formattedPrice, priceTitle: formattedPrice };
  } else if (price) {
    return {
      formattedPrice: intl.formatMessage(
        { id: 'ListingCard.unsupportedPrice' },
        { currency: price.currency }
      ),
      priceTitle: intl.formatMessage(
        { id: 'ListingCard.unsupportedPriceTitle' },
        { currency: price.currency }
      ),
    };
  }
  return {};
};

// class ListingImage extends Component {
//   render() {
//     return <ResponsiveImage {...this.props} />;
//   }
// }
// const LazyImage = lazyLoadWithDimensions(ListingImage, { loadAfterInitialRendering: 3000 });

export const ListingCardComponent = props => {
  const [isLiked, setIsLiked] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const listingCardRef = useRef(null);
  // const [imgStyle, setImgStyle] = useState({ backgroundColor: '#ffffff' });
  // const canvasRef = useRef(null);
  // const imgRef = useRef(null);
  const {
    className,
    rootClassName,
    intl,
    listing,
    renderSizes,
    setFavoriteListing,
    currentUser,
  } = props;
  const classes = classNames(rootClassName || css.root, className);
  const currentListing = ensureListing(listing);
  const id = currentListing.id.uuid;
  const { title = '', price } = currentListing.attributes;
  const slug = createSlug(title);
  const author = ensureUser(listing.author);
  const authorName = author.attributes.profile.displayName;
  const firstImage =
    currentListing.images && currentListing.images.length > 0 ? currentListing.images[0] : null;
  //https://sharetribe.imgix.net
  const { formattedPrice, priceTitle } = priceData(price, intl);

  useEffect(() => {
    setScrollPosition(listingCardRef.current.offsetTop);

    if (currentUser) {
      if (currentUser.attributes.profile.publicData.likedListings) {
        const {
          publicData: { likedListings },
        } = currentUser.attributes.profile;
        // set array to local storage and check there too. remove on unmount
        localStorage.setItem('liked', JSON.stringify(likedListings));
        const liked = JSON.parse(localStorage.getItem('liked'));
        if (
          likedListings.includes(currentListing.id.uuid) ||
          liked.includes(currentListing.id.uuid)
        ) {
          setIsLiked(true);
        }
        return () => {
          // remove array from local storage on unmount
          localStorage.removeItem('liked');
        };
      }
    }
    // eslint-disable-next-line
  }, [currentUser, firstImage]);

  const unitType = config.bookingUnitType;
  const isNightly = unitType === LINE_ITEM_NIGHT;
  const isDaily = unitType === LINE_ITEM_DAY;

  const unitTranslationKey = isNightly
    ? 'ListingCard.perNight'
    : isDaily
    ? 'ListingCard.perDay'
    : 'ListingCard.perUnit';

  const heartColor = isLiked ? 'red' : 'grey';

  const likeListing = listingId => {
    setIsLiked(!isLiked);
    setFavoriteListing(listingId);
  };

  return (
    <div>
      {currentUser ? (
        <div className={css.heartContainer}>
          <i
            onClick={() => likeListing(currentListing.id)}
            style={{ color: heartColor, cursor: 'pointer', marginRight: '7px' }}
            className="fa fa-heart heart"
          ></i>
        </div>
      ) : null}
      <ListingNamedLink
        className={classes}
        name="ListingPage"
        scrollPosition={scrollPosition}
        params={{ id, slug }}
      >
        <div ref={listingCardRef} className={css.threeToTwoWrapper}>
          <div style={{ backgroundColor: '#ffffff' }} className={css.aspectWrapper}>
            {/* <canvas style={{ display: 'none' }} ref={canvasRef}></canvas>
            <img
              width={2400}
              height={2400}
              crossOrigin="anonymous"
              src={
                firstImage ? firstImage.attributes.variants['scaled-xlarge'].url : 'www.google.com'
              }
              ref={imgRef}
              style={{ display: 'none' }}
              alt=""
            /> */}
            <ResponsiveImage
              rootClassName={css.rootForImage}
              alt={title}
              image={firstImage}
              variants={['scaled-small', 'scaled-medium']}
              sizes={renderSizes}
            />
            {/* <LazyImage
              rootClassName={css.rootForImage}
              alt={title}
              image={firstImage}
              variants={['scaled-medium']}
              sizes={renderSizes}
            /> */}
          </div>
        </div>
        <div className={css.info}>
          <div className={css.price}>
            <div className={css.priceValue} title={priceTitle}>
              {formattedPrice}
            </div>
            <div className={css.perUnit}>
              <FormattedMessage id={unitTranslationKey} />
            </div>
          </div>
          <div className={css.mainInfo}>
            <div className={css.title}>
              {richText(title, {
                longWordMinLength: MIN_LENGTH_FOR_LONG_WORDS,
                longWordClass: css.longWord,
              })}
            </div>
            <div className={css.authorInfo}>
              <FormattedMessage id="ListingCard.hostedBy" values={{ authorName }} />
            </div>
          </div>
        </div>
      </ListingNamedLink>
    </div>
  );
};

ListingCardComponent.defaultProps = {
  className: null,
  rootClassName: null,
  renderSizes: null,
  setActiveListing: () => null,
  setFavoriteListing: () => null,
};

ListingCardComponent.propTypes = {
  className: string,
  rootClassName: string,
  intl: intlShape.isRequired,
  listing: propTypes.listing.isRequired,

  // Responsive image sizes hint
  renderSizes: string,

  setActiveListing: func,
  setFavoriteListing: func,
};

export default injectIntl(ListingCardComponent);
