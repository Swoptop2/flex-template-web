import React, { Component } from 'react';
import { array, bool, func, number, object, objectOf, string } from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import merge from 'lodash/merge';
import { propTypes } from '../../util/types';
import {
  SearchResultsPanel,
  SearchFilters,
  SearchFiltersMobile,
  SearchFiltersPanel,
} from '../../components';
import { validFilterParams } from './SearchPage.helpers';

import css from './SearchPage.css';

class MainPanel extends Component {
  constructor(props) {
    super(props);
    this.state = { isSearchFiltersPanelOpen: false };
    this.myRef = React.createRef();
    this.divRef = React.createRef();
    this.topDivRef = React.createRef();
    this.setScroll = this.setScroll.bind(this);
    this.pageChanged = false;
  }

  setScroll() {
    this.divRef.current.scrollIntoView();
    // this.myRef.current.scrollTop = this.myRef.current.scrollHeight;
  }

  componentDidUpdate(prevProps) {
    // if there is a scroll position in local storage, scroll to there first
    const localData = JSON.parse(localStorage.getItem('cardData'));
    if (this.props.currentUser && prevProps.currentUser) {
      if (
        this.props.currentUser.attributes.profile.publicData.likedListings !==
        prevProps.currentUser.attributes.profile.publicData.likedListings
      ) {
        return;
      }
      if (prevProps.pagination && this.props.pagination) {
        if (prevProps.pagination.page !== this.props.pagination.page) {
          this.pageChanged = true;
        }
        if (this.pageChanged) {
          this.myRef.current.scrollTop = 0;
          return;
        }
        if (localData && !this.pageChanged) {
          this.myRef.current.scrollTop = localData.cardPosition - 80;
          return;
        }
      }
      if (
        this.props.currentUser.attributes.profile.publicData.likedListings ===
        prevProps.currentUser.attributes.profile.publicData.likedListings
      ) {
        if (this.topDivRef.current) {
          this.myRef.current.scrollTop = 0;
        }
      }
    } else if (prevProps.pagination && this.props.pagination) {
      if (prevProps.pagination.page !== this.props.pagination.page) {
        this.pageChanged = true;
      }
      if (this.pageChanged) {
        this.myRef.current.scrollTop = 0;
        return;
      }
      if (localData && !this.pageChanged) {
        this.myRef.current.scrollTop = localData.cardPosition - 80;
        return;
      }
    } else {
      this.myRef.current.scrollTop = 0;
    }
  }

  render() {
    const {
      className,
      rootClassName,
      urlQueryParams,
      listings,
      searchInProgress,
      searchListingsError,
      onActivateListing,
      onFavoriteListing,
      onSetLikedListingsArray,
      onManageDisableScrolling,
      onOpenModal,
      onCloseModal,
      onMapIconClick,
      pagination,
      searchParamsForPagination,
      showAsModalMaxWidth,
      primaryFilters,
      secondaryFilters,
      currentUser,
    } = this.props;

    const isSearchFiltersPanelOpen = !!secondaryFilters && this.state.isSearchFiltersPanelOpen;

    const filters = merge(primaryFilters, secondaryFilters);
    const selectedFilters = validFilterParams(urlQueryParams, filters);
    const selectedFiltersCount = Object.keys(selectedFilters).length;

    const selectedSecondaryFilters = secondaryFilters
      ? validFilterParams(urlQueryParams, secondaryFilters)
      : {};
    const searchFiltersPanelSelectedCount = Object.keys(selectedSecondaryFilters).length;

    const searchFiltersPanelProps = !!secondaryFilters
      ? {
          isSearchFiltersPanelOpen: this.state.isSearchFiltersPanelOpen,
          toggleSearchFiltersPanel: isOpen => {
            this.setState({ isSearchFiltersPanelOpen: isOpen });
          },
          searchFiltersPanelSelectedCount,
        }
      : {};

    const hasPaginationInfo = !!pagination && pagination.totalItems != null;
    const totalItems = hasPaginationInfo ? pagination.totalItems : 0;
    const listingsAreLoaded = !searchInProgress && hasPaginationInfo;

    const classes = classNames(rootClassName || css.searchResultContainer, className);

    const filterParamNames = Object.values(filters).map(f => f.paramName);
    const secondaryFilterParamNames = secondaryFilters
      ? Object.values(secondaryFilters).map(f => f.paramName)
      : [];

    return (
      <div className={classes}>
        <SearchFilters
          className={css.searchFilters}
          urlQueryParams={urlQueryParams}
          listingsAreLoaded={listingsAreLoaded}
          resultsCount={totalItems}
          searchInProgress={searchInProgress}
          searchListingsError={searchListingsError}
          onManageDisableScrolling={onManageDisableScrolling}
          filterParamNames={filterParamNames}
          currentUser={currentUser}
          {...searchFiltersPanelProps}
          {...primaryFilters}
        />
        <SearchFiltersMobile
          className={css.searchFiltersMobile}
          urlQueryParams={urlQueryParams}
          listingsAreLoaded={listingsAreLoaded}
          resultsCount={totalItems}
          searchInProgress={searchInProgress}
          searchListingsError={searchListingsError}
          showAsModalMaxWidth={showAsModalMaxWidth}
          onMapIconClick={onMapIconClick}
          onManageDisableScrolling={onManageDisableScrolling}
          onOpenModal={onOpenModal}
          onCloseModal={onCloseModal}
          filterParamNames={filterParamNames}
          selectedFiltersCount={selectedFiltersCount}
          currentUser={currentUser}
          {...primaryFilters}
          {...secondaryFilters}
        />
        {isSearchFiltersPanelOpen ? (
          <div className={classNames(css.searchFiltersPanel)}>
            <SearchFiltersPanel
              urlQueryParams={urlQueryParams}
              listingsAreLoaded={listingsAreLoaded}
              onClosePanel={() => this.setState({ isSearchFiltersPanelOpen: false })}
              filterParamNames={secondaryFilterParamNames}
              {...secondaryFilters}
            />
          </div>
        ) : (
          <div
            ref={this.myRef}
            className={classNames(css.listings, {
              [css.newSearchInProgress]: !listingsAreLoaded,
            })}
          >
            <div style={{ float: 'left', clear: 'both' }} ref={this.topDivRef}></div>
            <button style={{ color: '#fff' }} className={css.scrollDown} onClick={this.setScroll}>
              <i className="fa fa-chevron-down"></i>
            </button>
            {searchListingsError ? (
              <h2 className={css.error}>
                <FormattedMessage id="SearchPage.searchError" />
              </h2>
            ) : null}
            <SearchResultsPanel
              className={css.searchListingsPanel}
              listings={listings}
              pagination={listingsAreLoaded ? pagination : null}
              search={searchParamsForPagination}
              setActiveListing={onActivateListing}
              setFavoriteListing={onFavoriteListing}
              setLikedListingsArray={onSetLikedListingsArray}
              currentUser={currentUser}
            />
            <div style={{ float: 'left', clear: 'both' }} ref={this.divRef}></div>
          </div>
        )}
      </div>
    );
  }
}

MainPanel.defaultProps = {
  className: null,
  rootClassName: null,
  listings: [],
  resultsCount: 0,
  pagination: null,
  searchParamsForPagination: {},
  primaryFilters: null,
  secondaryFilters: null,
};

MainPanel.propTypes = {
  className: string,
  rootClassName: string,

  urlQueryParams: object.isRequired,
  listings: array,
  searchInProgress: bool.isRequired,
  searchListingsError: propTypes.error,
  searchParamsAreInSync: bool.isRequired,
  onActivateListing: func.isRequired,
  onFavoriteListing: func.isRequired,
  onSetLikedListingsArray: func.isRequired,
  onManageDisableScrolling: func.isRequired,
  onOpenModal: func.isRequired,
  onCloseModal: func.isRequired,
  onMapIconClick: func.isRequired,
  pagination: propTypes.pagination,
  searchParamsForPagination: object,
  showAsModalMaxWidth: number.isRequired,
  primaryFilters: objectOf(propTypes.filterConfig),
  secondaryFilters: objectOf(propTypes.filterConfig),
};

export default MainPanel;
