const fs = require("fs");
const path = require("path");

const logDir = path.join(__dirname, "../../logs");

// create logs folder if not exists
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const accessLogStream = fs.createWriteStream(
  path.join(logDir, "access.log"),
  { flags: "a" }
);

const errorLogStream = fs.createWriteStream(
  path.join(logDir, "error.log"),
  { flags: "a" }
);

module.exports = {
  accessLogStream,
  errorLogStream,

  logError: (message) => {
    const time = new Date().toISOString();
    errorLogStream.write(`[${time}] ${message}\n`);
  }
};
