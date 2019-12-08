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

export default VisionPage;
