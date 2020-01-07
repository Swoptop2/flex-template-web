import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './SectionHowItWorks.css';

import image from './images/img1.jpg';

const SectionHowItWorks = props => {
  const { rootClassName, className } = props;

  const classes = classNames(rootClassName || css.root, className);
  return (
    <div className={classes}>
      <img src={image} className={css.image} alt="Closet" />
    </div>
  );
};

SectionHowItWorks.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

SectionHowItWorks.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionHowItWorks;
