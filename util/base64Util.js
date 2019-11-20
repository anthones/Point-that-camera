const fs = require("fs");

module.exports = {
  base64Encode: file => {
    const bitmap = fs.readFileSync(file);
    return new Buffer(bitmap).toString("base64");
  },
  base64Decode: (base64str, file) => {
    const base64Image = base64str.split(";base64,").pop();
    var bitmap = new Buffer(base64Image, "base64");
    fs.writeFileSync(file, bitmap, { flag: "w" });
    return file;
  }
};
