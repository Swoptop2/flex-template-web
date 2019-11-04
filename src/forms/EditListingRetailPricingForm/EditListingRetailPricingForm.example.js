/* eslint-disable no-console */
import EditListingRetailPricingForm from './EditListingRetailPricingForm';

export const Empty = {
  component: EditListingRetailPricingForm,
  props: {
    publicData: {},
    onSubmit: values => {
      console.log('Submit EditListingRetailPricingForm with (unformatted) values:', values);
    },
    saveActionMsg: 'Save retail price',
    updated: false,
    updateInProgress: false,
  },
  group: 'forms',
};
