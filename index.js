const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");

const cameraRoute = require("./routes/cameraRoute");

const app = express();

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false, limit: "10mb" }));

app.use("/api", cameraRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Listening on port ${5000}`));
