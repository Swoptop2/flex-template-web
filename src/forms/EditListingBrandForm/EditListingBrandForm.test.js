// NOTE: renderdeep doesn't work due to map integration
import React from 'react';
import { renderShallow } from '../../util/test-helpers';
import { fakeIntl } from '../../util/test-data';
import { EditListingBrandFormComponent } from './EditListingBrandForm';

const noop = () => null;

describe('EditListingBrandForm', () => {
  it('matches snapshot', () => {
    const tree = renderShallow(
      <EditListingBrandFormComponent
        publicData={{}}
        intl={fakeIntl}
        dispatch={noop}
        onSubmit={v => v}
        saveActionMsg="Save brand"
        updated={false}
        updateInProgress={false}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
