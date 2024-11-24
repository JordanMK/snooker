const morgan = require("morgan");
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs/promises");

const logAcces = async (req, res, next) => {
	if (!fs.existsSync(path.join(__dirname, "../logs"))) {
		await fsPromises.mkdir(path.join(__dirname, "../logs"));
	}
	morgan(":date[clf] | :url | :method | :status | :remote-addr | :referrer", {
		stream: fs.createWriteStream("./src/logs/access.log", { flags: "a" }),
	})(req, res, next);
};

module.exports = logAcces;
