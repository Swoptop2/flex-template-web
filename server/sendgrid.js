const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_KEY);
// set the 'to' propoerty to an environment variable holding support's email address

const handleEmailRequest = (req, res) => {
  // if it's form the contact form, the whole message obj needs to be sent and destructured here
  // if it's to notify of a new listing, then the owner's name and the listing's name needs to be pulled
  const { action } = req.query;
  if (action === 'contact') {
    const { values } = req.query;
    const info = JSON.parse(values);
    const msg = constructMessage(
      info.email,
      `Message by ${info.firstName} ${info.lastName} from Swoptop`,
      info.message
    );
    sgMail
      .send(msg)
      .then(response => {
        res.send(response);
        console.log('Message sent!');
      })
      .catch(err => {
        res.send(err);
        console.log('Message sending error');
      });
  } else if (action === 'approval') {
    const msg = constructMessage(
      'admin@swoptop.com',
      'New listing pending approval',
      'Hello there! A new listing has been published in swoptop.com, and requires admin approval through the marketplace console.',
      '<p>Hello there! A new listing has been published in swoptop.com, and requires admin approval through the marketplace <a href="https://flex-console.sharetribe.com/login">console</a></p>'
    );
    sgMail
      .send(msg)
      .then(response => {
        res.send(response);
        console.log('Message sent!');
      })
      .catch(err => {
        res.send(err);
        console.log('Message sending error');
      });
  } else if (action === 'reportUnreturned') {
    const { values } = req.query;
    const info = JSON.parse(values);
    // construct message to send to Swoptop
    // TODO: make text conditional based on customer's phone number
    const text = info.customerPhone
      ? `${info.ownerName} wishes to report an issue with ${info.itemName}, which was rented from ${info.startingDay} to ${info.endingDay} for a price of ${info.itemPrice} and was not returned to her. The item was rented by ${info.renterName}. Please reach out to both parties to find out what happened. The owner's phone number is ${info.providerPhone}, and her email is ${info.providerEmail}. The renter's phone number is ${info.customerPhone}, and her email is ${info.customerEmail}.`
      : `${info.ownerName} wishes to report an issue with ${info.itemName}, which was rented from ${info.startingDay} to ${info.endingDay} for a price of ${info.itemPrice} and was not returned to her. The item was rented by ${info.renterName}. Please reach out to both parties to find out what happened. The owner's phone number is ${info.providerPhone}, and her email is ${info.providerEmail}. You can reach out to the renter at ${info.customerEmail}.`;
    const msg = constructMessage(info.providerEmail, 'Report: Unreturned Item', text);
    sgMail
      .send(msg)
      .then(response => {
        res.send(response);
        console.log('Message sent!');
      })
      .catch(err => {
        res.send(err);
        console.log('Message sending error');
      });
  } else if (action === 'reportDamaged') {
    const { values } = req.query;
    const info = JSON.parse(values);
    const text = info.customerPhone
      ? `${info.ownerName} wishes to report an issue with ${info.itemName}, which was rented from ${info.startingDay} to ${info.endingDay} for a price of ${info.itemPrice} and was returned damaged. The item was rented by ${info.renterName}. Please reach out to both parties to find out what happened. The owner's phone number is ${info.providerPhone}, and her email is ${info.providerEmail}. The renter's phone number is ${info.customerPhone}, and her email is ${info.customerEmail}.`
      : `${info.ownerName} wishes to report an issue with ${info.itemName}, which was rented from ${info.startingDay} to ${info.endingDay} for a price of ${info.itemPrice} and was returned damaged. The item was rented by ${info.renterName}. Please reach out to both parties to find out what happened. The owner's phone number is ${info.providerPhone}, and her email is ${info.providerEmail}. You can reach out to the renter at ${info.customerEmail}.`;
    const msg = constructMessage(info.providerEmail, 'Report: Damaged Item', text);
    sgMail
      .send(msg)
      .then(response => {
        res.send(response);
        console.log('Message sent!');
      })
      .catch(err => {
        res.send(err);
        console.log('Message sending error');
      });
  } else if (action === 'reportIssue') {
    const { values } = req.query;
    const info = JSON.parse(values);
    const text = info.customerPhone
      ? `${info.renterName} wishes to report an issue with ${info.itemName}, which she rented from ${info.ownerName}, from ${info.startingDay} to ${info.endingDay} for a price of ${info.itemPrice}. Please reach out to both parties to find out what happened. The owner's phone number is ${info.providerPhone}, and her email is ${info.providerEmail}. The renter's phone number is ${info.customerPhone}, and her email is ${info.customerEmail}`
      : `${info.renterName} wishes to report an issue with ${info.itemName}, which she rented from ${info.ownerName}, from ${info.startingDay} to ${info.endingDay} for a price of ${info.itemPrice}. Please reach out to both parties to find out what happened. The owner's phone number is ${info.providerPhone}, and her email is ${info.providerEmail}. You can reach out to the renter at ${info.customerEmail}.`;
    const msg = constructMessage(info.customerEmail, 'Report: Issue with Item', text);
    sgMail
      .send(msg)
      .then(response => {
        res.send(response);
        console.log('Message sent!');
      })
      .catch(err => {
        res.send(err);
        console.log('Message sending error');
      });
  }
};

const constructMessage = (from, subject, text, html) => {
  let message;
  if (html) {
    message = {
      to: process.env.SUPPORT_EMAIL,
      from,
      subject,
      text,
      html,
    };
  } else {
    message = {
      to: process.env.SUPPORT_EMAIL,
      from,
      subject,
      text,
    };
  }
  return message;
};

module.exports = handleEmailRequest;
