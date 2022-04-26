const express = require("express");
const app = express();
require("express-async-errors");
const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");
const connectDB = require("./db/connect");
const productRouter = require("./routes/routeproducts");

connectDB();
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.send('<h1>Store API</h1> <a href="/api/v1/products">Products Route</a>');
});

//products Routes
app.use("/api/v1/products", productRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

app.listen(1000, () => {
  console.log("Server is listening on Port 1000");
});
