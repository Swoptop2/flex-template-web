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

const Owner = () => {
  return (
    <StaticPage
      className={css.root}
      title="How it works | Owner"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'Owner',
        description: 'Step by step explanation for owner',
        name: 'How it works: Owner page',
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
            <NamedLink style={{ textDecoration: 'none' }} className={css.active} name="Owner">
              Owner
            </NamedLink>
          </div>
          <div className={css.content}>
            <h1 className={css.title}>Step by Step: Owner</h1>
            <div>Todo: Owner explanation</div>
          </div>
        </LayoutWrapperMain>
        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

export default Owner;
