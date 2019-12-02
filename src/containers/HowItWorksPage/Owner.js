import React from 'react';
import { StaticPage, TopbarContainer } from '..';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  NamedLink,
} from '../../components';

import css from './HowItWorksPage.css';

import owner1Img from './images/owner1.png';
import owner2Img from './images/owner2.jpg';

const Owner = () => {
  return (
    <StaticPage
      className={css.root}
      title="How it works | Owner"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'Owner',
        description: 'Step by step explanation for owner',
        name: 'How it works: Owner page',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>
        <LayoutWrapperMain>
          <div className={css.links}>
            <NamedLink
              style={{ textDecoration: 'none' }}
              className={css.link}
              name="HowItWorksPage"
            >
              Your closet
            </NamedLink>
            <NamedLink style={{ textDecoration: 'none' }} className={css.link} name="Renter">
              Renter
            </NamedLink>
            <NamedLink style={{ textDecoration: 'none' }} className={css.active} name="Owner">
              Owner
            </NamedLink>
            <NamedLink style={{ textDecoration: 'none' }} className={css.link} name="BestPractices">
              Best renting practices
            </NamedLink>
          </div>
          <div className={css.content}>
            <h1 className={css.title}>Step by Step: Owner</h1>
            <div className={css.explanationContainer}>
              <div style={{ textAlign: 'center' }}>
                <img src={owner1Img} className={css.acceptReqImg} alt="Rental request received" />
              </div>
              <div className={css.step}>
                <h1 className={css.stepTitle}>Receive a rental request!</h1>
                <p className={css.hiwP}>
                  Accept or decline the request. Accept = money making time! $$$ <br /> Please
                  remember that you have until 11:59pm on the eve of the booking start day to accept
                  the request. Otherwise the request will automatically expire and you will not get
                  paid.
                </p>
              </div>
              <img src={owner2Img} className={css.exchangeImg} alt="Exchanging item" />
              <div className={css.step}>
                <h1 className={css.stepTitle}>Exchange item with the Renter</h1>
                <p className={css.hiwP}>
                  Message the renter to coordinate pick up location and time.
                </p>
              </div>
            </div>
            <div className={css.finalStep}>
              <h1 className={css.stepTitle}>
                {/* eslint-disable-next-line */}
                Get paid! <span role="img">&#128176;</span>{' '}
              </h1>
              <p className={css.hiwP}>
                You now have made some money by turning your closet into a small business! You'll
                receive your receipt via email so you can keep track of you earnings. Consider that
                earnings take 7-10 days to hit your bank account depending on which bank you use.
              </p>
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

export default Owner;
