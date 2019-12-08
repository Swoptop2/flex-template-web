import React from 'react';
import { StaticPage, TopbarContainer } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
} from '../../components';

import css from './HelpWithPaymentsPage.css';

const HelpWithPaymentsPage = () => {
  return (
    <StaticPage
      className={css.root}
      title="Help With Payments"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'Help With Payments',
        description: 'Section to help users with payments',
        name: 'Help With Payments Page',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>
        <LayoutWrapperMain>
          <div className={css.content}>
            <h1 className={css.title}>Need help with payments?</h1>
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

export default HelpWithPaymentsPage;
