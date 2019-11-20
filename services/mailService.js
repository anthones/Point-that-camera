const sgMail = require("@sendgrid/mail");
const { sendGridKey, emailReciever, emailSender } = require("../config/keys");

sgMail.setApiKey(sendGridKey);

module.exports = {
  sendPdfWithEmail: (pdfBlob, date) => {
    const message = {
      to: emailReciever,
      from: emailSender,
      subject: "Hello attachment",
      text: " ",
      html: "<p>Here’s an attachment for you!</p>",
      attachments: [
        {
          content: pdfBlob,
          filename: date,
          type: "application/pdf",
          disposition: "attachment",
          contentId: " "
        }
      ]
    };
    return new Promise((resolve, reject) => {
      sgMail
        .send(message)
        .then(resolve())
        .catch(err => reject(err));
    });
  }
};
