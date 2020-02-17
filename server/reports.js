const flexIntegrationSdk = require('sharetribe-flex-integration-sdk');

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
      for (let i = 2; i < totalPages + 1; i++) {
        integrationSdk.users
          .query({ page: i })
          .then(resp3 => {
            usersArray = [...usersArray, ...resp3.data.data];
          })
          .then(resp4 => {
            if (usersArray.length === totalItems) {
              // console.log('aqui está la jugada', usersArray.length);
              // res.json(usersArray);
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

const handleListingCsvRequest = (req, res) => {};

module.exports = {
  handleUserCsvRequest,
  handleListingCsvRequest,
};
