const Product = require("../models/productmodel");

const getAllProductStatic = async (req, res) => {
  const product = await Product.find({}).sort("-price");
  res.status(200).json({ product, nbHits: product.length });
};

const getAllProduct = async (req, res) => {
  const { featured, company, name, sort } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === true ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  let result = Product.find(queryObject);
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }
  let product = await result;
  res.status(200).json({ product, nbHits: product.length });
};

module.exports = { getAllProductStatic, getAllProduct };
