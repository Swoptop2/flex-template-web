import React, { Component } from 'react';
import { object, string, bool, number, func, shape, array } from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { withRouter } from 'react-router-dom';
import omit from 'lodash/omit';

import routeConfiguration from '../../routeConfiguration';
import { parseDateFromISO8601, stringifyDateToISO8601 } from '../../util/dates';
import { createResourceLocatorString } from '../../util/routes';
import {
  ModalInMobile,
  Button,
  KeywordFilter,
  PriceFilter,
  SelectMultipleFilter,
  BookingDateRangeFilter,
} from '../../components';
import { propTypes } from '../../util/types';
import css from './SearchFiltersMobile.css';

const RADIX = 10;

class SearchFiltersMobileComponent extends Component {
  constructor(props) {
    super(props);
    let showUserFilterState;
    try {
      showUserFilterState = JSON.parse(localStorage.getItem('showUserFilter'))
        ? JSON.parse(localStorage.getItem('showUserFilter'))
        : false;
    } catch (error) {}
    this.state = {
      isFiltersOpenOnMobile: false,
      initialQueryParams: null,
      heartActive: false,
      costumeActive: false,
      showUserFilter: showUserFilterState,
    };

    this.openFilters = this.openFilters.bind(this);
    this.cancelFilters = this.cancelFilters.bind(this);
    this.closeFilters = this.closeFilters.bind(this);
    this.resetAll = this.resetAll.bind(this);
    this.handleSelectSingle = this.handleSelectSingle.bind(this);
    this.handleSelectMultiple = this.handleSelectMultiple.bind(this);
    this.handlePrice = this.handlePrice.bind(this);
    this.handleDateRange = this.handleDateRange.bind(this);
    this.handleKeyword = this.handleKeyword.bind(this);
    this.initialValue = this.initialValue.bind(this);
    this.initialValues = this.initialValues.bind(this);
    this.initialPriceRangeValue = this.initialPriceRangeValue.bind(this);
    this.initialDateRangeValue = this.initialDateRangeValue.bind(this);
    this.toggleUserFilter = this.toggleUserFilter.bind(this);
  }

  componentWillUnmount() {
    const localData = JSON.parse(localStorage.getItem('heartActive'));
    const costumeLocalData = JSON.parse(localStorage.getItem('costumeActive'));
    if (localData) {
      localStorage.removeItem('heartActive');
    }
    if (costumeLocalData) {
      localStorage.removeItem('costumeActtive');
    }
  }

  // Open filters modal, set the initial parameters to current ones
  openFilters() {
    const { onOpenModal, urlQueryParams } = this.props;
    onOpenModal();
    this.setState({ isFiltersOpenOnMobile: true, initialQueryParams: urlQueryParams });
  }

  // Close the filters by clicking cancel, revert to the initial params
  cancelFilters() {
    const { history, onCloseModal } = this.props;

    history.push(
      createResourceLocatorString(
        'SearchPage',
        routeConfiguration(),
        {},
        this.state.initialQueryParams
      )
    );
    onCloseModal();
    this.setState({ isFiltersOpenOnMobile: false, initialQueryParams: null });
  }

  // Close the filter modal
  closeFilters() {
    this.props.onCloseModal();
    this.setState({ isFiltersOpenOnMobile: false });
  }

  handleSelectSingle(urlParam, option) {
    const { urlQueryParams, history } = this.props;

    // query parameters after selecting the option
    // if no option is passed, clear the selection for the filter
    const queryParams = option
      ? { ...urlQueryParams, [urlParam]: option }
      : omit(urlQueryParams, urlParam);

    history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, queryParams));
  }

  handleSelectMultiple(urlParam, options) {
    const { urlQueryParams, history } = this.props;

    const queryParams =
      options && options.length > 0
        ? { ...urlQueryParams, [urlParam]: options.join(',') }
        : omit(urlQueryParams, urlParam);

    history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, queryParams));
  }

  handlePrice(urlParam, range) {
    const { urlQueryParams, history } = this.props;
    const { minPrice, maxPrice } = range || {};
    const queryParams =
      minPrice != null && maxPrice != null
        ? { ...urlQueryParams, [urlParam]: `${minPrice},${maxPrice}` }
        : omit(urlQueryParams, urlParam);

    history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, queryParams));
  }

  handleDateRange(urlParam, dateRange) {
    const { urlQueryParams, history } = this.props;
    const hasDates = dateRange && dateRange.dates;
    const { startDate, endDate } = hasDates ? dateRange.dates : {};

    const start = startDate ? stringifyDateToISO8601(startDate) : null;
    const end = endDate ? stringifyDateToISO8601(endDate) : null;

    const queryParams =
      start != null && end != null
        ? { ...urlQueryParams, [urlParam]: `${start},${end}` }
        : omit(urlQueryParams, urlParam);
    history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, queryParams));
  }

  handleKeyword(urlParam, keywords) {
    const { urlQueryParams, history } = this.props;
    const queryParams = urlParam
      ? { ...urlQueryParams, [urlParam]: keywords }
      : omit(urlQueryParams, urlParam);

    history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, queryParams));
  }

  // Reset all filter query parameters
  resetAll(e) {
    const { urlQueryParams, history, filterParamNames } = this.props;

    const queryParams = omit(urlQueryParams, filterParamNames);
    history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, queryParams));

    // blur event target if event is passed
    if (e && e.currentTarget) {
      e.currentTarget.blur();
    }
  }

  // resolve initial value for a single value filter
  initialValue(paramName) {
    return this.props.urlQueryParams[paramName];
  }

  // resolve initial values for a multi value filter
  initialValues(paramName) {
    const urlQueryParams = this.props.urlQueryParams;
    return !!urlQueryParams[paramName] ? urlQueryParams[paramName].split(',') : [];
  }

  initialPriceRangeValue(paramName) {
    const urlQueryParams = this.props.urlQueryParams;
    const price = urlQueryParams[paramName];
    const valuesFromParams = !!price ? price.split(',').map(v => Number.parseInt(v, RADIX)) : [];

    return !!price && valuesFromParams.length === 2
      ? {
          minPrice: valuesFromParams[0],
          maxPrice: valuesFromParams[1],
        }
      : null;
  }

  initialDateRangeValue(paramName) {
    const urlQueryParams = this.props.urlQueryParams;
    const dates = urlQueryParams[paramName];
    const rawValuesFromParams = !!dates ? dates.split(',') : [];
    const valuesFromParams = rawValuesFromParams.map(v => parseDateFromISO8601(v));
    const initialValues =
      !!dates && valuesFromParams.length === 2
        ? {
            dates: { startDate: valuesFromParams[0], endDate: valuesFromParams[1] },
          }
        : { dates: null };

    return initialValues;
  }

  toggleUserFilter() {
    if (this.state.showUserFilter) {
      this.setState({ showUserFilter: false });
      this.handleKeyword('keywords', null);
      localStorage.removeItem('showUserFilter');
      this.child.clearInput();
    } else {
      this.resetAll();
      this.setState({ showUserFilter: true });
      localStorage.setItem('showUserFilter', JSON.stringify(true));
      this.child.clearInput();
    }
  }

  render() {
    const {
      rootClassName,
      className,
      currentUser,
      history,
      listingsAreLoaded,
      resultsCount,
      searchInProgress,
      showAsModalMaxWidth,
      onMapIconClick,
      onManageDisableScrolling,
      selectedFiltersCount,
      itemFilter,
      sizeFilter,
      colorFilter,
      priceFilter,
      dateRangeFilter,
      keywordFilter,
      intl,
      urlQueryParams,
    } = this.props;

    const classes = classNames(rootClassName || css.root, className);

    const resultsFound = (
      <FormattedMessage id="SearchFilters.foundResults" values={{ count: resultsCount }} />
    );
    const noResults = <FormattedMessage id="SearchFilters.noResultsMobile" />;
    const loadingResults = <FormattedMessage id="SearchFilters.loadingResultsMobile" />;
    const filtersHeading = intl.formatMessage({ id: 'SearchFiltersMobile.heading' });
    const modalCloseButtonMessage = intl.formatMessage({ id: 'SearchFiltersMobile.cancel' });

    const showListingsLabel = intl.formatMessage(
      { id: 'SearchFiltersMobile.showListings' },
      { count: resultsCount }
    );

    const filtersButtonClasses =
      selectedFiltersCount > 0 || this.state.costumeActive
        ? css.filtersButtonSelected
        : css.filtersButton;

    const heartFilterButtonClasses = this.state.heartActive
      ? css.filtersButtonSelected
      : css.filtersButton;

    const itemLabel = 'Item';

    const initialItem = this.initialValues(itemFilter.paramName);

    const itemFilterElement =
      itemFilter && !this.state.showUserFilter ? (
        <SelectMultipleFilter
          id="SearchFiltersMobile.itemFilter"
          name="item"
          urlParam={itemFilter.paramName}
          label={itemLabel}
          onSubmit={this.handleSelectMultiple}
          liveEdit
          options={itemFilter.options}
          initialValues={initialItem}
        />
      ) : null;

    const sizeLabel = 'size';

    const initialSize = this.initialValues(sizeFilter.paramName);

    const sizeFilterElement =
      sizeFilter && !this.state.showUserFilter ? (
        <SelectMultipleFilter
          id="SearchFiltersMobile.sizeFilter"
          name="size"
          urlParam={sizeFilter.paramName}
          label={sizeLabel}
          onSubmit={this.handleSelectMultiple}
          liveEdit
          options={sizeFilter.options}
          initialValues={initialSize}
        />
      ) : null;

    const colorLabel = 'Color';

    const initialColor = this.initialValues(colorFilter.paramName);

    const colorFilterElement =
      colorFilter && !this.state.showUserFilter ? (
        <SelectMultipleFilter
          id="SearchFiltersMobile.colorFilter"
          name="color"
          urlParam={colorFilter.paramName}
          label={colorLabel}
          onSubmit={this.handleSelectMultiple}
          liveEdit
          options={colorFilter.options}
          initialValues={initialColor}
        />
      ) : null;

    const initialPriceRange = this.initialPriceRangeValue(priceFilter.paramName);

    const priceFilterElement =
      priceFilter && !this.state.showUserFilter ? (
        <PriceFilter
          id="SearchFiltersMobile.priceFilter"
          urlParam={priceFilter.paramName}
          onSubmit={this.handlePrice}
          liveEdit
          {...priceFilter.config}
          initialValues={initialPriceRange}
        />
      ) : null;

    const initialDateRange = this.initialDateRangeValue(dateRangeFilter.paramName);

    const dateRangeFilterElement =
      dateRangeFilter && dateRangeFilter.config.active && !this.state.showUserFilter ? (
        <BookingDateRangeFilter
          id="SearchFiltersMobile.dateRangeFilter"
          urlParam={dateRangeFilter.paramName}
          onSubmit={this.handleDateRange}
          liveEdit
          showAsPopup={false}
          initialValues={initialDateRange}
        />
      ) : null;

    const initialKeyword = this.initialValue(keywordFilter.paramName);
    const keywordLabel = this.state.showUserFilter
      ? intl.formatMessage({
          id: 'SearchFiltersMobile.userLabel',
        })
      : intl.formatMessage({
          id: 'SearchFiltersMobile.keywordLabel',
        });
    const keywordFilterElement =
      keywordFilter && keywordFilter.config.active ? (
        <div>
          <div className={css.toggleContainer}>
            <label className={css.switch}>
              <input
                onClick={this.toggleUserFilter}
                className={css.toggleInput}
                defaultChecked={this.state.showUserFilter}
                type="checkbox"
              />
              <span className={css.slider}></span>
            </label>
            <p>Search by user</p>
          </div>
          <KeywordFilter
            id={'SearchFiltersMobile.keywordFilter'}
            name="keyword"
            urlParam={keywordFilter.paramName}
            label={keywordLabel}
            onSubmit={this.handleKeyword}
            liveEdit
            showAsPopup={false}
            initialValues={initialKeyword}
            showUserFilter={this.state.showUserFilter}
            onRef={ref => (this.child = ref)}
          />
        </div>
      ) : null;

    const toggleFilter = _ => {
      let userListings;
      if (currentUser) {
        userListings = currentUser.attributes.profile.publicData.likedListings;
      }
      const queryParams = {
        ...urlQueryParams,
        pub_listingIdForLikeFilter: userListings.length > 0 ? userListings : 'fake_id',
      };

      // perform state setting
      this.setState(prevState => ({
        heartActive: !prevState.heartActive,
      }));
      if (this.state.heartActive) {
        this.handleSelectMultiple('pub_listingIdForLikeFilter', null);
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

      // perform state setting
      this.setState(prevState => ({
        costumeActive: !prevState.costumeActive,
      }));
      if (this.state.costumeActive) {
        this.handleSelectMultiple('pub_item', null);
        localStorage.removeItem('costumeActive');
      } else {
        localStorage.setItem('costumeActive', JSON.stringify({ active: true }));
        history.push(
          createResourceLocatorString('SearchPage', routeConfiguration(), {}, queryParams)
        );
      }
    };

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
        <div className={css.searchResultSummary}>
          {listingsAreLoaded && resultsCount > 0 ? resultsFound : null}
          {listingsAreLoaded && resultsCount === 0 ? noResults : null}
          {searchInProgress ? loadingResults : null}
        </div>
        <div className={css.buttons}>
          {currentUser ? (
            <Button
              rootClassName={heartFilterButtonClasses}
              className={activeClass ? css.heartActive : css.heartBtn}
              onClick={toggleFilter}
            >
              <FormattedMessage
                id="SearchFilters.heartFilterButtonLabel"
                className={css.mapIconText}
              />
            </Button>
          ) : null}
          <Button rootClassName={filtersButtonClasses} onClick={this.openFilters}>
            <FormattedMessage id="SearchFilters.filtersButtonLabel" className={css.mapIconText} />
          </Button>
          <div className={css.mapIcon} onClick={onMapIconClick}>
            <FormattedMessage id="SearchFilters.openMapView" className={css.mapIconText} />
          </div>
        </div>
        <ModalInMobile
          id="SearchFiltersMobile.filters"
          isModalOpenOnMobile={this.state.isFiltersOpenOnMobile}
          onClose={this.cancelFilters}
          showAsModalMaxWidth={showAsModalMaxWidth}
          onManageDisableScrolling={onManageDisableScrolling}
          containerClassName={css.modalContainer}
          closeButtonMessage={modalCloseButtonMessage}
        >
          <div className={css.modalHeadingWrapper}>
            <span className={css.modalHeading}>{filtersHeading}</span>
            <button className={css.resetAllButton} onClick={e => this.resetAll(e)}>
              <FormattedMessage id={'SearchFiltersMobile.resetAll'} />
            </button>
          </div>
          {this.state.isFiltersOpenOnMobile ? (
            <div className={css.filtersWrapper}>
              {keywordFilterElement}
              {itemFilterElement}
              {sizeFilterElement}
              {colorFilterElement}
              {priceFilterElement}
              {dateRangeFilterElement}
              {!this.state.showUserFilter ? (
                <Button
                  rootClassName={filtersButtonClasses}
                  className={costumeActiveClass ? css.costumeActive : css.costumeBtn}
                  onClick={toggleCostumeFilter}
                >
                  <FormattedMessage
                    id="SearchFilters.costumeFilterButtonLabel"
                    className={css.mapIconText}
                  />
                </Button>
              ) : null}
            </div>
          ) : null}

          <div className={css.showListingsContainer}>
            <Button className={css.showListingsButton} onClick={this.closeFilters}>
              {showListingsLabel}
            </Button>
          </div>
        </ModalInMobile>
      </div>
    );
  }
}

SearchFiltersMobileComponent.defaultProps = {
  rootClassName: null,
  className: null,
  resultsCount: null,
  searchingInProgress: false,
  selectedFiltersCount: 0,
  filterParamNames: [],
  categoryFilter: null,
  amenitiesFilter: null,
  itemFilter: null,
  sizeFilter: null,
  colorFilter: null,
  priceFilter: null,
  dateRangeFilter: null,
};

SearchFiltersMobileComponent.propTypes = {
  rootClassName: string,
  className: string,
  urlQueryParams: object.isRequired,
  listingsAreLoaded: bool.isRequired,
  resultsCount: number,
  searchingInProgress: bool,
  showAsModalMaxWidth: number.isRequired,
  onMapIconClick: func.isRequired,
  onManageDisableScrolling: func.isRequired,
  onOpenModal: func.isRequired,
  onCloseModal: func.isRequired,
  selectedFiltersCount: number,
  filterParamNames: array,
  categoriesFilter: propTypes.filterConfig,
  amenitiesFilter: propTypes.filterConfig,
  itemFilter: propTypes.filterConfig,
  sizeFilter: propTypes.filterConfig,
  colorFilter: propTypes.filterConfig,
  priceFilter: propTypes.filterConfig,
  dateRangeFilter: propTypes.filterConfig,

  // from injectIntl
  intl: intlShape.isRequired,

  // from withRouter
  history: shape({
    push: func.isRequired,
  }).isRequired,
};

const SearchFiltersMobile = injectIntl(withRouter(SearchFiltersMobileComponent));

export default SearchFiltersMobile;
