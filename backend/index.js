const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
require("./db/db");
const houseRouter = require("./routes/house");
const userRouter = require("./routes/user");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use("/house", houseRouter);

app.listen(8000, () => {
	console.log("Server is running on port 8000");
});
