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
    const msg = {
      to: process.env.SUPPORT_EMAIL,
      from: info.email,
      subject: `Message by ${info.name} from Swoptop`,
      text: info.message,
    };
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
    // handleApprovalrequest
    const msg = {
      to: process.env.SUPPORT_EMAIL,
      from: 'admin@swoptop.com',
      subject: 'New listing pending approval',
      text:
        'Hello there! A new listing has been published in swoptop.com, and requires admin approval through the marketplace console.',
      html:
        '<p>Hello there! A new listing has been published in swoptop.com, and requires admin approval through the marketplace <a href="https://flex-console.sharetribe.com/login">console</a></p>',
    };
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

module.exports = handleEmailRequest;
