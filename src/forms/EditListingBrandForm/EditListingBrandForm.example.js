/* eslint-disable no-console */
import EditListingBrandForm from './EditListingBrandForm';

export const Empty = {
  component: EditListingBrandForm,
  props: {
    publicData: {},
    onSubmit: values => {
      console.log('Submit EditListingBrandForm with (unformatted) values:', values);
    },
    saveActionMsg: 'Save rules',
    updated: false,
    updateInProgress: false,
  },
  group: 'forms',
};
