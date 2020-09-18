const mailer = require('nodemailer');

module.exports = mailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "3aa71abad7e1ea",
      pass: "18258dcf3048b6"
    }
    });
