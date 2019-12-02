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

const YoutubeFrame = _ => {
  return (
    <div
      className={css.video}
      style={{
        position: 'relative',
        paddingBottom: '50.25%' /* 16:9 */,
        height: 0,
      }}
    >
      <iframe
        style={{
          position: 'absolute',
          top: 0,
          left: '15%',
          width: '70%',
          height: '70%',
        }}
        title="video"
        src="https://www.youtube.com/embed/vPloaO_9ACw"
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

const BestPractices = () => {
  return (
    <StaticPage
      className={css.root}
      title="How it works | Best Practices"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'Owner',
        description: 'Best renting practices',
        name: 'How it works: Best Practices page',
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
            <NamedLink style={{ textDecoration: 'none' }} className={css.link} name="Owner">
              Owner
            </NamedLink>
            <NamedLink
              style={{ textDecoration: 'none' }}
              className={css.active}
              name="BestPractices"
            >
              Best renting practices
            </NamedLink>
          </div>
          <div
            className={css.content}
            style={{ textAlign: 'center', width: '85%', margin: '0 auto' }}
          >
            <h1 className={css.title}>You’ve created your closet. Now what?</h1>
            <p style={{ marginBottom: '35px' }}>
              Follow these tips and tricks in order to maximize your number of rentals.
            </p>
            <hr />
            <ul style={{ listStyleType: 'circle', textAlign: 'left', padding: '30px 8px' }}>
              <li>
                Items that have been purchased in the past year and/or items from recognizable
                brands will rent best
              </li>
              <li>
                If the item is in poor condition (ie. has a stain or fabric tear), we suggest that
                you do not upload the item for rental. Only upload items that you would like to rent
                yourself!
              </li>
              <li>Items that retail for above $50 will rent best on Swoptop</li>
              <li>
                Responding to Renters within a few hours means they are more likely to rent from you
              </li>
            </ul>
            <hr />
            <h1 className={css.title}>Learn how to edit your photos on a white background</h1>
            <p>Download Photofox on the App Store</p> <br />
            <p>Upload White Background Photo first, then upload image of your clothing</p>
            <div className={css.videoContainer}>
              <YoutubeFrame />
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

export default BestPractices;
