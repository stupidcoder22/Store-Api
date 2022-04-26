const Product = require("../models/productmodel");

const getAllProductStatic = async (req, res) => {
  const product = await Product.find({ price: { $gt: 30 } }).sort("price");
  res.status(200).json({ nbHits: product.length, product });
};

const getAllProduct = async (req, res) => {
  const { featured, company, name, sort, field, numericFilter } = req.query;
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

  if (numericFilter) {
    const operatormap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filter = numericFilter.replace(
      regEx,
      (match) => `-${operatormap[match]}-`
    );
    const options = ["price,rating"];
    filter = filter.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  console.log(queryObject);
  let result = Product.find(queryObject);

  //sort
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList).select(name);
  } else {
    result = result.sort("createdAt");
  }
  //select
  if (field) {
    const fieldList = field.split(",").join(" ");
    result = result.select(fieldList);
  }
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 7;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);
  let product = await result;
  res.status(200).json({ nbHits: product.length, product });
};

module.exports = { getAllProductStatic, getAllProduct };
