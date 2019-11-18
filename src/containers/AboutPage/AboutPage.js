import React from 'react';
import { StaticPage, TopbarContainer } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  ExternalLink,
} from '../../components';

import css from './AboutPage.css';
import image from './img3.jpg';

const AboutPage = () => {
  // prettier-ignore
  return (
    <StaticPage
      title="About Us"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'AboutPage',
        description: 'About Saunatime',
        name: 'About page',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain className={css.staticPageWrapper}>
          <h1 className={css.pageTitle}>About Us</h1>
          <img className={css.coverImage} src={image} alt="Swoptop about" />

          <div className={css.contentWrapper}>

            <div className={css.contentMain}>
              <p>We are a platform that brings college women together to rent their clothes on campus. We are creating a community of women supporting women, who in return experience more opportunities to look good, feel good, and make money. </p>
              <p>If you would like to learn more head to our website <ExternalLink className={css.link} href="https://www.swoptop.com">www.swoptop.com</ExternalLink></p>
            </div>
          </div>
        </LayoutWrapperMain>

        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

export default AboutPage;
