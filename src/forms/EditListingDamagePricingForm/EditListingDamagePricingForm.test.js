// NOTE: renderdeep doesn't work due to map integration
import React from 'react';
import { renderShallow } from '../../util/test-helpers';
import { fakeIntl } from '../../util/test-data';
import { EditListingDamagePricingFormComponent } from './EditListingDamagePricingForm';

const noop = () => null;

describe('EditListingDamagePricingForm', () => {
  it('matches snapshot', () => {
    const tree = renderShallow(
      <EditListingDamagePricingFormComponent
        publicData={{}}
        intl={fakeIntl}
        dispatch={noop}
        onSubmit={v => v}
        saveActionMsg="Save damage price"
        updated={false}
        updateInProgress={false}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
