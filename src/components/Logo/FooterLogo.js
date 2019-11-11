import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import config from '../../config';
import IconLogo from './IconLogo';
import LogoImage from './logo2.png';
import css from './Logo.css';

const FooterLogo = props => {
  const { className, format, ...rest } = props;
  const mobileClasses = classNames(css.logoMobile, className);

  if (format === 'desktop') {
    return <img className={className} src={LogoImage} alt={config.siteTitle} {...rest} />;
  }

  return <IconLogo className={mobileClasses} {...rest} />;
};

const { oneOf, string } = PropTypes;

FooterLogo.defaultProps = {
  className: null,
  format: 'desktop',
};

FooterLogo.propTypes = {
  className: string,
  format: oneOf(['desktop', 'mobile']),
};

export default FooterLogo;
