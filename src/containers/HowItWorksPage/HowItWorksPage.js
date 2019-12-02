import React from 'react';
import { StaticPage, TopbarContainer } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  NamedLink,
} from '../../components';

import css from './HowItWorksPage.css';

import closet1Img from './images/closet1.png';
import closet2Img from './images/closet2.png';
import closet3Img from './images/closet3.png';

const HowItWorksPage = () => {
  return (
    <StaticPage
      className={css.root}
      title="How it works | Closet"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'Closet',
        description: 'Page explaining how to build closet',
        name: 'How It Works: Closet page',
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
              className={css.active}
              name="HowItWorksPage"
            >
              Your closet
            </NamedLink>
            <NamedLink style={{ textDecoration: 'none' }} className={css.link} name="Renter">
              Renter
            </NamedLink>
            <NamedLink style={{ textDecoration: 'none' }} className={css.link} name="Owner">
              Owner
            </NamedLink>
            <NamedLink style={{ textDecoration: 'none' }} className={css.link} name="BestPractices">
              Best renting practices
            </NamedLink>
          </div>
          <div className={css.content}>
            <h1 className={css.title}>How to Build Your Closet</h1>
            <div className={css.explanationContainer}>
              <img src={closet1Img} className={css.img} alt="Add listing details" />
              <div className={css.step}>
                <h1 className={css.stepTitle}>Listing Details</h1>
                <p className={css.hiwP}>
                  Enter your listing's details such as the item's name, color, size and brand.
                </p>
              </div>
              <img src={closet2Img} className={css.img} alt="Add listing pricing" />
              <div className={css.step}>
                <h1 className={css.stepTitle}>Add Pricing</h1>
                <ol>
                  <li>
                    Add your item's retail cost. This is just for reference and if you don't
                    remember or know, give it your best guess.
                  </li>
                  <li>
                    Add the damage cost, which is the amount the renter will pay in case she damages
                    your item.
                  </li>
                  <li>
                    Add how much you'll charge for rentals and, remember, all rentals are for a
                    fixed 3 day period.
                  </li>
                </ol>
              </div>
              <img src={closet3Img} className={css.img} alt="Add listing photos" />
              <div className={css.step}>
                <h1 className={css.stepTitle}>Photos</h1>
                <p className={css.hiwP}>
                  Time to add some photos! It's best if you add the following type of photos:
                </p>
                <ul style={{ listStyleType: 'circle', marginLeft: '10px' }}>
                  <li>Stock photo</li>
                  <li>Photo hanging</li>
                  <li>Close up photo</li>
                  <li>A photo wearing the item</li>
                </ul>
              </div>
            </div>
            <div className={css.finalStep}>
              <h1 className={css.stepTitle}>Add Your Payout Details</h1>
              <p className={css.hiwP}>
                Finally, enter your payout preferences so that you can start making some money!
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

export default HowItWorksPage;
