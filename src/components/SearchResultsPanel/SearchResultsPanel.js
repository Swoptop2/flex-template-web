import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import { ListingCard, PaginationLinks } from '../../components';
import css from './SearchResultsPanel.css';

const SearchResultsPanel = props => {
  const {
    className,
    rootClassName,
    listings,
    pagination,
    search,
    setActiveListing,
    setFavoriteListing,
    setLikedListingsArray,
    currentUser,
  } = props;
  const classes = classNames(rootClassName || css.root, className);

  useEffect(() => {
    if (currentUser) {
      const {
        attributes: {
          profile: { publicData },
        },
      } = currentUser;
      if (!publicData.likedListings) {
        setLikedListingsArray();
      }
    }
    // eslint-disable-next-line
  }, [currentUser]);

  const paginationLinks =
    pagination && pagination.totalPages > 1 ? (
      <PaginationLinks
        className={css.pagination}
        pageName="SearchPage"
        pageSearchParams={search}
        pagination={pagination}
      />
    ) : null;

  // Panel width relative to the viewport
  const panelMediumWidth = 50;
  const panelLargeWidth = 62.5;
  const cardRenderSizes = [
    '(max-width: 767px) 100vw',
    `(max-width: 1023px) ${panelMediumWidth}vw`,
    `(max-width: 1920px) ${panelLargeWidth / 2}vw`,
    `${panelLargeWidth / 3}vw`,
  ].join(', ');

  return (
    <div className={classes}>
      <div className={css.listingCards}>
        {listings.map(l => (
          <ListingCard
            className={css.listingCard}
            key={l.id.uuid}
            listing={l}
            renderSizes={cardRenderSizes}
            setActiveListing={setActiveListing}
            setFavoriteListing={setFavoriteListing}
            currentUser={currentUser}
          />
        ))}
        {props.children}
      </div>
      <div style={{ height: '50px', marginTop: '20px', visibility: 'hidden' }}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam unde placeat in non
        maxime accusantium. Consequatur repellat asperiores atque odit quod molestias, quaerat nisi
        obcaecati veniam aperiam nulla esse quis aliquid culpa officia saepe numquam nesciunt,
        possimus odio impedit suscipit ipsa praesentium. Iste porro exercitationem ipsum officiis
        temporibus
      </div>
      {paginationLinks}
      <div style={{ height: '50px', marginTop: '20px', visibility: 'hidden' }}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam unde placeat in non
        maxime accusantium. Consequatur repellat asperiores atque odit quod molestias, quaerat nisi
        obcaecati veniam aperiam nulla esse quis aliquid culpa officia saepe numquam nesciunt,
        possimus odio impedit suscipit ipsa praesentium.
      </div>
    </div>
  );
};

SearchResultsPanel.defaultProps = {
  children: null,
  className: null,
  listings: [],
  pagination: null,
  rootClassName: null,
  search: null,
};

const { array, node, object, string } = PropTypes;

SearchResultsPanel.propTypes = {
  children: node,
  className: string,
  listings: array,
  pagination: propTypes.pagination,
  rootClassName: string,
  search: object,
};

export default SearchResultsPanel;
