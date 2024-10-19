CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,      -- Unique identifier for each product
    name VARCHAR(255) NOT NULL,         -- Product name
    description TEXT,                   -- Detailed description of the product
    price INT NOT NULL,      -- Product price with two decimal precision
    stock INT NOT NULL DEFAULT 0,       -- Quantity in stock, default to 0
    category VARCHAR(100),              -- Product category (optional)
    created_at TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP  -- Timestamp when product is created
)