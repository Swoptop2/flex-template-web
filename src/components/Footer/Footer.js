import React from 'react';
import { string } from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import classNames from 'classnames';
import config from '../../config';
import {
  IconSocialMediaInstagram,
  IconSocialMediaYoutube,
  FooterLogo,
  ExternalLink,
  NamedLink,
} from '../../components';

import css from './Footer.css';

const renderSocialMediaLinks = intl => {
  const { siteInstagramPage, siteYoutubePage } = config;

  // const goToFb = intl.formatMessage({ id: 'Footer.goToFacebook' });
  const goToInsta = intl.formatMessage({ id: 'Footer.goToInstagram' });

  // const fbLink = siteFacebookPage ? (
  //   <ExternalLink key="linkToFacebook" href={siteFacebookPage} className={css.icon} title={goToFb}>
  //     <IconSocialMediaFacebook />
  //   </ExternalLink>
  // ) : null;

  const instragramLink = siteInstagramPage ? (
    <ExternalLink
      key="linkToInstagram"
      href={siteInstagramPage}
      className={css.icon}
      title={goToInsta}
    >
      <IconSocialMediaInstagram />
    </ExternalLink>
  ) : null;

  const youtubeLink = siteInstagramPage ? (
    <ExternalLink
      key="linkToYoutube"
      href={siteYoutubePage}
      className={css.icon}
      title="Go to YouTube"
    >
      <IconSocialMediaYoutube />
    </ExternalLink>
  ) : null;
  return [instragramLink, youtubeLink].filter(v => v != null);
};

const Footer = props => {
  const { rootClassName, className, intl } = props;
  const socialMediaLinks = renderSocialMediaLinks(intl);
  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <div className={css.topBorderWrapper}>
        <div className={css.content}>
          <div className={css.someLiksMobile}>{socialMediaLinks}</div>
          <div className={css.links}>
            <div className={css.organization} id="organization">
              <NamedLink name="LandingPage" className={css.logoLink}>
                <FooterLogo format="desktop" className={css.logo} />
              </NamedLink>
              <div className={css.organizationInfo}>
                <p className={css.organizationDescription}>
                  <FormattedMessage id="Footer.organizationDescription" />
                </p>
                <p className={css.organizationCopyright}>
                  <NamedLink name="LandingPage" className={css.copyrightLink}>
                    <FormattedMessage id="Footer.copyright" />
                  </NamedLink>
                </p>
              </div>
            </div>
            <div className={css.infoLinks}>
              <h3 className={css.sectionTitle}>Explore</h3>
              <ul className={css.list}>
                <li className={css.listItem}>
                  <NamedLink name="HowItWorksPage" className={css.link}>
                    <span>How It Works</span>
                  </NamedLink>
                </li>
                <li className={css.listItem}>
                  <NamedLink name="BestPractices" className={css.link}>
                    Best Renting Practices
                  </NamedLink>
                </li>
              </ul>
            </div>
            <div className={css.infoLinks}>
              <h3 className={css.sectionTitle}>Get Help</h3>
              <ul className={css.list}>
                <li className={css.listItem}>
                  <NamedLink name="HelpWithPayments" className={css.link}>
                    <span>Help With Payments</span>
                  </NamedLink>
                </li>
                <li className={css.listItem}>
                  <NamedLink name="FAQs" className={css.link}>
                    FAQs
                  </NamedLink>
                </li>
                <li className={css.listItem}>
                  <NamedLink name="ContactUsPage" className={css.link}>
                    Contact Us
                  </NamedLink>
                </li>
              </ul>
            </div>
            <div className={css.infoLinks}>
              <h3 className={css.sectionTitle}>About Us</h3>
              <ul className={css.list}>
                <li className={css.listItem}>
                  <NamedLink name="VisionPage" className={css.link}>
                    Our Vision
                  </NamedLink>
                </li>
                <li className={css.listItem}>
                  <NamedLink name="StoryPage" className={css.link}>
                    Our Story
                  </NamedLink>
                </li>
              </ul>
            </div>
            <div className={css.extraLinks}>
              <h3 className={css.sectionTitle}>Stay Connected</h3>
              <div className={css.someLinks}>{socialMediaLinks}</div>
            </div>
          </div>
          <div className={css.copyrightAndTermsMobile}>
            <NamedLink name="LandingPage" className={css.organizationCopyrightMobile}>
              <FormattedMessage id="Footer.copyright" />
            </NamedLink>
            <div className={css.tosAndPrivacyMobile}>
              <NamedLink name="PrivacyPolicyPage" className={css.privacy}>
                <FormattedMessage id="Footer.privacy" />
              </NamedLink>
              <NamedLink name="TermsOfServicePage" className={css.terms}>
                <FormattedMessage id="Footer.terms" />
              </NamedLink>
            </div>
          </div>
        </div>
        <div className={css.legalMatters}>
          <ul className={css.tosAndPrivacy}>
            <li>
              <NamedLink name="TermsOfServicePage" className={css.legalLink}>
                <FormattedMessage id="Footer.termsOfUse" />
              </NamedLink>
            </li>
            <li>
              <NamedLink name="PrivacyPolicyPage" className={css.legalLink}>
                <FormattedMessage id="Footer.privacyPolicy" />
              </NamedLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

Footer.defaultProps = {
  rootClassName: null,
  className: null,
};

Footer.propTypes = {
  rootClassName: string,
  className: string,
  intl: intlShape.isRequired,
};

export default injectIntl(Footer);
