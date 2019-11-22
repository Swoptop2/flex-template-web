/*
 * Marketplace specific configuration.
 */

export const amenities = [
  {
    key: 'towels',
    label: 'Towels',
  },
  {
    key: 'bathroom',
    label: 'Bathroom',
  },
  {
    key: 'swimming_pool',
    label: 'Swimming pool',
  },
  {
    key: 'own_drinks',
    label: 'Own drinks allowed',
  },
  {
    key: 'jacuzzi',
    label: 'Jacuzzi',
  },
  {
    key: 'audiovisual_entertainment',
    label: 'Audiovisual entertainment',
  },
  {
    key: 'barbeque',
    label: 'Barbeque',
  },
  {
    key: 'own_food_allowed',
    label: 'Own food allowed',
  },
];

export const categories = [
  { key: 'smoke', label: 'Smoke' },
  { key: 'electric', label: 'Electric' },
  { key: 'wood', label: 'Wood' },
  { key: 'other', label: 'Other' },
];

export const items = [
  { key: 'dress', label: 'Dress' },
  { key: 'romper', label: 'Romper' },
  { key: 'matching_set', label: 'Matching Set' },
  { key: 'top', label: 'Top' },
  { key: 'sweater', label: 'Sweater' },
  { key: 'jacket', label: 'Jacket' },
  { key: 'pants', label: 'Pants' },
  { key: 'skirt', label: 'Skirt' },
  { key: 'shorts', label: 'Shorts' },
  { key: 'bodysuit', label: 'Bodysuit' },
  { key: 'other', label: 'Other' },
];

export const sizes = [
  { key: 'xxs-00', label: 'XXS, 00' },
  { key: 'xs-0', label: 'XS, 0' },
  { key: 's-2', label: 'S, 2' },
  { key: 's-4', label: 'S, 4' },
  { key: 'm-6', label: 'M, 6' },
  { key: 'm-8', label: 'M, 8' },
  { key: 'l-10', label: 'L, 10' },
  { key: 'l-12', label: 'L, 12' },
  { key: 'xl-14', label: 'XL, 14' },
  { key: 'xl-16', label: 'XL, 16' },
];

export const colors = [
  { key: 'black', label: 'Black' },
  { key: 'white', label: 'White' },
  { key: 'multicolored_print', label: 'Multicolored/Print' },
  { key: 'red', label: 'Red' },
  { key: 'orange', label: 'Orange' },
  { key: 'yellow', label: 'Yellow' },
  { key: 'green', label: 'Green' },
  { key: 'blue_navy', label: 'Blue/Navy' },
  { key: 'denim', label: 'Denim' },
  { key: 'purple', label: 'Purple' },
  { key: 'pink', label: 'Pink' },
  { key: 'brown', label: 'Brown' },
  { key: 'gray', label: 'Gray' },
  { key: 'metallic', label: 'Metallic' },
  { key: 'sequin', label: 'Sequin' },
  { key: 'nude', label: 'Nude' },
];

// Price filter configuration
// Note: unlike most prices this is not handled in subunits
export const priceFilterConfig = {
  min: 0,
  max: 1000,
  step: 5,
};

// Activate booking dates filter on search page
export const dateRangeFilterConfig = {
  active: true,
};

// Activate keyword filter on search page

// NOTE: If you are ordering search results by distance the keyword search can't be used at the same time.
// You can turn off ordering by distance in config.js file
export const keywordFilterConfig = {
  active: true,
};
