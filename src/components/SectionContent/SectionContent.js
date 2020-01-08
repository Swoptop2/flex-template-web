import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { NamedLink } from '../../components';

import css from './SectionContent.css';

import image from './images/img1.jpg';

const SectionContent = props => {
  const { rootClassName, className } = props;

  const classes = classNames(rootClassName || css.root, className);
  return (
    <div className={classes}>
      <div className={css.content}>
        <h1 className={css.title}>Want to swop on your campus?</h1>
        <p className={css.note}>
          We are in high demand, so the more people that sign up for the waitlist at your school,
          the sooner we will launch on your campus.
        </p>
        <NamedLink name="AboutPage" className={css.button}>
          Sign Up for Waitlist
        </NamedLink>
      </div>
      <img src={image} className={css.image} alt="Closet" />
    </div>
  );
};

SectionContent.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

SectionContent.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionContent;
