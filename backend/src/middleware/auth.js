const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
	const token = req.headers.token;
	console.log("token", token);
	if (!token) return res.status(401).send("Access denied. No token provided");
	try {
		const decoded = jwt.verify(token, process.env.JWT);
		console.log(decoded);
		req.user = decoded;
		next();
	} catch (ex) {
		res.status(400).send("Invalid token");
	}
};
