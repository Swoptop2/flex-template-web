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
            <h1 className={css.title}>FAQs</h1>
            <div className={css.section}>
              <h2 className={css.sectionTitle}>About Us</h2>
              <ul className={css.questionList}>
                <li>Where is Swoptop available? </li>
                <p>
                  Swoptop is currently available at The University of Alabama in Tuscaloosa, AL.
                </p>
                <li>How much is the Swoptop fee?</li>
                <p>We charge a 15% fee to the owner & a 10% fee to the renter.</p>
              </ul>
            </div>
            <hr />
            <div className={css.section}>
              <h2 className={css.sectionTitle}>Renter Questions</h2>
              <ul className={css.questionList}>
                <li>When will I be charged for an item?</li>
                <p>
                  The payment method linked to your Swoptop account will be charged once your rental
                  request is accepted by the owner.{' '}
                </p>
                <li>How do I receive an item?</li>
                <p>
                  Once the rental request is accepted, you are sent the Owner’s phone number via
                  email. Therefore, you text each other to set up a time for pickup.{' '}
                </p>
                <li>How does cleaning an item work?</li>
                <p>Owner’s are responsible for cleaning their items. Return the item as is.</p>
                <li>How do I return an item?</li>
                <p>
                  Text the Owner to set up a time to return the item on the last day of your rental
                  period (day 3).
                </p>
                <li>How long is the rental period?</li>
                <p>The rental period is 3 days.</p>
                <li>What is the Swoptop fee for the Renter? </li>
                <p>10% of the transaction</p>
                <li>Is there a late fee?</li>
                <p>
                  Yes. If you fail to return the item by the end of the third day (last day of the
                  rental period) you will be charged a $10/day late fee.{' '}
                </p>
                <li>What if I accidentally damage a rented item?</li>
                <p>
                  Reach out by clicking “Contact Us” on the home page or DM us on Instagram if you
                  damage an item. We will reach out to the Owner on your behalf. Damage fee is
                  considered on a case by case basis depending on the item and damage committed. If
                  the damage is beyond repair, you will be charged the damage cost for this item.
                </p>
                <li>Can I rent from someone that doesn’t go to my school? </li>
                <p>
                  At the moment, rentals are only available for students that attend The University
                  of Alabama. .
                </p>
                <li>Can I request to rent items when I’m not physically at school? </li>
                <p>
                  Yes! You can browse from anywhere and request to rent items when you are not at
                  school as long as you set the pick up date for when you return to campus.
                </p>
                <li>What happens if an item I rented isn’t in good condition?</li>
                <p>
                  Reach out by clicking “Contact Us” on the home page or DM us on Instagram if this
                  happens. Our owners are held to high standards, and although this rarely occurs,
                  we will make sure it is addressed. Each situation will be handled on a case by
                  case basis.{' '}
                </p>
                <li>How do I know that the owner is reliable?</li>
                <p>
                  We take the security of our platform very seriously, therefore we ask you to
                  qualify if the exchange has been done in a timely manner and if the item is given
                  to you in good condition. We monitor our users based on those qualifications and
                  more. If anyone is not up to the standards of our platform they will be removed
                  from the platform.
                </p>
                <li>How do I keep track of the items that I like?</li>
                <p>
                  When you find an item that you love, you can favorite it by clicking the heart
                  icon on the top of an image.
                </p>
              </ul>
            </div>
            <hr />
            <div className={css.section}>
              <h2 className={css.sectionTitle}>Owner Questions</h2>
              <ul className={css.questionList}>
                <li>How do I know how much to price an item?</li>
                <p>
                  We recommend you check how similar items are being priced on the marketplace. If
                  you need help, DM us or use the “Contact Us” form on the home page and we can
                  offer suggestions.
                </p>
                <li>How do I get paid?</li>
                <p>
                  All earnings will be transferred to your linked bank account within 7-10 business
                  days depending on your bank.
                </p>
                <li>
                  After signing up and posting my listing, how long do I have to wait for it to
                  post?
                </li>
                <p>
                  Our team checks new listings frequently and will do our best to accept or make
                  edits typically within 2 hours of creating the listing.
                </p>
                <li>What is the Swoptop fee for the Owner? </li>
                <p>15% of the transaction</p>
                <li>How do I know I’ll get an item back?</li>
                <p>
                  We hold our renters to high standards, which is why we designed a system that
                  holds users accountable. If a Renter does not return an item, the user will be
                  charged the damage cost & their membership on our platform will be reviewed. If
                  this happens more than twice, the Renter’s account will be deactivated so they
                  will no longer be able to rent. We expect all items to be treated as if they are
                  your own.
                </p>
                <li>How do I know the renter is reliable?</li>
                <p>
                  We take the security of our platform very seriously, therefore we ask you to
                  qualify if the exchange has been done in a timely manner and if the item is
                  returned in good condition via email. We monitor our users based on those
                  qualifications and more. If anyone is not up to the standards of our platform they
                  will be removed from the platform.
                </p>
              </ul>
            </div>
            <hr />

            <p style={{ textAlign: 'center' }}>
              Didn’t find the answer you were looking for? Click “Contact Us” at the bottom of the
              home page to get in touch.
            </p>
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
