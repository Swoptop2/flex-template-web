import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';

import css from './SectionLocations.css';

import image from './images/img2.jpg';

const SectionLocations = props => {
  const { rootClassName, className } = props;

  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <div className={css.title}>
        <FormattedMessage id="SectionLocations.title" />
      </div>
      <div className={css.locations}>
        <p className={css.explanation}>
          We are a platform that brings college women together to rent their clothes on campus. We
          are creating a community of women supporting women, who in return experience more
          opportunities to look good, feel good, and make money by turning their closet into a
          business.
        </p>
        <div className={css.imageContainer}>
          <img className={css.image} src={image} alt="closet" />
        </div>
      </div>
    </div>
  );
};

SectionLocations.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

SectionLocations.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionLocations;
