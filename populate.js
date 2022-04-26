const connectDB = require("./db/connect");
const Product = require("./models/productmodel");
require("dotenv").config();

const jsonProducts = require("./products.json");
connectDB();
