const pool = require("../db/postgreSql");
// Get all products
exports.getAllProducts = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM products");

    const products = result.rows;

    if (!products) {
      return res.status(404).json({ message: "No products found" });
    }

    // console.log(products);

    res.status(200).json({
      status: "success",
      result: products.length,
      data: products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server error" });
  }
};

// delete a product

exports.deleteProduct = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM products WHERE product_id = $1 RETURNING *",
      [id]
    );

    // Check if any rows were deleted
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    res.status(200).json({
      status: "success",
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Internal Server error" });
  }
};

// create a product

exports.createProduct = async (req, res, next) => {
  const { name, price, category, stock, description } = req.body;

  try {
    // Insert query for PostgreSQL
    const result = await pool.query(
      "INSERT INTO products (name, price, category, stock, description) VALUES ($1, $2, $3, $4, $5) RETURNING product_id",
      [name, price, category, stock, description]
    );

    // Check if the insert was successful
    res.status(201).json({
      status: "success",
      message: "Product added successfully",
      data: {
        id: result.rows[0].product_id, // Get the inserted product ID
        name,
        price,
        category,
        stock,
        description,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// get product by id

exports.getAllProductById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM products WHERE product_id = $1",
      [id]
    );

    const products = result.rows;
    if (!products) {
      return res.status(404).json({ message: "No products found" });
    }

    // console.log(products);

    res.status(200).json({
      status: "success",

      result: products.length,
      data: products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server error" });
  }
};

// update a product

exports.updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const { name, price, category, stock, description } = req.body;

  try {
    const result = await pool.query(
      "UPDATE products SET name = $1, price = $2, category = $3, stock = $4, description = $5 WHERE product_id = $6 RETURNING *",
      [name, price, category, stock, description, id]
    );

    // Check if any rows were updated
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    // Assuming you want to return the updated product data
    const updatedProduct = result.rows[0]; // The first row of the returned result

    res.status(200).json({
      status: "success",
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Internal Server error" });
  }
};

exports.getAllProduductUser = async (req, res, next) => {
  try {
    const [products] = await pool.query(
      "Select N.product_category , N.product_price AS amount,N.product_name AS product ,M.username,M.message FROM new_table AS N JOIN messages AS M  ON N.id = M.id ;"
    );

    if (!products) {
      return res.status(404).json({ message: "No products found" });
    }

    // console.log(products);

    res.status(200).json({
      status: "success",
      result: products.length,
      data: products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server error" });
  }
};
