const fsPromises = require("fs/promises");
const fs = require("fs");
const path = require("path");
const formatter = require("date-fns");
const uuidv4 = require("uuid").v4;

const errorHandler = (err, req, res, next) => {
	logErrors(`${err.name}: ${err.message}`, "errors.log");
	console.error(err.stack);
	res.status(500).json({ message: err.message });
	next();
};

const logErrors = async (message, logName) => {
	const dateTime = `${formatter.format(new Date(), "dd/MM/yyy\tHH:mm:ss")}`;
	const logItem = `${dateTime}\t${uuidv4()}\t${message}\n`;
	try {
		if (!fs.existsSync(path.join(__dirname, "../logs"))) {
			await fsPromises.mkdir(path.join(__dirname, "../logs"));
		}

		await fsPromises.appendFile(
			path.join(__dirname, "../logs", logName),
			logItem
		);
	} catch (err) {
		console.error(err);
	}
};

module.exports = errorHandler;
