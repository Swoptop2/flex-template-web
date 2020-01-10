import React from 'react';
import { StaticPage, TopbarContainer } from '..';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
} from '../../components';

import css from './FAQs.css';
const FAQs = () => {
  return (
    <StaticPage
      className={css.root}
      title="FAQs"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'FAQs',
        description: 'Frequently asked questions',
        name: 'Frequently Asked Questions',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>
        <LayoutWrapperMain>
          <div className={css.content}>
            <h1 className={css.title}>FAQs: Renter</h1>
            <section className={css.section}>
              <div className={css.col}>
                <h2>How long unitl my rental request is accepted?</h2>
                <p>
                  The Owner has up until the day before the rental to accept or deny your request.
                </p>
                <h2>How does cleaning an item work?</h2>
                <p>
                  Owner’s are responsible for cleaning their items. Please return the item as is
                  (unwashed).
                </p>
                <h2>Can I rent from someone that does not go to my school?</h2>
                <p>
                  No. At the moment, rentals are only available for students that attend The
                  University of Alabama. If you would like Swoptop on your campus, sign up for the
                  waitlist!
                </p>
                <h2>Can I request to rent an item when I am not at school?</h2>
                <p>
                  Yes! You can browse from anywhere and request to rent items when you are not at
                  school as long as the rental period begins when you are back at school.
                </p>
              </div>
              <div className={css.col}>
                <h2>How do I get in contact with the Owner?</h2>
                <p>
                  Once the Owner accepts your rental request, you will be emailed their phone
                  number. From there, you can reach out and find a time to meet up to exchange the
                  item on the first day of the rental period as well as on the third day of the
                  rental period when its time to return the item.
                </p>
                <h2>What happens if I accidentally damage an item?</h2>
                <p>
                  Reach out by clicking “Contact Us” on the home page if you damage an item. We will
                  reach out to the Owner on your behalf. Damage fee’s are issued depending on the
                  damage committed. In other words, if the damage is beyond repair, you will be
                  charged the damage cost for this item.
                </p>
              </div>
              <div className={css.col}>
                <h2>What is the Swoptop fee for Renters?</h2>
                <p>There is a 10% transaction fee each time you complete a rental.</p>
                <h2>
                  What happens if I am unable to return the item by the end of the rental period?
                </h2>
                <p>
                  First, out of courtesy please reach out to the Owner to let them know. If you fail
                  to return the item by the end of the third day of the rental period you will be
                  charged a $10/day late fee.
                </p>
                <h2>What happens if an item I rented is not in good condition?</h2>
                <p>
                  First, out of courtesy please reach out to the Owner to let them know. If you fail
                  to return the item by the end of the third day of the rental period you will be
                  charged a $10/day late fee.
                </p>
                <h2>What happens if an item I rented is not in good condition?</h2>
                <p>
                  Reach out by clicking “Contact Us” on the home page if this happens. Our owners
                  are held to high standards, and although this rarely occurs, we will make sure it
                  is addressed. Each situation will be handled on a case by case basis.
                </p>
              </div>
            </section>
            <h1 className={css.title}>FAQs: Owner</h1>
            <div className={css.section}>
              <div className={css.col}>
                <h2>How do I know how much to price an item?</h2>
                <p>
                  We recommend you check how similar items are being priced on the marketplace. If
                  you need help, use the “Contact Us” form on the home page to reach out so we can
                  offer suggestions.
                </p>
                <h2>What is the Swoptop fee for Owners?</h2>
                <p>There is a 15% transaction fee every time a rental is processed.</p>
              </div>
              <div className={css.col}>
                <h2>How long does it take for my listing to be approved?</h2>
                <p>
                  Our team checks new listings frequently and will do our best to accept within 2
                  hours of creating the listing. If your listing does not meet our standards it will
                  not post. Make sure to include high quality pictures.
                </p>
                <h2>How does exchanging an item work?</h2>
                <p>
                  Once you accept the rental request, the Renter will be emailed your phone number.
                  She is instructed to reach out on the first day of the rental period to arrange
                  pick up and drop off details.
                </p>
              </div>
              <div className={css.col}>
                <h2>How do I accept or deny a rental request?</h2>
                <p>
                  Click on your profile picture in the top righthand corner and click “your
                  listings”. From there you can control which listings you accept or deny. We
                  recommend responding to a request within 24 hours out of courtesy to the Renter.
                </p>
                <h2>How do I know I will get my item back?</h2>
                <p>
                  We hold our renters to high standards, which is why we designed a system that
                  holds users accountable. If a Renter does not return an item, the user will be
                  charged the damage cost & their membership on our platform will be reviewed. If
                  this happens more than twice, the Renter’s account will be deactivated so they
                  will no longer be able to rent. We expect all items to be treated as if they are
                  your own.
                </p>
              </div>
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

export default FAQs;
