const mongoose = require("mongoose");

const connectDB = async () => {
	try {
		await mongoose
			.set('strictPopulate', false)
			.connect(process.env.DATABASE_URI, {
				dbName: process.env.NODE_ENV !== 'test' ? 'SPdb' : 'test',
			})
			.then(() => console.log('MongoDB connected...'))
			.catch((error) => console.error(error));
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
};

module.exports = connectDB;
