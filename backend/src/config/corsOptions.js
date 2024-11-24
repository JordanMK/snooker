const whitelist = ["http://localhost:3000", "https://snookerpocket.localhost"];
const corsOptions = {
	origin: (origin, callback) => {
		if (whitelist.includes(origin) || !origin) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
	credentials: true,
	optionsSuccessStatus: 200,
};

module.exports = corsOptions;
