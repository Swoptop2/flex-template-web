import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';

import css from './SectionHowItWorks.css';

// import money from './images/money.png';
// import creativity from './images/creativity.png';
// import self from './images/self.png';

const SectionHowItWorks = props => {
  const { rootClassName, className } = props;

  const classes = classNames(rootClassName || css.root, className);
  return (
    <div className={classes}>
      <div className={css.title}>
        <FormattedMessage id="SectionHowItWorks.titleLineOne" />
      </div>

      <div className={css.steps}>
        <div className={css.step}>
          {/* <img className={css.image} src={money} alt="money" /> */}
          <h2 className={css.stepTitle}>
            <FormattedMessage id="SectionHowItWorks.part1Title" />
          </h2>
        </div>

        <div className={css.step}>
          {/* <img src={creativity} className={css.image} alt="creativity" /> */}
          <h2 className={css.stepTitle}>
            <FormattedMessage id="SectionHowItWorks.part2Title" />
          </h2>
        </div>

        <div className={css.step}>
          {/* <img src={self} className={css.image} alt="self" /> */}
          <h2 className={css.stepTitle}>
            <FormattedMessage id="SectionHowItWorks.part3Title" />
          </h2>
        </div>
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
