/* eslint-disable no-console */
import EditListingDamagePricingForm from './EditListingDamagePricingForm';

export const Empty = {
  component: EditListingDamagePricingForm,
  props: {
    publicData: {},
    onSubmit: values => {
      console.log('Submit EditListingDamagePricingForm with (unformatted) values:', values);
    },
    saveActionMsg: 'Save damage price',
    updated: false,
    updateInProgress: false,
  },
  group: 'forms',
};
