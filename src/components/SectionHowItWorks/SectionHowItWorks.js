import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { NamedLink } from '../../components';

import css from './SectionHowItWorks.css';

import image from './images/img1.jpg';

const SectionHowItWorks = props => {
  const { rootClassName, className } = props;

  const classes = classNames(rootClassName || css.root, className);
  return (
    <div className={classes}>
      <img src={image} className={css.image} alt="Closet" />
      <div className={css.content}>
        <h1 className={css.title}>Attend the University of Alabama?</h1>
        <p className={css.note}>Click below to add clothes to your closet or to start swopping!</p>
        <NamedLink name="AboutPage" className={css.button}>
          Enter Swoptop
        </NamedLink>
      </div>
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
