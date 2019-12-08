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
            <p>Coming soon...</p>
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
