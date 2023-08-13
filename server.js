const mongoose = require("mongoose");
const dotenv = require("dotenv/config");
const app = require("./app");

const { DB_HOST, PORT } = process.env;

mongoose
	.connect(DB_HOST)
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Server running. Use our API on port: ${PORT}`);
		});
		console.log("Database connection successful");
	})
	.catch((error) => {
		console.log(error);
		process.exit(1);
	});
