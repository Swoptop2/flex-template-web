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
              <h2 className={css.sectionTitle}>Renter</h2>
              <ul className={css.questionList}>
                <li>When will I be charged for an item?</li>
                <p>
                  The payment method linked to your Swoptop account will be charged once your rental
                  request is accepted by the owner.{' '}
                </p>
                <li>How do I receive an item?</li>
                <p>
                  Once the rental request is accepted, you are able to message the owner to set up a
                  time for pickup. It is the renter’s responsibility to pick up the item from the
                  owner.{' '}
                </p>
                <li>Do I need to dry clean an item before returning it to the owner?</li>
                <p>
                  No, the owner will take care of that for you. You simply have to return the item
                  on time.
                </p>
                <li>How do I return an item?</li>
                <p>
                  Returning an item is done the same way an item is picked up; message the Owner to
                  figure out where/what time they want to meet up to swop.
                </p>
                <li>How long is the rental period?</li>
                <p>
                  All rentals are for a fixed period of 3 days. The second day of this period should
                  be the day you want to wear the item.
                </p>
                <li>What is the Swoptop fee?</li>
                <p>The renter is charged a 10% of the transaction's amount to cover the costs.</p>
                <li>Is there a late fee?</li>
                <p>
                  At the moment, there is no late fee. If you know you are unable to return
                  something in time, notify the Owner and make sure she is okay with it.{' '}
                </p>
                <li>How do I know that the owner is reliable?</li>
                <p>
                  We take the security of our platform very seriously. We track records of rentals
                  to make sure they are held accountable. If for some reason the item was not given
                  to you in good condition or at all the rental amount will be refunded. We monitor
                  our users based on those qualifications and more. If anyone is not up to the
                  standards of our platform they will be removed from the platform.
                </p>
                <li>What if I accidentally damage a rented item? </li>
                <p>
                  Email our customer service team: support@swoptop.com if you damage an item or
                  reach out to the Owner directly via messaging on the platform. The damage fee is
                  posted on each listing, which you will be charged.
                </p>
                <li>Can I rent from someone that doesn’t go to my school? </li>
                <p>No. All rentals are done locally by students.</p>
                <li>Can I request to rent items when I’m not physically at school? </li>
                <p>
                  Yes! You can browse from anywhere and request to rent items when you’re not at
                  school as long as you set the pick up date for when you return to campus. You can
                  also see what girls at other schools are posting for rent!
                </p>
                <li>What happens if an item doesn’t fit? </li>
                <p>
                  We believe the details that we post for each item is enough information to gather
                  whether a rental will be an acceptable fit given the price. We understand that all
                  body types are different; however, in the spirit of protecting our owners, we
                  believe that their time is valuable and should be treated as such.{' '}
                </p>
                <li>What happens if an item I rented isn’t in good condition?</li>
                <p>
                  Please email our customer service (support@swoptop.com) and we will assist you.
                  Our owners are held to high standards, and although this rarely occurs, we will
                  make sure it is addressed. Each situation will be handled on a case by case basis.
                </p>
                <li>How do I keep track of the items that I like?</li>
                <p>You can follow Owner profiles, as well as favorite items that you like.</p>
              </ul>
            </div>
            <hr />
            <div className={css.section}>
              <h2 className={css.sectionTitle}>Owner</h2>
              <ul className={css.questionList}>
                <li>How do I know how much to price an item?</li>
                <p>
                  It’s best to check how similar items are being priced on the marketplace. If you
                  need help deciding pricing, do not hesitate to reach out to us:
                  support@swoptop.com
                </p>
                <li>
                  After signing up and posting my listing, how long do I have to wait for it to
                  post?
                </li>
                <p>
                  Our team checks new listings frequently and will do our best to accept or make
                  edits typically within 6 hours of creating the listing.{' '}
                </p>
                <li>How do I get paid?</li>
                <p>
                  All earnings will be transferred to your linked bank account within 7-10 business
                  days depending on your bank.
                </p>
                <li>How much does it cost to upload an item to Swoptop? </li>
                <p>There is no cost to upload items to swoptop.</p>
                <li>How much do I get as an owner?</li>
                <p>For example, if a dress is listed for $24, the owner receives $20.40</p>
                <li>What items rent best?</li>
                <p>
                  Our closet curators have a deep understanding of the marketplace. Therefore, you
                  can always reach out for assistance when setting up your closet. Email
                  support@swoptop.com. Check out “Best Renting Practices” above too!
                </p>
                <li>When do I get my item back?</li>
                <p>
                  You will receive your rented out item at the end of the agreed upon rental period.
                </p>
                <li>How do I know I’ll get an item back?</li>
                <p>
                  We hold our renters to high standards, which is why we designed a system that
                  holds users accountable. If a Renter does not return an item, the user will be
                  charged the damage cost & their membership on our platform will be reviewed. If
                  this happens more than twice, the Renter’s account will be deactivated so they
                  will no longer be able to rent. We expect all items to be treated as if they are
                  your own.
                </p>
                <li>How do I know that the renter is reliable?</li>
                <p>
                  We take the security of our platform very seriously, therefore we ask you to
                  qualify if the exchange has been done in a timely manner and if the item is
                  returned in good condition. We monitor our users based on those qualifications and
                  more. If anyone is not up to the standards of our platform they will be removed
                  from the platform. On the other hand, if one of our users goes above and beyond,
                  they will be rewarded.
                </p>
              </ul>
            </div>
            <hr />
            <div className={css.section}>
              <h2 className={css.sectionTitle}>About Us</h2>
              <ul className={css.questionList}>
                <li>Where is Swoptop available? </li>
                <p>
                  Swoptop is currently available at The University of Alabama in Tuscaloosa, AL.
                </p>
                <li>What items can be rented on Swoptop?</li>
                <p>
                  Dresses, rompers, skirts, shirts, shorts, pants, jackets, sweaters, and costumes.
                  At this time, our curation team selects which items are eligible for our platform.
                </p>
                <li>How much is the Swoptop fee?</li>
                <p>We charge a 15% fee to the owner & a 10% fee to the renter.</p>
              </ul>
            </div>
            <p style={{ textAlign: 'center' }}>
              Didn’t find the answer you were looking for? Email{' '}
              <a href="mailto:support@swoptop.com">support@swoptop.com</a>
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
