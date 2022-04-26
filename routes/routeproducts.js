const express = require("express");
const router = express.Router();
const {
  getAllProductStatic,
  getAllProduct,
} = require("../controllers/controllerproduct");

router.get("/", getAllProduct);
router.get("/static", getAllProductStatic);

module.exports = router;
