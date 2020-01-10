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

import closet2Img from './images/closet2.png';
import closet3Img from './images/closet3.png';
import closet4Img from './images/paymentImg.jpg';

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
          <div className={css.content}>
            <h1 className={css.title}>How to Build Your Closet</h1>
            <div className={css.sectionContent}>
              <div className={css.sectionContainer}>
                <div className={css.section}>
                  <div className={css.step}>
                    <img className={css.stepImg} src={closet2Img} alt="Add Pricing" />
                    <div className={css.stepText}>
                      <h2>Add Listing details</h2>
                      <p>First, enter the item type, color, size and brand.</p>
                      <p>Then, enter the pricing.</p>
                      <ol>
                        <li>
                          Add your item's retail cost. If you can’t find it online or do not know,
                          give it your best guess.
                        </li>
                        <li>
                          Add the damage cost. This is the amount the renter will pay you if she
                          damages your item.
                        </li>
                        <li>
                          Add the price you would like to charge. Remember, all rentals are for a
                          fixed 3 day period.
                        </li>
                      </ol>
                      <p>
                        We suggest looking at how similar items on the marketplace are priced as a
                        guide on how to price yours.
                      </p>
                    </div>
                  </div>
                  <div className={css.step}>
                    <img className={css.stepImg} src={closet3Img} alt="Add Pricing" />
                    <div className={css.stepText}>
                      <h2>Add Photos</h2>
                      <p>
                        This might seem like an easy step but it is by far the most important.
                        Because renters are looking at your item online, it is vital that you
                        include as many high quality photos as possible. Here is what we suggest
                        uploading to best display your item:
                      </p>
                      <ul>
                        <li>Stock photo (model photo)</li>
                        <li>Photo of item hanging</li>
                        <li>Close up photos of item</li>
                        <li>A photo of you wearing the item</li>
                      </ul>
                      <p>
                        Listings with photos of the user wearing the item have a higher likelihood
                        of renting.
                      </p>
                    </div>
                  </div>
                  <div className={css.step}>
                    <img className={css.stepImg} src={closet4Img} alt="Add Pricing" />
                    <div className={css.stepText}>
                      <h2>Add Payment Info</h2>
                      <p>
                        Enter your basic info along with your routing and account number. You can
                        find these on your bank’s website.{' '}
                      </p>
                      <p>
                        The Routing Number is a number that identifies the bank. The Account Number
                        is unique to your account.
                      </p>
                      <p>
                        Whenever you earn money, your earnings will automatically transfer to your
                        bank account. Expect 7-10 days for the bank to process and post your funds.
                      </p>
                    </div>
                  </div>
                </div>
                <NamedLink className={css.button} name="NewListingPage">
                  Start Your Closet
                </NamedLink>
              </div>
            </div>
            <h1 className={css.title}>How to: Renter</h1>
            <div className={css.sectionContent}>
              <div className={css.sectionContainer}>
                <div className={css.section}>
                  <div className={css.step}>
                    <div className={css.stepText}>
                      <h2>Request to Rent</h2>
                      <p className={css.centered}>
                        Choose the day before you would like to wear the item. The calendar will
                        automatically select a 3 day rental period. The first day is the day you
                        pick up the item from the Owner. The second day is the day you wear the
                        item. The third day is the day you return the item unwashed/as it. Owners
                        handle the cleaning of their items.
                      </p>
                    </div>
                  </div>
                  <div className={css.step}>
                    <div className={css.stepText}>
                      <h2>Enter Payment Info</h2>
                      <p className={css.centered}>
                        Enter your payment details to make the request, and wait for the owner to
                        accept it.
                      </p>
                      <p className={css.centered}>
                        If you decide you want to cancel your request, you have until 48 hours
                        before the booking begins to cancel & the Owner will be notified.
                      </p>
                    </div>
                  </div>
                  <div className={css.step}>
                    <div className={css.stepText}>
                      <h2>Pick Up, Wear, Return</h2>
                      <p className={css.centered}>
                        Once the Owner accepts the request, you will receive an email with the her
                        phone number, so that you can easily communicate and coordinate pick up &
                        drop off with her. We recommend exchanging items on campus.
                      </p>
                      <p className={css.centered}>
                        You will be emailed a receipt after the rental period is complete.
                      </p>
                      <p className={css.centered}>
                        Remember: If you fail to return your item by the end of the day on the last
                        day of the rental period (the third day) you will be charged late fees.
                      </p>
                    </div>
                  </div>
                </div>
                <NamedLink
                  className={css.button}
                  name="SearchPage"
                  to={{ search: `s?address=United+States&bounds=49.64,-66.43,23.88,-125.98` }}
                >
                  Start Renting
                </NamedLink>
              </div>
            </div>
            {/* start of third section here */}
            <h1 className={css.title}>How to: Owner</h1>
            <div className={css.sectionContent}>
              <div className={css.sectionContainer}>
                <div className={css.section}>
                  <div className={css.step}>
                    <div className={css.stepText}>
                      <h2>Accept Rental request</h2>
                      <p className={css.centered}>
                        You will receive an email when a someone requests to rent your item. Sign in
                        and accept or decline the request. You have until 11:59pm on the day before
                        the booking starts to accept the request. Otherwise the request will
                        automatically expire.
                      </p>
                    </div>
                  </div>
                  <div className={css.step}>
                    <div className={css.stepText}>
                      <h2>Exchange with Renter</h2>
                      <p className={css.centered}>
                        The Renter will reach out to you to coordinate pick up and drop off details.
                        We recommend meeting on campus to exchange the items. All pick ups should be
                        completed by the end of the first day of the rental period.{' '}
                      </p>
                      <p className={css.centered}>
                        If the Renter fails to return your item by the end of the third day of the
                        rental period you will have an opportunity to report this in your receipt
                        email. Customer service will reach out to ensure your item is returned and
                        the Renter will be charged late fees which will be issued to you.
                      </p>
                    </div>
                  </div>
                  <div className={css.step}>
                    <div className={css.stepText}>
                      <h2>Get Paid</h2>
                      <p className={css.centered}>
                        Congrats! There is no better feeling than earning money all on your own.
                        Earnings take 7-10 days to hit your bank account depending on which bank you
                        use. You will be emailed a receipt so you can keep track of your earnings
                        (you can also check out the History tab).
                      </p>
                    </div>
                  </div>
                </div>
                <NamedLink className={css.longBtn} name="NewListingPage">
                  Add to Your Closet
                </NamedLink>
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

export default HowItWorksPage;
