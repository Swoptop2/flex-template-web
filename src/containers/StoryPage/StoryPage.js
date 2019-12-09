import React from 'react';
import { StaticPage, TopbarContainer } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
} from '../../components';

import css from './StoryPage.css';

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
        src="https://www.youtube.com/embed/3qjkf4PCkDI"
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

const StoryPage = () => {
  return (
    <StaticPage
      className={css.root}
      title="Our Vision"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'Our story',
        description: 'Our story section',
        name: 'Our Story',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>
        <LayoutWrapperMain>
          <div className={css.content}>
            <h1 className={css.title}>Our Story</h1>
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

export default StoryPage;
