import React from 'react';
import { array, shape, string } from 'prop-types';
import { FormattedMessage } from 'react-intl';

import css from './ListingPage.css';

const SectionItem = props => {
  const { publicData, options } = props;

  const item = publicData && publicData.item ? publicData.item : [];
  const itemOption = options.find(option => option.key === item);

  return itemOption ? (
    <div className={css.sectionFeatures}>
      <h2 className={css.featuresTitle}>
        <FormattedMessage id="ListingPage.itemTitle" />
      </h2>
      <p>{itemOption.label}</p>
    </div>
  ) : null;
};

SectionItem.propTypes = {
  options: array.isRequired,
  publicData: shape({
    item: string,
  }),
};

export default SectionItem;
