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

import renter1Img from './images/renter1.png';
import renter2Img from './images/renter2.png';

const Renter = () => {
  return (
    <StaticPage
      className={css.root}
      title="How it works | Renter"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'Renter',
        description: 'Step by step explanation for renter',
        name: 'How it works: Renter page',
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
            <NamedLink style={{ textDecoration: 'none' }} className={css.active} name="Renter">
              Renter
            </NamedLink>
            <NamedLink style={{ textDecoration: 'none' }} className={css.link} name="Owner">
              Owner
            </NamedLink>
          </div>
          <div className={css.content}>
            <h1 className={css.title}>Step by Step: Renter</h1>
            <div className={css.explanationContainer}>
              <div style={{ textAlign: 'center' }}>
                <img src={renter1Img} className={css.dateImg} alt="Choose dates" />
              </div>
              <div className={css.step}>
                <h1 className={css.stepTitle}>Request to Rent</h1>
                <p className={css.hiwP}>
                  Choose your dates and send a rental request to the owner. The first day fo the
                  rental period should be the day before you wish to wear the item.
                </p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <img src={renter2Img} className={css.paymentImg} alt="Payment info" />
              </div>
              <div className={css.step}>
                <h1 className={css.stepTitle}>Enter your Payment Info</h1>
                <p className={css.hiwP}>
                  Enter your payment details to make the request, and wait for the owner to accept
                  it. You'll get the owner's phone number by email so you can easily communicate and
                  coordinate with her.
                </p>
              </div>
            </div>
            <div className={css.finalStep}>
              <h1 className={css.stepTitle}>Wear it & Enjoy it!</h1>
              <p className={css.hiwP}>
                Enjoy and turn some heads with your outfit. When the rental period's over, return
                the item to the owner. And remember, no need to wash/dry clean! The owner will take{' '}
                {/* eslint-disable-next-line */} care of that for you
                <span role="img">&#128522;</span>.
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

export default Renter;
