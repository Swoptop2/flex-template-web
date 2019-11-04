// NOTE: renderdeep doesn't work due to map integration
import React from 'react';
import { renderShallow } from '../../util/test-helpers';
import { fakeIntl } from '../../util/test-data';
import { EditListingRetailPricingFormComponent } from './EditListingRetailPricingForm';

const noop = () => null;

describe('EditListingRetailPricingForm', () => {
  it('matches snapshot', () => {
    const tree = renderShallow(
      <EditListingRetailPricingFormComponent
        publicData={{}}
        intl={fakeIntl}
        dispatch={noop}
        onSubmit={v => v}
        saveActionMsg="Save retail price"
        updated={false}
        updateInProgress={false}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
