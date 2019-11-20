const { base64Encode, base64Decode } = require("../util/base64Util");
const { convertImageToPdf } = require("../services/pdfService");
const { sendPdfWithEmail } = require("../services/mailService");

const CameraController = request => {
  const date = request.body.date;
  const imageBlob = request.body.blob;
  const imageFile = `${__dirname}/../uploads/${date}.jpg`;
  const pdfFile = `${__dirname}/../uploads/${date}.pdf`;

  return new Promise((resolve, reject) => {
    convertImageToPdf(base64Decode(imageBlob, imageFile), pdfFile)
      .then(
        sendPdfWithEmail(base64Encode(pdfFile), date)
          .then(resolve())
          .catch(err => reject(err))
      )
      .catch(err => console.log(err));
  });
};

module.exports = CameraController;
