import React from 'react';
import { StaticPage, TopbarContainer } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
} from '../../components';

import css from './VisionPage.css';

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
          boxShadow: '0px 0px 8px 0px rgba(0, 0, 0, 0.8)',
        }}
        title="video"
        src="https://www.youtube.com/embed/zCcRSWWob1o"
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

const VisionPage = () => {
  return (
    <StaticPage
      className={css.root}
      title="Our Vision"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'Our vision',
        description: 'Our vision section',
        name: 'Our Vision',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>
        <LayoutWrapperMain>
          <div className={css.content}>
            <h1 className={css.title}>Our Vision</h1>
            <h2 className={css.sectionTitle}>
              At Swoptop, we’re building a platform that allows more women to have:
            </h2>
            <ol className={css.list}>
              <li>
                financial freedom created for themselves by themselves through something they
                already own & love
              </li>
              <li>a way to creatively express themselves while learning business principles</li>
              <li>
                an understanding of how a great outfit can be a catalyst in creating a better sense
                of self
              </li>
            </ol>
            <hr />
            <h2 className={css.sectionTitle}>Why our users love to swop</h2>
            <YoutubeFrame />
          </div>
        </LayoutWrapperMain>
        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

export default VisionPage;
