import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './SectionLocations.css';

const SectionLocations = props => {
  const { rootClassName, className } = props;

  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <div className={css.locations}>
        <div className={css.title}>
          <h2>The platform for college women who invest in style</h2>
        </div>
        <p className={css.explanation}>
          We are an online marketplace that brings girls together to rent their clothes on their
          college campus. We are community of smart & driven young women who strive to improve
          themselves in style with style. By joining Swoptop, our users gain more opportunities to
          support likeminded women in their community, to look & feel great, and to make money by
          turning their closet into a business.
        </p>
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
