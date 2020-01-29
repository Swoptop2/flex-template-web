import React, { useState, useEffect } from 'react';
import { compose } from 'redux';
import { object, string, bool, number, func, shape } from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import omit from 'lodash/omit';

import {
  BookingDateRangeFilter,
  SelectMultipleFilter,
  PriceFilter,
  KeywordFilter,
} from '../../components';
import routeConfiguration from '../../routeConfiguration';
import { parseDateFromISO8601, stringifyDateToISO8601 } from '../../util/dates';
import { createResourceLocatorString } from '../../util/routes';
import { propTypes } from '../../util/types';
import css from './SearchFilters.css';

// Dropdown container can have a positional offset (in pixels)
const FILTER_DROPDOWN_OFFSET = -14;
const RADIX = 10;

// resolve initial value for a single value filter
const initialValue = (queryParams, paramName) => {
  return queryParams[paramName];
};

// resolve initial values for a multi value filter
const initialValues = (queryParams, paramName) => {
  return !!queryParams[paramName] ? queryParams[paramName].split(',') : [];
};

const initialPriceRangeValue = (queryParams, paramName) => {
  const price = queryParams[paramName];
  const valuesFromParams = !!price ? price.split(',').map(v => Number.parseInt(v, RADIX)) : [];

  return !!price && valuesFromParams.length === 2
    ? {
        minPrice: valuesFromParams[0],
        maxPrice: valuesFromParams[1],
      }
    : null;
};

const initialDateRangeValue = (queryParams, paramName) => {
  const dates = queryParams[paramName];
  const rawValuesFromParams = !!dates ? dates.split(',') : [];
  const valuesFromParams = rawValuesFromParams.map(v => parseDateFromISO8601(v));
  const initialValues =
    !!dates && valuesFromParams.length === 2
      ? {
          dates: { startDate: valuesFromParams[0], endDate: valuesFromParams[1] },
        }
      : { dates: null };

  return initialValues;
};

const SearchFiltersComponent = props => {
  const [heartActive, setheartActive] = useState(false);
  const [costumeActive, setCostumeActive] = useState(false);
  const {
    rootClassName,
    className,
    currentUser,
    urlQueryParams,
    listingsAreLoaded,
    resultsCount,
    searchInProgress,
    itemFilter,
    sizeFilter,
    colorFilter,
    priceFilter,
    dateRangeFilter,
    keywordFilter,
    isSearchFiltersPanelOpen,
    toggleSearchFiltersPanel,
    searchFiltersPanelSelectedCount,
    history,
    intl,
  } = props;

  useEffect(() => {
    return () => {
      const localData = JSON.parse(localStorage.getItem('heartActive'));
      const costumeLocalData = JSON.parse(localStorage.getItem('costumeActive'));
      if (localData) {
        localStorage.removeItem('heartActive');
      }
      if (costumeLocalData) {
        localStorage.removeItem('costumeActive');
      }
    };

    // es-lint-disable-next-line
  }, []);

  const hasNoResult = listingsAreLoaded && resultsCount === 0;
  const classes = classNames(rootClassName || css.root, { [css.longInfo]: hasNoResult }, className);

  const itemLabel = 'Item';

  const sizeLabel = 'Size';

  const colorLabel = 'Color';

  const keywordLabel = intl.formatMessage({
    id: 'SearchFilters.keywordLabel',
  });

  const initialItem = itemFilter ? initialValues(urlQueryParams, itemFilter.paramName) : null;

  const initialSize = sizeFilter ? initialValues(urlQueryParams, sizeFilter.paramName) : null;

  const initialColor = colorFilter ? initialValues(urlQueryParams, colorFilter.paramName) : null;

  const initialPriceRange = priceFilter
    ? initialPriceRangeValue(urlQueryParams, priceFilter.paramName)
    : null;

  const initialDateRange = dateRangeFilter
    ? initialDateRangeValue(urlQueryParams, dateRangeFilter.paramName)
    : null;

  const initialKeyword = keywordFilter
    ? initialValue(urlQueryParams, keywordFilter.paramName)
    : null;

  const handleSelectOptions = (urlParam, options) => {
    const queryParams =
      options && options.length > 0
        ? { ...urlQueryParams, [urlParam]: options.join(',') }
        : omit(urlQueryParams, urlParam);

    history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, queryParams));
  };

  const toggleFilter = _ => {
    // populate this array with user's favorited listings
    // destructure likedListings array from user's publicData in order to construct queryParams
    const {
      attributes: {
        profile: {
          publicData: { likedListings },
        },
      },
    } = currentUser;

    const queryParams = {
      ...urlQueryParams,
      pub_listingIdForLikeFilter: likedListings.length > 0 ? likedListings : 'fake_id',
    };

    setheartActive(!heartActive);
    if (heartActive) {
      //remove form localStorage
      handleSelectOptions('pub_listingIdForLikeFilter', null);
      localStorage.removeItem('heartActive');
    } else {
      localStorage.setItem('heartActive', JSON.stringify({ active: true }));
      history.push(
        createResourceLocatorString('SearchPage', routeConfiguration(), {}, queryParams)
      );
    }
  };

  const toggleCostumeFilter = _ => {
    const queryParams = {
      ...urlQueryParams,
      pub_item: 'costume',
    };

    setCostumeActive(!costumeActive);
    if (costumeActive) {
      //remove form localStorage
      handleSelectOptions('pub_item', null);
      localStorage.removeItem('costumeActive');
    } else {
      localStorage.setItem('costumeActive', JSON.stringify({ active: true }));
      history.push(
        createResourceLocatorString('SearchPage', routeConfiguration(), {}, queryParams)
      );
    }
  };

  // const handleSelectOption = (urlParam, option) => {
  //   // query parameters after selecting the option
  //   // if no option is passed, clear the selection for the filter
  //   const queryParams = option
  //     ? { ...urlQueryParams, [urlParam]: option }
  //     : omit(urlQueryParams, urlParam);

  //   history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, queryParams));
  // };

  const handlePrice = (urlParam, range) => {
    const { minPrice, maxPrice } = range || {};
    const queryParams =
      minPrice != null && maxPrice != null
        ? { ...urlQueryParams, [urlParam]: `${minPrice},${maxPrice}` }
        : omit(urlQueryParams, urlParam);

    history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, queryParams));
  };

  const handleDateRange = (urlParam, dateRange) => {
    const hasDates = dateRange && dateRange.dates;
    const { startDate, endDate } = hasDates ? dateRange.dates : {};

    const start = startDate ? stringifyDateToISO8601(startDate) : null;
    const end = endDate ? stringifyDateToISO8601(endDate) : null;

    const queryParams =
      start != null && end != null
        ? { ...urlQueryParams, [urlParam]: `${start},${end}` }
        : omit(urlQueryParams, urlParam);
    history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, queryParams));
  };

  const handleKeyword = (urlParam, values) => {
    const queryParams = values
      ? { ...urlQueryParams, [urlParam]: values }
      : omit(urlQueryParams, urlParam);

    history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, queryParams));
  };

  const itemFilterElement = itemFilter ? (
    <SelectMultipleFilter
      id={'SearchFilters.itemFilter'}
      name="item"
      urlParam={itemFilter.paramName}
      label={itemLabel}
      onSubmit={handleSelectOptions}
      showAsPopup
      options={itemFilter.options}
      initialValues={initialItem}
      contentPlacementOffset={FILTER_DROPDOWN_OFFSET}
    />
  ) : null;

  const sizeFilterElement = sizeFilter ? (
    <SelectMultipleFilter
      id={'SearchFilters.sizeFilter'}
      name="size"
      urlParam={sizeFilter.paramName}
      label={sizeLabel}
      onSubmit={handleSelectOptions}
      showAsPopup
      options={sizeFilter.options}
      initialValues={initialSize}
      contentPlacementOffset={FILTER_DROPDOWN_OFFSET}
    />
  ) : null;

  const colorFilterElement = colorFilter ? (
    <SelectMultipleFilter
      id={'SearchFilters.colorFilter'}
      name="color"
      urlParam={colorFilter.paramName}
      label={colorLabel}
      onSubmit={handleSelectOptions}
      showAsPopup
      options={colorFilter.options}
      initialValues={initialColor}
      contentPlacementOffset={FILTER_DROPDOWN_OFFSET}
    />
  ) : null;

  const priceFilterElement = priceFilter ? (
    <PriceFilter
      id="SearchFilters.priceFilter"
      urlParam={priceFilter.paramName}
      onSubmit={handlePrice}
      showAsPopup
      {...priceFilter.config}
      initialValues={initialPriceRange}
      contentPlacementOffset={FILTER_DROPDOWN_OFFSET}
    />
  ) : null;

  const dateRangeFilterElement =
    dateRangeFilter && dateRangeFilter.config.active ? (
      <BookingDateRangeFilter
        id="SearchFilters.dateRangeFilter"
        urlParam={dateRangeFilter.paramName}
        onSubmit={handleDateRange}
        showAsPopup
        contentPlacementOffset={FILTER_DROPDOWN_OFFSET}
        initialValues={initialDateRange}
      />
    ) : null;

  const keywordFilterElement =
    keywordFilter && keywordFilter.config.active ? (
      <KeywordFilter
        id={'SearchFilters.keywordFilter'}
        name="keyword"
        urlParam={keywordFilter.paramName}
        label={keywordLabel}
        onSubmit={handleKeyword}
        showAsPopup
        initialValues={initialKeyword}
        contentPlacementOffset={FILTER_DROPDOWN_OFFSET}
      />
    ) : null;

  const toggleSearchFiltersPanelButtonClasses =
    isSearchFiltersPanelOpen || searchFiltersPanelSelectedCount > 0
      ? css.searchFiltersPanelOpen
      : css.searchFiltersPanelClosed;
  const toggleSearchFiltersPanelButton = toggleSearchFiltersPanel ? (
    <button
      className={toggleSearchFiltersPanelButtonClasses}
      onClick={() => {
        toggleSearchFiltersPanel(!isSearchFiltersPanelOpen);
      }}
    >
      <FormattedMessage
        id="SearchFilters.moreFiltersButton"
        values={{ count: searchFiltersPanelSelectedCount }}
      />
    </button>
  ) : null;

  let activeClass = false,
    costumeActiveClass = false;
  try {
    if (JSON.parse(localStorage.getItem('heartActive'))) {
      activeClass = true;
    }
  } catch (err) {}
  try {
    if (JSON.parse(localStorage.getItem('costumeActive'))) {
      costumeActiveClass = true;
    }
  } catch (err) {}
  return (
    <div className={classes}>
      <div className={css.filters}>
        <button
          className={activeClass ? css.heartActive : css.heartBtn}
          type="button"
          onClick={toggleFilter}
          disabled={currentUser ? false : true}
          style={currentUser ? { cursor: 'pointer' } : { cursor: 'not-allowed' }}
        >
          Loves
        </button>
        {itemFilterElement}
        {sizeFilterElement}
        {colorFilterElement}
        {priceFilterElement}
        {dateRangeFilterElement}
        {keywordFilterElement}
        <button
          className={costumeActiveClass ? css.heartActive : css.heartBtn}
          type="button"
          onClick={toggleCostumeFilter}
        >
          Costumes
        </button>

        {toggleSearchFiltersPanelButton}
      </div>

      {listingsAreLoaded && resultsCount > 0 ? (
        <div className={css.searchResultSummary}>
          <span className={css.resultsFound}>
            <FormattedMessage id="SearchFilters.foundResults" values={{ count: resultsCount }} />
          </span>
        </div>
      ) : null}

      {hasNoResult ? (
        <div className={css.noSearchResults}>
          <FormattedMessage id="SearchFilters.noResults" />
        </div>
      ) : null}

      {searchInProgress ? (
        <div className={css.loadingResults}>
          <FormattedMessage id="SearchFilters.loadingResults" />
        </div>
      ) : null}
    </div>
  );
};

SearchFiltersComponent.defaultProps = {
  rootClassName: null,
  className: null,
  resultsCount: null,
  searchingInProgress: false,
  itemFilter: null,
  sizeFilter: null,
  colorFilter: null,
  priceFilter: null,
  dateRangeFilter: null,
  isSearchFiltersPanelOpen: false,
  toggleSearchFiltersPanel: null,
  searchFiltersPanelSelectedCount: 0,
};

SearchFiltersComponent.propTypes = {
  rootClassName: string,
  className: string,
  urlQueryParams: object.isRequired,
  listingsAreLoaded: bool.isRequired,
  resultsCount: number,
  searchingInProgress: bool,
  onManageDisableScrolling: func.isRequired,
  itemFilter: propTypes.filterConfig,
  sizeFilter: propTypes.filterConfig,
  colorFilter: propTypes.filterConfig,
  priceFilter: propTypes.filterConfig,
  dateRangeFilter: propTypes.filterConfig,
  isSearchFiltersPanelOpen: bool,
  toggleSearchFiltersPanel: func,
  searchFiltersPanelSelectedCount: number,

  // from withRouter
  history: shape({
    push: func.isRequired,
  }).isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const SearchFilters = compose(
  withRouter,
  injectIntl
)(SearchFiltersComponent);

export default SearchFilters;
