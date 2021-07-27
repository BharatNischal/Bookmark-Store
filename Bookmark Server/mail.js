const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const { OAuth2 } = google.auth;

const oauth2Client = new OAuth2(
  process.env.cliendId, // ClientID
  process.env.secret, // Client Secret
  'https://developers.google.com/oauthplayground', // Redirect URL
);

oauth2Client.setCredentials({
  refresh_token: process.env.refreshToken,
});

const accessToken = oauth2Client.getAccessToken();

const smtpTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: 'nischalbharat4819@gmail.com',
    clientId: process.env.client,
    clientSecret: process.env.secret,
    refreshToken: process.env.refreshToken,
    accessToken,
  },
});

module.exports = function (mailOptions, callback) {
  smtpTransport.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    }
    if (info) {
      console.log(`Message sent: ${info.response}`);
      callback(error, info.respone);
    } else {
      callback(error, null);
    }
  });
};
