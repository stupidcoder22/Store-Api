const Product = require("../models/productmodel");

const getAllProductStatic = async (req, res) => {
  throw new Error("testing async error");
  res.status(200).json({ msg: "product testing route" });
};

const getAllProduct = async (req, res) => {
  await Product.find();
  res.status(200).json({ msg: "product route" });
};

module.exports = { getAllProductStatic, getAllProduct };
