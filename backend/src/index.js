// Imports
const express = require("express");
const bodyParser = require("body-parser");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger/swagger_output.json");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const corsOptions = require("./config/corsOptions");
const dotenv = require("dotenv");
const path = require("path");

// Route imports
const seizoenenRoute = require("./routes/seizoenen");
const speeldagenRoute = require("./routes/speeldagen");
const userRoute = require("./routes/users");
const wedstrijdenRoute = require("./routes/wedstrijden");
const speeldagVotesRoute = require("./routes/speeldagVotes");
const wedstrijdVotesRoute = require("./routes/wedstrijdVotes");
const authRoute = require("./routes/auth");
const connectDB = require("./config/dbConn");
const logAcces = require("./middleware/logAcces");
const errorHandler = require("./middleware/errorHandler");

// ENV config
dotenv.config();

// MongoDB
connectDB();

// App
const app = express();
const PORT = process.env.PORT || 3000;

// CORS
app.use(cors(corsOptions));

// Cookies
app.use(cookieParser());

// Form data
app.use(express.urlencoded({ extended: false }));

// Json
app.use(express.json());
app.use(bodyParser.json());

// Logging
app.use(logAcces);

// Swagger doc
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Routes
app.use("/api/seizoenen", seizoenenRoute);
app.use("/api/speeldagen", speeldagenRoute);
app.use("/api/users", userRoute);
app.use("/api/wedstrijden", wedstrijdenRoute);
app.use("/api/speeldagVotes", speeldagVotesRoute);
app.use("/api/wedstrijdVotes", wedstrijdVotesRoute);
app.use("/api/auth", authRoute);

// Favicon
app.get("/favicon.ico", (req, res) => {
	res.sendFile(path.join(__dirname, "../public/img/favicon.ico"));
});

// Root
app.get("/", (req, res) => {
	res.redirect("/api-docs");
});

// 404 Not found
app.all("*", (req, res) => {
	res
		.status(404)
		.json({ message: "404 Not found" })
		.sendFile(path.join(__dirname, "./views/notFound.html"));
});

// Error handler
app.use(errorHandler);

// Start API
mongoose.connection.once("open", () => {
	app.listen(PORT, () => {
		console.log(`Server running on port: ${PORT}`);
	});
});
