const flexIntegrationSdk = require('sharetribe-flex-integration-sdk');
const moment = require('moment');

const integrationSdk = flexIntegrationSdk.createInstance({
  clientId: process.env.FLEX_INTEGRATION_CLIENT_ID,
  clientSecret: process.env.FLEX_INTEGRATION_CLIENT_SECRET,
});

const handleUserCsvRequest = (req, res) => {
  let usersArray = [];
  let totalPages;
  let totalItems;
  integrationSdk.users
    .query()
    .then(resp => {
      totalPages = resp.data.meta.totalPages;
      totalItems = resp.data.meta.totalItems;
      usersArray = [...resp.data.data];
    })
    .then(resp2 => {
      // make query for all the pages to get all users
      for (let i = 2; i < totalPages + 1; i++) {
        integrationSdk.users
          .query({ page: i })
          .then(resp3 => {
            usersArray = [...usersArray, ...resp3.data.data];
          })
          .then(resp4 => {
            if (usersArray.length === totalItems) {
              // map through users array to get desired data and create an array of objects with desired fields
              const userDataArray = usersArray.map(usr => {
                return {
                  name: `${usr.attributes.profile.firstName} ${usr.attributes.profile.lastName}`,
                  email: usr.attributes.email,
                  state: usr.attributes.profile.protectedData.state
                    ? usr.attributes.profile.protectedData.state
                    : '-',
                  city: usr.attributes.profile.protectedData.city
                    ? usr.attributes.profile.protectedData.city
                    : '-',
                  school: usr.attributes.profile.publicData.school
                    ? usr.attributes.profile.publicData.school
                    : '-',
                  sorority: usr.attributes.profile.publicData.sorority
                    ? usr.attributes.profile.publicData.sorority
                    : '-',
                  height: usr.attributes.profile.publicData.height
                    ? usr.attributes.profile.publicData.height
                        .replace(/'/g, 'ft')
                        .replace(/"/g, 'in')
                    : '-',
                  allowstryOns: usr.attributes.profile.publicData.userAllowsTryOns ? 'Yes' : 'No',
                };
              });
              res.send(userDataArray);
            }
          });
      }
    })
    .catch(err => console.log(err));
};

const handleListingCsvRequest = (req, res) => {
  let listingsArray = [];
  let totalPages, totalItems;
  integrationSdk.listings
    .query()
    .then(resp => {
      totalPages = resp.data.meta.totalPages;
      totalItems = resp.data.meta.totalItems;
      listingsArray = [...resp.data.data];
    })
    .then(resp2 => {
      for (let i = 2; i < totalPages + 1; i++) {
        integrationSdk.listings
          .query({ page: i })
          .then(resp3 => {
            listingsArray = [...listingsArray, ...resp3.data.data];
          })
          .then(resp4 => {
            if (listingsArray.length === totalItems) {
              // map through listings array to return desired objects
              const listingDataArray = listingsArray.map(lst => {
                return {
                  title: lst.attributes.title,
                  author: lst.attributes.publicData.author ? lst.attributes.publicData.author : '-',
                  createdAt: moment(lst.attributes.createdAt).format('MMM DD YYYY'),
                  item: lst.attributes.publicData.item ? lst.attributes.publicData.item : '-',
                  brand: lst.attributes.publicData.brandStore
                    ? lst.attributes.publicData.brandStore
                    : '-',
                  color: lst.attributes.publicData.color ? lst.attributes.publicData.color : '-',
                  damageCost: lst.attributes.publicData.damageCost
                    ? `$${lst.attributes.publicData.damageCost}`
                    : '-',
                  fits:
                    lst.attributes.publicData.fits === 'runs_true_to_size'
                      ? 'True to size'
                      : lst.attributes.publicData.fits === 'runs_small'
                      ? 'Runs small'
                      : lst.attributes.publicData.fits === 'runs_big'
                      ? 'Runs big'
                      : '-',
                  location: lst.attributes.publicData.location
                    ? lst.attributes.publicData.location.address
                    : '-',
                  retailPrice: lst.attributes.publicData.retailPrice
                    ? `$${lst.attributes.publicData.retailPrice}`
                    : '-',
                  size: lst.attributes.publicData.size ? lst.attributes.publicData.size : '-',
                  price: lst.attributes.price ? `$${lst.attributes.price.amount / 100}` : null,
                  listingId: lst.attributes.publicData.listingIdForLikeFilter
                    ? lst.attributes.publicData.listingIdForLikeFilter
                    : '-',
                };
              });
              res.send(listingDataArray);
            }
          });
      }
    })
    .catch(err => console.log(err));
};

module.exports = {
  handleUserCsvRequest,
  handleListingCsvRequest,
};
