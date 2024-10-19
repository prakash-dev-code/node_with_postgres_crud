const express = require("express");
const productController = require("./../controllers/productController");
const productRouter = express.Router();

// productRouter.route("/user").get(productController.getAllProduductUser);

productRouter
  .route("/")
  .get(productController.getAllProducts)
  .post(productController.createProduct);
productRouter
  .route("/:id")
  .delete(productController.deleteProduct)
  .get(productController.getAllProductById)
  .patch(productController.updateProduct);

module.exports = productRouter;