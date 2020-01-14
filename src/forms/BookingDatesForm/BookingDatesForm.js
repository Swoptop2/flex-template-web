import React, { Component } from 'react';
import { string, bool, arrayOf } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Form as FinalForm } from 'react-final-form';
import { FormattedMessage, intlShape, injectIntl } from '../../util/reactIntl';
import classNames from 'classnames';
import moment from 'moment';
import { required, bookingDatesRequired, composeValidators } from '../../util/validators';
import { START_DATE, END_DATE } from '../../util/dates';
import { propTypes } from '../../util/types';
import config from '../../config';
import { Form, PrimaryButton, FieldDateRangeInput } from '../../components';
import EstimatedBreakdownMaybe from './EstimatedBreakdownMaybe';

import css from './BookingDatesForm.css';

const identity = v => v;

export class BookingDatesFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focusedInput: null,
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.onFocusedInputChange = this.onFocusedInputChange.bind(this);
  }

  componentDidMount() {
    const bookingValidator = {
      missingAvatar: true,
      missingInsta: true,
      missingLocation: true,
      missingPhone: true,
    };
    // TODO: store missingAvatar boolean in localStorage since it changes on refresh
    if (this.props.currentUser) {
      if (this.props.currentUser.profileImage) {
        // this.setState({ missingAvatar: false });
        bookingValidator.missingAvatar = false;
      }
      if (this.props.currentUser.attributes.profile.publicData.instaHandle) {
        // this.setState({ missingInsta: false });
        bookingValidator.missingInsta = false;
      }
      if (this.props.currentUser.attributes.profile.publicData.phoneNumber) {
        bookingValidator.missingPhone = false;
      }
      if (
        this.props.currentUser.attributes.profile.protectedData.state &&
        this.props.currentUser.attributes.profile.protectedData.city
      ) {
        // this.setState({ missingLocation: false });
        bookingValidator.missingLocation = false;
      }
      sessionStorage.setItem('validate', JSON.stringify(bookingValidator));
    }
  }

  componentWillUnmount() {
    sessionStorage.removeItem('validate');
  }

  // Function that can be passed to nested components
  // so that they can notify this component when the
  // focused input changes.
  onFocusedInputChange(focusedInput) {
    this.setState({ focusedInput });
  }

  // In case start or end date for the booking is missing
  // focus on that input, otherwise continue with the
  // default handleSubmit function.
  handleFormSubmit(e) {
    const { startDate, endDate } = e.bookingDates || {};
    if (!startDate) {
      e.preventDefault();
      this.setState({ focusedInput: START_DATE });
    } else if (!endDate) {
      e.preventDefault();
      this.setState({ focusedInput: END_DATE });
    } else {
      this.props.onSubmit(e);
    }
  }

  render() {
    const { rootClassName, className, price: unitPrice, ...rest } = this.props;
    const classes = classNames(rootClassName || css.root, className);

    if (!unitPrice) {
      return (
        <div className={classes}>
          <p className={css.error}>
            <FormattedMessage id="BookingDatesForm.listingPriceMissing" />
          </p>
        </div>
      );
    }
    if (unitPrice.currency !== config.currency) {
      return (
        <div className={classes}>
          <p className={css.error}>
            <FormattedMessage id="BookingDatesForm.listingCurrencyInvalid" />
          </p>
        </div>
      );
    }

    return (
      <FinalForm
        {...rest}
        unitPrice={unitPrice}
        onSubmit={this.handleFormSubmit}
        render={fieldRenderProps => {
          const {
            endDatePlaceholder,
            startDatePlaceholder,
            formId,
            handleSubmit,
            intl,
            isOwnListing,
            submitButtonWrapperClassName,
            unitPrice,
            unitType,
            values,
            timeSlots,
            fetchTimeSlotsError,
          } = fieldRenderProps;
          const { startDate, endDate } = values && values.bookingDates ? values.bookingDates : {};
          let datesOutOfRange = false;

          const datesUnavailable = (timeSlots, startDate, middleDate, endDate) => {
            let shouldBlockBtn = false;
            const firstAvailable = timeSlots.some(
              slot =>
                startDate.getMonth() === slot.attributes.start.getMonth() &&
                startDate.getDate() === slot.attributes.start.getDate()
            );
            const middleAvailable = timeSlots.some(
              slot =>
                middleDate.getMonth() === slot.attributes.start.getMonth() &&
                middleDate.getDate() === slot.attributes.start.getDate()
            );
            const lastAvailable = timeSlots.some(
              slot =>
                endDate.getMonth() === slot.attributes.start.getMonth() &&
                endDate.getDate() === slot.attributes.start.getDate()
            );
            if (firstAvailable === false || lastAvailable === false || middleAvailable === false) {
              shouldBlockBtn = true;
            }
            return shouldBlockBtn;
          };

          if (startDate) {
            const middleDate = new Date(startDate.getTime());
            middleDate.setDate(middleDate.getDate() + 1);

            const shouldBlock = datesUnavailable(timeSlots, startDate, middleDate, endDate);
            if (shouldBlock) {
              datesOutOfRange = true;
            }
          }

          const bookingStartLabel = intl.formatMessage({
            id: 'BookingDatesForm.bookingStartTitle',
          });
          const bookingEndLabel = intl.formatMessage({ id: 'BookingDatesForm.bookingEndTitle' });
          const requiredMessage = intl.formatMessage({ id: 'BookingDatesForm.requiredDate' });
          const startDateErrorMessage = intl.formatMessage({
            id: 'FieldDateRangeInput.invalidStartDate',
          });
          const endDateErrorMessage = intl.formatMessage({
            id: 'FieldDateRangeInput.invalidEndDate',
          });
          const timeSlotsError = fetchTimeSlotsError ? (
            <p className={css.timeSlotsError}>
              <FormattedMessage id="BookingDatesForm.timeSlotsError" />
            </p>
          ) : null;

          // This is the place to collect breakdown estimation data. See the
          // EstimatedBreakdownMaybe component to change the calculations
          // for customized payment processes.
          const bookingData =
            startDate && endDate
              ? {
                  unitType,
                  unitPrice,
                  startDate,
                  endDate,

                  // NOTE: If unitType is `line-item/units`, a new picker
                  // for the quantity should be added to the form.
                  quantity: 1,
                }
              : null;
          const bookingInfo = bookingData ? (
            <div className={css.priceBreakdownContainer}>
              <h3 className={css.priceBreakdownTitle}>
                <FormattedMessage id="BookingDatesForm.priceBreakdownTitle" />
              </h3>
              <EstimatedBreakdownMaybe shouldAdd={true} bookingData={bookingData} />
            </div>
          ) : null;

          const dateFormatOptions = {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
          };

          const now = moment();
          const today = now.startOf('day').toDate();
          const tomorrow = now
            .startOf('day')
            .add(1, 'days')
            .toDate();
          const startDatePlaceholderText =
            startDatePlaceholder || intl.formatDate(today, dateFormatOptions);
          const endDatePlaceholderText =
            endDatePlaceholder || intl.formatDate(tomorrow, dateFormatOptions);
          const submitButtonClasses = classNames(
            submitButtonWrapperClassName || css.submitButtonWrapper
          );

          let validator;
          let realValidator = {
            missingAvatar: true,
            missingInsta: true,
            missingLocation: true,
            missingPhone: true,
          };
          try {
            validator = JSON.parse(sessionStorage.getItem('validate'));
            realValidator.missingAvatar = validator.missingAvatar;
            realValidator.missingInsta = validator.missingInsta;
            realValidator.missingLocation = validator.missingLocation;
            realValidator.missingPhone = validator.missingPhone;
          } catch (err) {}

          return (
            <Form onSubmit={handleSubmit} className={classes}>
              {timeSlotsError}
              <FieldDateRangeInput
                className={css.bookingDates}
                name="bookingDates"
                unitType={unitType}
                startDateId={`${formId}.bookingStartDate`}
                startDateLabel={bookingStartLabel}
                startDatePlaceholderText={startDatePlaceholderText}
                endDateId={`${formId}.bookingEndDate`}
                endDateLabel={bookingEndLabel}
                endDatePlaceholderText={endDatePlaceholderText}
                focusedInput={this.state.focusedInput}
                onFocusedInputChange={this.onFocusedInputChange}
                format={identity}
                timeSlots={timeSlots}
                useMobileMargins
                validate={composeValidators(
                  required(requiredMessage),
                  bookingDatesRequired(startDateErrorMessage, endDateErrorMessage)
                )}
              />
              {datesOutOfRange && this.props.currentUser != null ? (
                <p className={css.note}>
                  *You need to select a a booking period of 3 consecutive available dates to be able
                  to book.
                </p>
              ) : null}
              {bookingInfo}
              <p className={css.smallPrint}>
                <FormattedMessage
                  id={
                    isOwnListing
                      ? 'BookingDatesForm.ownListing'
                      : 'BookingDatesForm.youWontBeChargedInfo'
                  }
                />
              </p>
              <div className={submitButtonClasses}>
                <PrimaryButton
                  type="submit"
                  disabled={
                    (realValidator.missingAvatar && this.props.currentUser != null) ||
                    (realValidator.missingInsta && this.props.currentUser != null) ||
                    (realValidator.missingLocation && this.props.currentUser != null) ||
                    (realValidator.missingPhone && this.props.currentUser != null) ||
                    (datesOutOfRange && this.props.currentUser != null)
                  }
                >
                  <FormattedMessage id="BookingDatesForm.requestToBook" />
                </PrimaryButton>
                {(realValidator.missingAvatar && this.props.currentUser != null) ||
                (realValidator.missingInsta && this.props.currentUser != null) ? (
                  <p className={css.note}>
                    *You need to add a profile picture and your Instagram handle before you can
                    proceed. Please go to your Profile Settings to do so.
                  </p>
                ) : null}
                {/* validate phone number addition */}
                {realValidator.missingPhone && this.props.currentUser != null ? (
                  <p className={css.note}>
                    *You must add your phone number in the Account Settings in order to proceed.
                  </p>
                ) : null}
                {realValidator.missingLocation && this.props.currentUser != null ? (
                  <p className={css.note}>
                    *You need to update your location info before proceeding. Please go to you
                    Profile Settings to do so.
                  </p>
                ) : null}
              </div>
            </Form>
          );
        }}
      />
    );
  }
}

BookingDatesFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  submitButtonWrapperClassName: null,
  price: null,
  isOwnListing: false,
  startDatePlaceholder: null,
  endDatePlaceholder: null,
  timeSlots: null,
};

BookingDatesFormComponent.propTypes = {
  rootClassName: string,
  className: string,
  submitButtonWrapperClassName: string,

  unitType: propTypes.bookingUnitType.isRequired,
  price: propTypes.money,
  isOwnListing: bool,
  timeSlots: arrayOf(propTypes.timeSlot),

  // from injectIntl
  intl: intlShape.isRequired,

  // for tests
  startDatePlaceholder: string,
  endDatePlaceholder: string,
};

const mapStateToProps = state => {
  const { currentUser } = state.user;
  return { currentUser };
};

const BookingDatesForm = compose(
  connect(mapStateToProps),
  injectIntl
)(BookingDatesFormComponent);
BookingDatesForm.displayName = 'BookingDatesForm';

export default BookingDatesForm;
