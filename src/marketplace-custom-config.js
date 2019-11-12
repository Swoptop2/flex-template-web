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
  { key: '1', label: 'Dress' },
  { key: '2', label: 'Romper' },
  { key: '3', label: 'Matching Set' },
  { key: '4', label: 'Top' },
  { key: '5', label: 'Sweater' },
  { key: '6', label: 'Jacket' },
  { key: '7', label: 'Pants' },
  { key: '8', label: 'Skirt' },
  { key: '9', label: 'Short' },
  { key: '10', label: 'Bodysuit' },
  { key: '11', label: 'Other' },
];

export const sizes = [
  { key: '1', label: 'XXS, 00, 24' },
  { key: '2', label: 'XS, 0, 25' },
  { key: '3', label: 'S, 2, 26' },
  { key: '4', label: 'S, 4, 27' },
  { key: '5', label: 'M, 6, 28' },
  { key: '6', label: 'M, 8, 29' },
  { key: '7', label: 'L, 10, 30' },
  { key: '8', label: 'L, 12, 31' },
  { key: '9', label: 'XXL, 14, 32' },
  { key: '10', label: 'XXL, 16, 33' },
];

export const colors = [
  { key: '1', label: 'Black' },
  { key: '2', label: 'White' },
  { key: '3', label: 'Multicolored/Print' },
  { key: '4', label: 'Red' },
  { key: '5', label: 'Orange' },
  { key: '6', label: 'Yellow' },
  { key: '7', label: 'Green' },
  { key: '8', label: 'Blue/Navy' },
  { key: '9', label: 'Denim' },
  { key: '10', label: 'Purple' },
  { key: '11', label: 'Pink' },
  { key: '12', label: 'Brown' },
  { key: '13', label: 'Gray' },
  { key: '14', label: 'Metallic' },
  { key: '15', label: 'Sequin' },
  { key: '16', label: 'Nude' },
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
