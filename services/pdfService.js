const iTP = require("images-to-pdf");

module.exports = {
  convertImageToPdf: (imageFile, pdfFile) => {
    return new Promise((resolve, reject) => {
      iTP([imageFile], pdfFile)
        .then(resolve())
        .catch(err => reject(err));
    });
  }
};
