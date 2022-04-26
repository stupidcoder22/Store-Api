const connectDB = require("./db/connect");
const Product = require("./models/productmodel");
require("dotenv").config();
const jsonProducts = require("./products.json");
connectDB();

const productInsertion = async () => {
  try {
    await Product.deleteMany();
    await Product.create(jsonProducts);
    console.log("Success");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

productInsertion();
